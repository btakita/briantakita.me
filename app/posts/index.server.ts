import '../index.css'
import { post__doc_html_, posts__doc_html_ } from '@btakita/ui--server--briantakita/post'
import { blog_request_ctx__ensure } from '@rappstack/domain--server--blog/ctx'
import { page_num_ } from '@rappstack/domain--server--blog/page'
import { blog_post_slug_or_page_num__set } from '@rappstack/domain--server--blog/post'
import { blog_post__estimate_read_minutes__wait } from '@rappstack/ui--server--blog/post'
import { url__join } from 'ctx-core/uri'
import { Elysia } from 'elysia'
import { basename } from 'node:path'
import { assets__assign, browser__metafile_, type request_ctx_T } from 'rebuildjs/server'
import { html_response__new, middleware_ } from 'relysjs/server'
import { blog_site, logo_image__new, social_a1 } from '../../config.js'
import { post_mod_a1 } from '../../post/index.js'
export default middleware_(middleware_ctx=>
	new Elysia({
		name: 'posts_routes'
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
			if (slug_or_page_num === 'squarespace-site-lighthouse-scores') {
				entryPoint__assets__assign(ctx, 'app/posts/squarespace-site-lighthouse-scores/index.browser.ts')
			}
			return html_response__new(
				page_num_(ctx)
					? posts__doc_html_({ ctx })
					: await blog_post__estimate_read_minutes__wait(ctx)
						.then(()=>post__doc_html_({ ctx })))
		}))
function entryPoint__assets__assign(ctx:request_ctx_T, entryPoint:string) {
	const outputs = browser__metafile_(ctx)!.outputs
	for (let output__relative_path in outputs) {
		if (outputs[output__relative_path].entryPoint === entryPoint) {
			assets__assign(ctx, { script_a: [url__join('', basename(output__relative_path))] })
			break
		}
	}
}
