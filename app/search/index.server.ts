import '../index.css.js'
import { search__doc_html_ } from '@btakita/ui--server--briantakita/search'
import { blog_server_request_ctx__ensure } from '@rappstack/domain--server--blog/ctx'
import { Elysia } from 'elysia'
import { html_response__new, middleware_ } from 'relysjs/server'
import { post_mod_a1 } from '../../post/index.js'
import { logo_image, site, social_a1 } from '../config.js'
export default middleware_(middleware_ctx=>
	new Elysia({
		name: 'search_routes'
	})
		.get('/search', async context=>
			html_response__new(
				search__doc_html_({
					ctx: blog_server_request_ctx__ensure(
						middleware_ctx,
						context, {
							logo_image,
							site,
							social_a1,
							post_mod_a1,
						})
				})))
)
