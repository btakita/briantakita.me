import { be_sig_triple_, type wide_ctx_T } from 'ctx-core/rmemo'
import { url__join, type url_segment_T } from 'ctx-core/uri'
import { post_slug__new } from '../slug/index.js'
import { type dehydrated_post_meta_T } from './index.js'
export const [
	,
	post_path_prefix_,
	post_path_prefix__set,
] = be_sig_triple_(()=>'posts')
export function post_path__new(
	ctx:wide_ctx_T,
	url_segment_OR_dehydrated_post_meta:url_segment_T|dehydrated_post_meta_T
) {
	return url__join(
		post_path_prefix_(ctx),
		typeof url_segment_OR_dehydrated_post_meta === 'object'
			? post_slug__new(url_segment_OR_dehydrated_post_meta)
			: url_segment_OR_dehydrated_post_meta)
}
