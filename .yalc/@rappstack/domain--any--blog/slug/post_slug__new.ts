import { type dehydrated_post_meta_T } from '../post/index.js'
import { slug__new } from './slug__new.js'
export function post_slug__new(dehydrated_post_meta:dehydrated_post_meta_T) {
	return (
		dehydrated_post_meta.slug
			? dehydrated_post_meta.slug
			: slug__new(dehydrated_post_meta.title)
	)
}
