import './index.css'
import { about__doc_html_, about__html_ } from '@btakita/ui--server--briantakita/about'
import { home__doc_html_ } from '@btakita/ui--server--briantakita/home'
import { open_source__doc_html_, open_source__html_ } from '@btakita/ui--server--briantakita/open_source'
import { portfolio__doc_html_, portfolio__html_ } from '@btakita/ui--server--briantakita/portfolio'
import { sitemap__xml_ } from '@btakita/ui--server--briantakita/sitemap'
import { tag__doc_html_, tags__doc_html_ } from '@btakita/ui--server--briantakita/tag'
import { tag__set } from '@rappstack/domain--server--blog/tag'
import { html__text_ } from '@rappstack/domain--server/html'
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
			const about__html = about__html_({ ctx })
			const articleBody = await html__text_(about__html)
			return html_response__new(about__doc_html_({ ctx, about__html, articleBody }))
		})
		.get('/open-source', async context=>{
			const ctx = briantakita_request_ctx__ensure(
				middleware_ctx,
				context,
				{ blog_site })
			const open_source__html = open_source__html_({ ctx })
			const articleBody = await html__text_(open_source__html)
			return html_response__new(open_source__doc_html_({ ctx, open_source__html, articleBody }))
		})
		.get('/portfolio', async context=>{
			const ctx = briantakita_request_ctx__ensure(
				middleware_ctx,
				context,
				{ blog_site })
			const portfolio__html = portfolio__html_({ ctx })
			const articleBody = await html__text_(portfolio__html)
			return html_response__new(portfolio__doc_html_({ ctx, portfolio__html, articleBody }))
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
