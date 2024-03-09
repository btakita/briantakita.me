import { blog_request_ctx__ensure, type blog_request_ctx__ensure_config_T } from '@rappstack/domain--server--blog/ctx'
import type { middleware_ctx_T } from 'rebuildjs/server'
import {
	AboutPage_id_ref_,
	ContactPage_id_ref_,
	Organization_id_ref_,
	Person_id_ref_,
	WebSite_id_ref_
} from './jsonld.js'
export function briantakita_request_ctx__ensure(
	middleware_ctx:middleware_ctx_T,
	context:{
		request:Request
		store:{ [x:string]:unknown }
	},
	config:blog_request_ctx__ensure_config_T
) {
	const request_ctx = blog_request_ctx__ensure(middleware_ctx, context, config)
	Person_id_ref_(request_ctx)
	WebSite_id_ref_(request_ctx)
	Organization_id_ref_(request_ctx)
	AboutPage_id_ref_(request_ctx)
	ContactPage_id_ref_(request_ctx)
	return request_ctx
}
