import { type dehydrated_post_meta_T } from '@rappstack/domain--any--blog/post'
import { type author_T, site__author_a1_ } from '@rappstack/domain--server/site'
import { md__raw_ } from '@rappstack/ui--any/md'
import { type request_ctx_T } from 'rebuildjs/server'
export function post_meta__validate(
	ctx:request_ctx_T,
	in_dehydrated_post_meta:in_dehydrated_post_meta_T,
):dehydrated_post_meta_T {
	const {
		pub_date,
		updated_date,
		description_md,
		...rest_dehydrated_post_meta
	} = in_dehydrated_post_meta
	if (isNaN(new Date(pub_date) as never)) {
		throw Error('invalid pub_date ' + pub_date)
	}
	if (
		updated_date
		&& isNaN(new Date(updated_date) as never)
	) {
		throw Error('invalid updated_date ' + updated_date)
	}
	return {
		author_a1: site__author_a1_(ctx)!,
		pub_date,
		updated_date,
		...rest_dehydrated_post_meta,
		...(
			description_md
				? { description_html: '' + md__raw_<'server'>({ ctx }, description_md) }
				: {}),
		tags: in_dehydrated_post_meta.tags ?? ['other']
	}
}
export type in_dehydrated_post_meta_T = {
	author_a1?:[author_T, ...author_T[]]
	pub_date:string
	title:string
	subtitle?:string
	slug:string
	description:string
	description_md?:string
	updated_date?:string
	hero_image?:string
	og_image?:string
	tags?:string[]
	featured?:boolean
	draft?:boolean
	canonical_url?:string
	is_pillar?:boolean
	video_url?:string
	playlist_url?:string
}
