import { mkdir, writeFile } from 'fs/promises'
import { dirname, join } from 'path'

const BASE = process.env.PRERENDER_BASE || 'http://localhost:4100'
const OUT = process.env.PRERENDER_OUT || 'dist/static'
const SITE_URL = process.env.PRERENDER_SITE_URL || 'https://briantakita.me'

// Discover all routes from sitemap
const sitemapRes = await fetch(`${BASE}/sitemap.xml`)
const sitemap = await sitemapRes.text()
const routes: string[] = []
for (const m of sitemap.matchAll(/<loc>https?:\/\/[^<]+<\/loc>/g)) {
	const url = m[0].replace(/<\/?loc>/g, '')
	const path = new URL(url).pathname
	routes.push(path === '' ? '/' : path)
}

// Routes not in sitemap (by convention)
for (const extra of ['/search', '/rss', '/rss.xml', '/robots.txt']) {
	if (!routes.includes(extra)) routes.push(extra)
}

console.log(`Prerendering ${routes.length} routes to ${OUT}`)

for (const route of routes) {
	const res = await fetch(`${BASE}${route}`)
	if (!res.ok) {
		console.error(`✗ ${route} — ${res.status}`)
		continue
	}
	let body = await res.text()
	body = body.replaceAll(BASE, SITE_URL)
	const isXml = route.endsWith('.xml')
	const isTxt = route.endsWith('.txt')
	const filePath = (isXml || isTxt)
		? join(OUT, route)
		: join(OUT, route, 'index.html')
	await mkdir(dirname(filePath), { recursive: true })
	await writeFile(filePath, body)
	console.log(`✓ ${route}`)
}

console.log('Done')
