import '../index.css'
import { post__doc_html_, posts__doc_html_ } from '@btakita/ui--server--briantakita/post'
import { blog_request_ctx__ensure } from '@rappstack/domain--server--blog/ctx'
import { page_num_ } from '@rappstack/domain--server--blog/page'
import { blog_post_slug_or_page_num__set } from '@rappstack/domain--server--blog/post'
import { blog_post__estimate_read_minutes__wait } from '@rappstack/ui--server--blog/post'
import { Elysia } from 'elysia'
import { html_response__new, middleware_ } from 'relysjs/server'
import { blog_site, logo_image__new, social_a1 } from '../../config.js'
import { post_mod_a1 } from '../../post/index.js'
export default middleware_(middleware_ctx=>
	new Elysia({
		name: 'root_routes'
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
		}))
