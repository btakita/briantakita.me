import './index.css'
import { about__doc_html_ } from '@btakita/ui--server--briantakita/about'
import { home__doc_html_ } from '@btakita/ui--server--briantakita/home'
import { open_source__doc_html_ } from '@btakita/ui--server--briantakita/open_source'
import { portfolio__doc_html_ } from '@btakita/ui--server--briantakita/portfolio'
import { post__doc_html_, posts__doc_html_ } from '@btakita/ui--server--briantakita/post'
import { sitemap__xml_ } from '@btakita/ui--server--briantakita/sitemap'
import { tag__doc_html_, tags__doc_html_ } from '@btakita/ui--server--briantakita/tag'
import { blog_request_ctx__ensure } from '@rappstack/domain--server--blog/ctx'
import { page_num_ } from '@rappstack/domain--server--blog/page'
import { blog_post_slug_or_page_num__set } from '@rappstack/domain--server--blog/post'
import { tag__set } from '@rappstack/domain--server--blog/tag'
import { redirect_response__new, text_response__new, xml_response__new } from '@rappstack/domain--server/response'
import { blog_post__estimate_read_minutes__wait } from '@rappstack/ui--server--blog/post'
import { blog__rss_xml_ } from '@rappstack/ui--server--blog/rss'
import { Elysia } from 'elysia'
import { relement__use } from 'relementjs'
import { server__relement } from 'relementjs/server'
import { html_response__new, middleware_ } from 'relysjs/server'
import { blog_site, logo_image__new, social_a1 } from '../config.js'
import { post_mod_a1 } from '../post/index.js'
relement__use(server__relement)
const robots_txt = `
User-agent: *
Allow: /
Sitemap: ${new URL('sitemap.xml', blog_site.website).href}
`.trim()
export default middleware_(middleware_ctx=>
	new Elysia({
		name: 'root_routes'
	})
		.get('/', async context=>{
			const ctx = blog_request_ctx__ensure(
				middleware_ctx,
				context, {
					logo_image__new,
					blog_site,
					social_a1,
					post_mod_a1,
				})
			return html_response__new(home__doc_html_({ ctx }))
		})
		.get('/robots.txt', ()=>
			text_response__new(robots_txt))
		.get('/rss', async context=>
			xml_response__new(blog__rss_xml_({
				ctx: blog_request_ctx__ensure(
					middleware_ctx,
					context, {
						logo_image__new,
						blog_site,
						social_a1,
						post_mod_a1,
					})
			})))
		.get('/rss.xml', ()=>
			redirect_response__new(301, '/rss'))
		.get('/sitemap.xml', async context=>{
			const ctx = blog_request_ctx__ensure(
				middleware_ctx,
				context, {
					logo_image__new,
					blog_site,
					social_a1,
					post_mod_a1,
				})
			return xml_response__new(sitemap__xml_({ ctx }))
		})
		.get('/about', async context=>{
			const ctx = blog_request_ctx__ensure(
				middleware_ctx,
				context, {
					logo_image__new,
					blog_site,
					social_a1,
					post_mod_a1,
				})
			return html_response__new(about__doc_html_({ ctx }))
		})
		.get('/open-source', async context=>{
			const ctx = blog_request_ctx__ensure(
				middleware_ctx,
				context, {
					logo_image__new,
					blog_site,
					social_a1,
					post_mod_a1,
				})
			return html_response__new(open_source__doc_html_({ ctx }))
		})
		.get('/portfolio', async context=>{
			const ctx = blog_request_ctx__ensure(
				middleware_ctx,
				context, {
					logo_image__new,
					blog_site,
					social_a1,
					post_mod_a1,
				})
			return html_response__new(portfolio__doc_html_({ ctx }))
		})
		.get('/posts', async context=>{
			const ctx = blog_request_ctx__ensure(
				middleware_ctx,
				context, {
					logo_image__new,
					blog_site,
					social_a1,
					post_mod_a1,
				})
			return html_response__new(posts__doc_html_({ ctx }))
		})
		.get('/posts/:slug_or_page_num', async context=>{
			const { params: { slug_or_page_num } } = context
			const ctx = blog_request_ctx__ensure(
				middleware_ctx,
				context, {
					logo_image__new,
					blog_site,
					social_a1,
					post_mod_a1,
				})
			blog_post_slug_or_page_num__set(ctx, slug_or_page_num)
			return html_response__new(
				page_num_(ctx)
					? posts__doc_html_({ ctx })
					: await blog_post__estimate_read_minutes__wait(ctx)
						.then(()=>post__doc_html_({ ctx })))
		})
		.get('/tags', async context=>{
			const ctx = blog_request_ctx__ensure(
				middleware_ctx,
				context, {
					logo_image__new,
					blog_site,
					social_a1,
					post_mod_a1,
				})
			return html_response__new(tags__doc_html_({ ctx }))
		})
		.get('/tags/:tag', async context=>{
			const { params: { tag } } = context
			const ctx =
				blog_request_ctx__ensure(
					middleware_ctx,
					context, {
						logo_image__new,
						blog_site,
						social_a1,
						post_mod_a1,
					})
			tag__set(ctx, tag)
			return html_response__new(tag__doc_html_({ ctx }))
		}))
