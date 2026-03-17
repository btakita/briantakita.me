import { describe, test, expect, afterAll, beforeAll } from 'bun:test'
import { type Subprocess } from 'bun'
/**
 * Smoke tests for briantakita.me prerendered routes.
 * Builds and starts the server, then verifies key routes return expected content.
 *
 * Run: cd app/briantakita.me && bun test smoke.test.ts
 */
const BASE = 'http://localhost:4100'
let server_proc:Subprocess|null = null
beforeAll(async ()=>{
	// Build first
	const build_proc = Bun.spawn(['bun', './build.ts'], {
		cwd: import.meta.dir,
		stdout: 'pipe',
		stderr: 'pipe',
	})
	await build_proc.exited
	if (build_proc.exitCode !== 0) throw new Error('Build failed')
	// Start server
	server_proc = Bun.spawn(['bun', './start.ts'], {
		cwd: import.meta.dir,
		stdout: 'pipe',
		stderr: 'pipe',
	})
	// Wait for server to be ready
	for (let i = 0; i < 20; i++) {
		try {
			await fetch(BASE)
			return
		} catch {
			await Bun.sleep(500)
		}
	}
	throw new Error('Server failed to start')
}, 60_000)
afterAll(()=>{
	server_proc?.kill()
})
describe('smoke tests', ()=>{
	test('/ returns 200 with HTML', async ()=>{
		const res = await fetch(BASE + '/')
		expect(res.status).toBe(200)
		const text = await res.text()
		expect(text).toContain('Brian Takita')
		expect(text).toContain('<!DOCTYPE html>')
	})
	test('/about returns 200', async ()=>{
		const res = await fetch(BASE + '/about')
		expect(res.status).toBe(200)
		const text = await res.text()
		expect(text).toContain('About')
	})
	test('/robots.txt returns valid content', async ()=>{
		const res = await fetch(BASE + '/robots.txt')
		expect(res.status).toBe(200)
		const text = await res.text()
		expect(text).toContain('User-agent: *')
		expect(text).toContain('Sitemap:')
	})
	test('/rss returns valid XML', async ()=>{
		const res = await fetch(BASE + '/rss')
		expect(res.status).toBe(200)
		const text = await res.text()
		expect(text).toContain('<?xml')
		expect(text).toContain('<rss')
		expect(text).toContain('<channel>')
	})
	test('/rss.xml redirects to /rss', async ()=>{
		const res = await fetch(BASE + '/rss.xml', { redirect: 'manual' })
		expect(res.status).toBe(301)
		expect(res.headers.get('location')).toBe('/rss')
	})
	test('/sitemap.xml returns valid XML with URLs', async ()=>{
		const res = await fetch(BASE + '/sitemap.xml')
		expect(res.status).toBe(200)
		const text = await res.text()
		expect(text).toContain('<?xml')
		expect(text).toContain('<urlset')
		expect(text).toContain('<url>')
		expect(text).toContain('<loc>')
	})
	test('/search returns 200', async ()=>{
		const res = await fetch(BASE + '/search')
		expect(res.status).toBe(200)
	})
	test('/posts returns 200 with post list', async ()=>{
		const res = await fetch(BASE + '/posts')
		expect(res.status).toBe(200)
		const text = await res.text()
		expect(text).toContain('Posts')
	})
	test('/tags returns 200', async ()=>{
		const res = await fetch(BASE + '/tags')
		expect(res.status).toBe(200)
	})
	test('blog post returns 200 with content', async ()=>{
		const res = await fetch(BASE + '/posts/introducing-agent-doc')
		expect(res.status).toBe(200)
		const text = await res.text()
		expect(text).toContain('agent-doc')
	})
})
