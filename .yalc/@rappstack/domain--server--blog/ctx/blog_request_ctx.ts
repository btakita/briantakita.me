import { post_mod_a1__set } from '@rappstack/domain--any--blog/post'
import type { Context } from 'hono'
import { type middleware_ctx_T } from 'rebuildjs/server'
import { request_ctx__ensure } from 'rhonojs/server'
import { blog_site__set, type blog_site_T, site__post_mod_a1_ } from '../site/index.js'
export function blog_request_ctx__ensure(
	middleware_ctx:middleware_ctx_T,
	c:Context,
	{ blog_site }:blog_request_ctx__ensure_config_T
) {
	const request_ctx = request_ctx__ensure(middleware_ctx, c)
	blog_site__set(request_ctx, blog_site)
	post_mod_a1__set(request_ctx, site__post_mod_a1_(request_ctx))
	return request_ctx
}
export type blog_request_ctx__ensure_config_T = {
	blog_site:blog_site_T
}
