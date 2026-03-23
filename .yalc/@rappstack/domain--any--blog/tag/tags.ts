import { id_be_memo_pair_ } from 'ctx-core/rmemo'
import { nullish__none_ } from 'ctx-core/function'
import { dehydrated_post_meta_a1_, type dehydrated_post_meta_T } from '../post/index.js'
import { slug__new } from '../slug/index.js'
export const [
	unique_tags$_,
	unique_tags_,
] = id_be_memo_pair_(
	'unique_tags',
	ctx=>
		nullish__none_([dehydrated_post_meta_a1_(ctx)],
			dehydrated_post_meta_a1=>
				unique_tags__new(dehydrated_post_meta_a1)))
export function unique_tags__new(dehydrated_post_meta_a1:dehydrated_post_meta_T[]) {
	return (
		dehydrated_post_meta_a1
			.filter(({ draft })=>!draft)
			.flatMap(({ tags })=>tags)
			.map(tag=>slug__new(tag))
			.filter((value:string, index:number, self:string[])=>
				self.indexOf(value) === index)
			.sort((tag0:string, tag1:string)=>tag0.localeCompare(tag1))
	)
}
