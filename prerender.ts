/**
 * Prerender script for static site generation.
 * Expects the server to already be running.
 * Usage: PRERENDER_BASE=http://localhost:4100 bun prerender.ts
 */
import { static_export_ } from 'rhonojs/server/export'
const { exported, errors } = await static_export_({
	base_url: process.env.PRERENDER_BASE || 'http://localhost:4100',
	site_url: process.env.PRERENDER_SITE_URL || 'https://briantakita.me',
	out_dir: process.env.PRERENDER_OUT || 'dist/static',
	sitemap: true,
	extra_routes: ['/search', '/rss', '/rss.xml', '/robots.txt'],
})
if (errors.length > 0) {
	process.exit(1)
}
