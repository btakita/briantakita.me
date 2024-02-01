import './index.css'
import { blog_server_request_ctx__ensure, tag__set } from '@btakita/domain--server--blog'
import { blog__rss_xml_ } from '@btakita/ui--server--blog/rss'
import { about__doc_html_ } from '@btakita/ui--server--briantakita/about'
import { home__doc_html_ } from '@btakita/ui--server--briantakita/home'
import { open_source__doc_html_ } from '@btakita/ui--server--briantakita/open_source'
import { portfolio__doc_html_ } from '@btakita/ui--server--briantakita/portfolio'
import { tag__doc_html_ } from '@btakita/ui--server--briantakita/tag'
import { Elysia } from 'elysia'
import { relement__use } from 'relementjs'
import { server__relement } from 'relementjs/server'
import { html_response__new, middleware_ } from 'relysjs/server'
import { logo_image, site, social_a1 } from './config.ts'
relement__use(server__relement)
const robots_txt = `
User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site.website).href}
`
export default middleware_(middleware_ctx=>
	new Elysia({
		name: 'root_routes'
	})
		.get('/', async context=>
			html_response__new(
				home__doc_html_({
					ctx: blog_server_request_ctx__ensure(
						middleware_ctx,
						context, {
							logo_image,
							site,
							social_a1,
						})
				})))
		.get('/robots.txt', ()=>
			new Response(robots_txt, {
				headers: { 'Content-Type': 'text/plain' },
			}))
		.get('/rss.xml', async context=>
			new Response(blog__rss_xml_({
				ctx: blog_server_request_ctx__ensure(
					middleware_ctx,
					context, {
						logo_image,
						site,
						social_a1,
					})
			}), {
				status: 200,
				headers: {
					'Content-Type': 'application/xml'
				}
			}))
		.get('/about', async context=>
			html_response__new(
				about__doc_html_({
					ctx: blog_server_request_ctx__ensure(
						middleware_ctx,
						context, {
							logo_image,
							site,
							social_a1,
						})
				})))
		.get('/portfolio', async context=>
			html_response__new(
				portfolio__doc_html_({
					ctx: blog_server_request_ctx__ensure(
						middleware_ctx,
						context, {
							logo_image,
							site,
							social_a1,
						})
				})))
		.get('/open-source', async context=>
			html_response__new(
				open_source__doc_html_({
					ctx: blog_server_request_ctx__ensure(
						middleware_ctx,
						context, {
							logo_image,
							site,
							social_a1,
						})
				})))
		.get('/tags/:tag', async context=>{
			const { params: { tag } } = context
			const ctx =
				blog_server_request_ctx__ensure(
					middleware_ctx,
					context, {
						logo_image,
						site,
						social_a1,
					})
			tag__set(ctx, tag)
			return html_response__new(
				tag__doc_html_({ ctx }))
		})
)
