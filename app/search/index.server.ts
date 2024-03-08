import '../index.css.js'
import { search__doc_html_ } from '@btakita/ui--server--briantakita/search'
import { blog_request_ctx__ensure } from '@rappstack/domain--server--blog/ctx'
import { Elysia } from 'elysia'
import { html_response__new, middleware_ } from 'relysjs/server'
import { blog_site, logo_image__new, social_a1 } from '../../config/index.js'
import { post_mod_a1 } from '../../post/index.js'
export default middleware_(middleware_ctx=>
	new Elysia({
		name: 'search_routes'
	})
		.get('/search', async context=>
			html_response__new(
				search__doc_html_({
					ctx: blog_request_ctx__ensure(
						middleware_ctx,
						context, {
							logo_image__new,
							blog_site,
							social_a1,
							post_mod_a1,
						})
				})))
)
