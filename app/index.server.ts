import './index.css'
import { about__doc_html_ } from '@btakita/ui--server--briantakita/about'
import { home__doc_html_ } from '@btakita/ui--server--briantakita/home'
import { open_source__doc_html_ } from '@btakita/ui--server--briantakita/open_source'
import { portfolio__doc_html_ } from '@btakita/ui--server--briantakita/portfolio'
import { sitemap__xml_ } from '@btakita/ui--server--briantakita/sitemap'
import { tag__doc_html_, tags__doc_html_ } from '@btakita/ui--server--briantakita/tag'
import { tag__set } from '@rappstack/domain--server--blog/tag'
import { redirect_response__new, text_response__new, xml_response__new } from '@rappstack/domain--server/response'
import { blog__rss_xml_ } from '@rappstack/ui--server--blog/rss'
import { Elysia } from 'elysia'
import { relement__use } from 'relementjs'
import { server__relement } from 'relementjs/server'
import { html_response__new, middleware_ } from 'relysjs/server'
import { blog_site } from '../config/index.js'
import { briantakita_request_ctx__ensure } from '../ctx/index.js'
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
			const ctx = briantakita_request_ctx__ensure(
				middleware_ctx,
				context,
				{ blog_site })
			return html_response__new(home__doc_html_({ ctx }))
		})
		.get('/robots.txt', ()=>
			text_response__new(robots_txt))
		.get('/rss', async context=>
			xml_response__new(blog__rss_xml_({
				ctx: briantakita_request_ctx__ensure(
					middleware_ctx,
					context,
					{ blog_site })
			})))
		.get('/rss.xml', ()=>
			redirect_response__new(301, '/rss'))
		.get('/sitemap.xml', async context=>{
			const ctx = briantakita_request_ctx__ensure(
				middleware_ctx,
				context,
				{ blog_site })
			return xml_response__new(sitemap__xml_({ ctx }))
		})
		.get('/about', async context=>{
			const ctx = briantakita_request_ctx__ensure(
				middleware_ctx,
				context,
				{ blog_site })
			return html_response__new(about__doc_html_({ ctx }))
		})
		.get('/open-source', async context=>{
			const ctx = briantakita_request_ctx__ensure(
				middleware_ctx,
				context,
				{ blog_site })
			return html_response__new(open_source__doc_html_({ ctx }))
		})
		.get('/portfolio', async context=>{
			const ctx = briantakita_request_ctx__ensure(
				middleware_ctx,
				context,
				{ blog_site })
			return html_response__new(portfolio__doc_html_({ ctx }))
		})
		.get('/tags', async context=>{
			const ctx = briantakita_request_ctx__ensure(
				middleware_ctx,
				context,
				{ blog_site })
			return html_response__new(tags__doc_html_({ ctx }))
		})
		.get('/tags/:tag', async context=>{
			const { params: { tag } } = context
			const ctx = briantakita_request_ctx__ensure(
				middleware_ctx,
				context,
				{ blog_site })
			tag__set(ctx, tag)
			return html_response__new(tag__doc_html_({ ctx }))
		}))
