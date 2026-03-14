import { expect, test, describe } from 'bun:test'
import { readFile, writeFile, unlink } from 'node:fs/promises'
import { join, dirname } from 'node:path'
const dir = dirname(new URL(import.meta.url).pathname)
const content_dir = join(dir, 'content')
describe('index__generate', ()=>{
	const test_md_path = join(content_dir, '2099-01-01-test-post.md')
	test('index.ts includes .md import for raw .md files', async ()=>{
		await writeFile(test_md_path, `---
title: "Test Post Title"
description: "A test description"
date: 2099-01-01
tags:
  - test
slug: custom-slug
---

# Test Content

Hello world.
`)
		const { index__generate } = await import('./index.generate.js')
		await index__generate()
		const index = await readFile(join(dir, 'index.ts'), 'utf8')
		// Raw .md files should import as .md (no .js suffix)
		expect(index).toContain("import('./content/2099-01-01-test-post.md')")
		// Should NOT generate .md.js file
		expect(async ()=>await readFile(test_md_path + '.js')).toThrow()
		// Cleanup
		await unlink(test_md_path)
		await index__generate()
	})
	test('index.ts imports .md.ts as .md.js', async ()=>{
		const { index__generate } = await import('./index.generate.js')
		await index__generate()
		const index = await readFile(join(dir, 'index.ts'), 'utf8')
		// .md.ts files should import as .md.js
		expect(index).toContain("import('./content/2026-03-05-introducing-agent-doc.md.js')")
	})
	test('raw .md files import without .js suffix', async ()=>{
		const { index__generate } = await import('./index.generate.js')
		await index__generate()
		const index = await readFile(join(dir, 'index.ts'), 'utf8')
		// Raw .md files should import as .md (esbuild plugin handles them)
		expect(index).toContain("import('./content/2026-03-12-dogfooding-agent-doc-part1-blog.md')")
		// Should NOT have .md.js import for raw .md files
		expect(index).not.toContain("import('./content/2026-03-12-dogfooding-agent-doc-part1-blog.md.js')")
	})
})
