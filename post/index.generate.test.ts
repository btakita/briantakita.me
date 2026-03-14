import { expect, test, describe } from 'bun:test'
import { readFile, writeFile, unlink } from 'node:fs/promises'
import { join, dirname } from 'node:path'
const dir = dirname(new URL(import.meta.url).pathname)
const content_dir = join(dir, 'content')
describe('md_js__generate', ()=>{
	const test_md_path = join(content_dir, '2099-01-01-test-post.md')
	const test_js_path = test_md_path + '.js'
	test('generates .md.js with correct exports from frontmatter', async ()=>{
		await writeFile(test_md_path, `---
title: "Test Post Title"
description: "A test description"
date: 2099-01-01
tags:
  - test
  - automated
slug: custom-slug
---

# Test Content

Hello world.
`)
		// Run the generator
		const { index__generate } = await import('./index.generate.js')
		await index__generate()
		// Verify .md.js was created
		const js = await readFile(test_js_path, 'utf8')
		expect(js).toContain('post_meta__validate')
		expect(js).toContain('md__raw_')
		expect(js).toContain('"slug":"custom-slug"')
		expect(js).toContain('"title":"Test Post Title"')
		expect(js).toContain('"description":"A test description"')
		expect(js).toContain('"tags":["test","automated"]')
		expect(js).toContain('"pub_date":"2099-01-01T00:00:00.000Z"')
		// Body should NOT contain frontmatter
		expect(js).toContain('# Test Content')
		expect(js).not.toContain('---\\ntitle:')
		// Verify index.ts includes the test post
		const index = await readFile(join(dir, 'index.ts'), 'utf8')
		expect(index).toContain("import('./content/2099-01-01-test-post.md.js')")
		// Cleanup
		await unlink(test_md_path)
		await unlink(test_js_path)
		// Regenerate without test file
		await index__generate()
	})
	test('derives slug from filename when no slug in frontmatter', async ()=>{
		await writeFile(test_md_path, `---
title: "No Slug Post"
description: "Testing slug derivation"
date: 2099-01-01
---

Content here.
`)
		const { index__generate } = await import('./index.generate.js')
		await index__generate()
		const js = await readFile(test_js_path, 'utf8')
		expect(js).toContain('"slug":"test-post"')
		await unlink(test_md_path)
		await unlink(test_js_path)
		await index__generate()
	})
	test('handles js-yaml Date objects for date field', async ()=>{
		await writeFile(test_md_path, `---
title: "Date Test"
description: "Testing date handling"
date: 2099-06-15
---

Content.
`)
		const { index__generate } = await import('./index.generate.js')
		await index__generate()
		const js = await readFile(test_js_path, 'utf8')
		// js-yaml parses date as Date object, should be converted to ISO string
		expect(js).toMatch(/"pub_date":"2099-06-1[45]T\d{2}:\d{2}:\d{2}\.\d{3}Z"/)
		await unlink(test_md_path)
		await unlink(test_js_path)
		await index__generate()
	})
	test('defaults tags to ["other"] when not specified', async ()=>{
		await writeFile(test_md_path, `---
title: "No Tags"
description: "Testing default tags"
date: 2099-01-01
---

Content.
`)
		const { index__generate } = await import('./index.generate.js')
		await index__generate()
		const js = await readFile(test_js_path, 'utf8')
		expect(js).toContain('"tags":["other"]')
		await unlink(test_md_path)
		await unlink(test_js_path)
		await index__generate()
	})
	test('passes through optional fields: hero_image, og_image, draft', async ()=>{
		await writeFile(test_md_path, `---
title: "Optional Fields"
description: "Testing optional fields"
date: 2099-01-01
hero_image: "/images/hero.jpg"
og_image: "/images/og.jpg"
draft: true
---

Content.
`)
		const { index__generate } = await import('./index.generate.js')
		await index__generate()
		const js = await readFile(test_js_path, 'utf8')
		expect(js).toContain('"hero_image":"/images/hero.jpg"')
		expect(js).toContain('"og_image":"/images/og.jpg"')
		expect(js).toContain('"draft":true')
		await unlink(test_md_path)
		await unlink(test_js_path)
		await index__generate()
	})
	test('index.ts imports .md.ts as .md.js and raw .md as .md.js', async ()=>{
		const { index__generate } = await import('./index.generate.js')
		await index__generate()
		const index = await readFile(join(dir, 'index.ts'), 'utf8')
		// .md.ts files should import as .md.js
		expect(index).toContain("import('./content/2026-03-05-introducing-agent-doc.md.js')")
		// Raw .md files should import as .md.js
		expect(index).toContain("import('./content/2026-03-12-dogfooding-agent-doc-part1-blog.md.js')")
	})
})
