import './index.css'
import { about__doc_html_ } from '@btakita/ui--server--briantakita/about'
import { home__doc_html_ } from '@btakita/ui--server--briantakita/home'
import { open_source__doc_html_ } from '@btakita/ui--server--briantakita/open_source'
import { portfolio__doc_html_ } from '@btakita/ui--server--briantakita/portfolio'
import { post__doc_html_, posts__doc_html_ } from '@btakita/ui--server--briantakita/post'
import { tag__doc_html_, tags__doc_html_ } from '@btakita/ui--server--briantakita/tag'
import { blog_server_request_ctx__ensure } from '@rappstack/domain--server--blog/ctx'
import { page_num_ } from '@rappstack/domain--server--blog/page'
import { blog_post_slug_or_page_num__set } from '@rappstack/domain--server--blog/post'
import { tag__set } from '@rappstack/domain--server--blog/tag'
import { blog__rss_xml_ } from '@rappstack/ui--server--blog/rss'
import { Elysia } from 'elysia'
import { relement__use } from 'relementjs'
import { server__relement } from 'relementjs/server'
import { html_response__new, middleware_ } from 'relysjs/server'
import { post_mod_a1 } from '../post/index.js'
import { logo_image, site, social_a1 } from './config.js'
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
							post_mod_a1,
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
						post_mod_a1,
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
							post_mod_a1,
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
							post_mod_a1,
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
							post_mod_a1,
						})
				})))
		.get('/posts', async context=>
			html_response__new(
				posts__doc_html_({
					ctx: blog_server_request_ctx__ensure(
						middleware_ctx,
						context, {
							logo_image,
							site,
							social_a1,
							post_mod_a1,
						})
				})))
		.get('/posts/:slug_or_page_num', async context=>{
			const { params: { slug_or_page_num } } = context
			const ctx =
				blog_server_request_ctx__ensure(
					middleware_ctx,
					context, {
						logo_image,
						site,
						social_a1,
						post_mod_a1,
					})
			blog_post_slug_or_page_num__set(ctx, slug_or_page_num)
			return html_response__new(
				page_num_(ctx)
					? posts__doc_html_({ ctx })
					: post__doc_html_({ ctx }))
		})
		.get('/tags', async context=>
			html_response__new(
				tags__doc_html_({
					ctx: blog_server_request_ctx__ensure(
						middleware_ctx,
						context, {
							logo_image,
							site,
							social_a1,
							post_mod_a1,
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
						post_mod_a1,
					})
			tag__set(ctx, tag)
			return html_response__new(
				tag__doc_html_({ ctx }))
		})
)
