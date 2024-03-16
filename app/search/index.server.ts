import '../index.css.js'
import { search__doc_html_ } from '@btakita/ui--server--briantakita/search'
import { Elysia } from 'elysia'
import { html_response__new, middleware_ } from 'relysjs/server'
import { blog_site } from '../../config/index.js'
import { briantakita_request_ctx__ensure } from '../../ctx/index.js'
export default middleware_(middleware_ctx=>
	new Elysia({
		name: 'search_routes'
	})
		.get('/search', async context=>
			html_response__new(
				search__doc_html_({
					ctx: briantakita_request_ctx__ensure(
						middleware_ctx,
						context,
						{ blog_site })
				}))))
