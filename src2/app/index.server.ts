import './index.css'
import { home_page_ } from '@btakita/ui--server--briantakita/home'
import { Elysia } from 'elysia'
import { html_response__new, middleware_, request_ctx__ensure } from 'relysjs/server'
export default middleware_(middleware_ctx=>
	new Elysia({
		name: 'root_routes'
	}).get('/', async context=>{
		const request_ctx = request_ctx__ensure(middleware_ctx, context)
		return html_response__new(
			'' + home_page_({
				ctx: request_ctx,
				featured__posts: [],
				posts: [],
				social__count: 0,
			}))
	}))
