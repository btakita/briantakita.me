import {
	AboutPage_id_ref_,
	ContactPage_id_ref_,
	Organization_id_ref_,
	Person_id_ref_,
	WebSite_id_ref_
} from '@btakita/domain--server--briantakita/jsonld'
import { sticky__top__nav_class } from '@btakita/ui--server--briantakita/sticky'
import { blog_request_ctx__ensure, type blog_request_ctx__ensure_config_T } from '@rappstack/domain--server--blog/ctx'
import { marked__set } from '@rappstack/ui--any/md'
import { breadcrumbs__nav_class__set } from '@rappstack/ui--server--blog/breadcrumb'
import { app_marked_ } from '@rappstack/ui--server/md'
import type { middleware_ctx_T } from 'rebuildjs/server'
export function briantakita_request_ctx__ensure(
	middleware_ctx:middleware_ctx_T,
	context:{
		request:Request
		store:{ [x:string]:unknown }
	},
	config:blog_request_ctx__ensure_config_T
) {
	const ctx = blog_request_ctx__ensure(middleware_ctx, context, config)
	Person_id_ref_(ctx)
	WebSite_id_ref_(ctx)
	Organization_id_ref_(ctx)
	AboutPage_id_ref_(ctx)
	ContactPage_id_ref_(ctx)
	marked__set(ctx, app_marked_(ctx))
	breadcrumbs__nav_class__set(ctx, sticky__top__nav_class)
	return ctx
}
