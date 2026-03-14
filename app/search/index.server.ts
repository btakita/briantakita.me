import '../index.css.js'
import { search__doc_html_ } from '@btakita/ui--server--briantakita/search'
import { Hono } from 'hono'
import { html_response__new, middleware_ } from 'rhonojs/server'
import { blog_site } from '../../config/index.js'
import { briantakita_request_ctx__ensure } from '../../ctx/index.js'
export default middleware_(middleware_ctx=>{
	const app = new Hono()
	app.get('/search', async c=>
		html_response__new(
			search__doc_html_({
				ctx: briantakita_request_ctx__ensure(
					middleware_ctx,
					c,
					{ blog_site })
			})))
	return app
})
