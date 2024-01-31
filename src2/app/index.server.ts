import './index.css'
import { blog_server_request__init, sorted_posts__new } from '@btakita/domain--server--blog'
import { blog__rss_ } from '@btakita/ui--server--blog/rss'
import { home_page_ } from '@btakita/ui--server--briantakita/home'
import { Elysia } from 'elysia'
import { relement__use } from 'relementjs'
import { server__relement } from 'relementjs/server'
import { html_response__new, middleware_, request_ctx__ensure } from 'relysjs/server'
import { post_mod_a1 } from '../post/index.ts'
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
		.get('/', async context=>{
			const request_ctx = request_ctx__ensure(middleware_ctx, context)
			blog_server_request__init(request_ctx, {
				logo_image,
				site,
				social_a1: social_a1,
			})
			return html_response__new(
				'' + home_page_({
					ctx: request_ctx,
					dehydrated_post_meta_a: post_mod_a1.map(post_mod=>post_mod.meta),
				}))
		})
		.get('/robots.txt', ()=>
			new Response(robots_txt, {
				headers: { 'Content-Type': 'text/plain' },
			}))
		.get('/rss.xml', async context=>
			new Response('' + blog__rss_({
				site,
				dehydrated_post_meta_a1:
					sorted_posts__new(post_mod_a1.map(post_mod=>
						post_mod.meta)),
			}), {
				status: 200,
				headers: {
					'Content-Type': 'application/xml'
				}
			}))
)
