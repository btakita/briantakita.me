import './index.css'
import { blog_server_request__init } from '@btakita/domain--server--blog'
import { home_page_ } from '@btakita/ui--server--briantakita/home'
import { Elysia } from 'elysia'
import { html_response__new, middleware_, request_ctx__ensure } from 'relysjs/server'
import { post_mod_a1 } from '../post/index.ts'
import { logo_image, site, social_a1 } from './config.ts'
export default middleware_(middleware_ctx=>
	new Elysia({
		name: 'root_routes'
	}).get('/', async context=>{
		const request_ctx = request_ctx__ensure(middleware_ctx, context)
		blog_server_request__init(request_ctx, {
			logo_image,
			site,
			social_a1: social_a1,
		})
		return html_response__new(
			'' + home_page_({
				ctx: request_ctx,
				dehydrated_post_meta_a: post_mod_a1.map(post_mod=>post_mod.meta),
				social__count: 0,
			}))
	}))
