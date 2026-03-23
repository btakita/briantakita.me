import { sorted_dehydrated_post_meta_a1_ } from '@rappstack/domain--any--blog/post'
import { nullish__none_, tup } from 'ctx-core/function'
import { id_be_memo_pair_ } from 'rmemo'
import { site__page__post_count_ } from '../site/index.js'
export const [
	page_num_a1$_,
	page_num_a1_,
] = id_be_memo_pair_(
	'page_num_a1',
	ctx=>
		nullish__none_(tup(
			site__page__post_count_(ctx),
			sorted_dehydrated_post_meta_a1_(ctx)
		), (
			site__page__post_count,
			sorted_dehydrated_post_meta_a1
		)=>page_num_a1__new(
			site__page__post_count,
			sorted_dehydrated_post_meta_a1.length)))
export function page_num_a1__new(
	site__page__post_count:number,
	post_count:number
) {
	const page__post_count = post_count / Number(site__page__post_count)
	let page__post_count_a1:number[] = []
	for (let i = 1; i <= Math.ceil(page__post_count); i++) {
		page__post_count_a1 = [...page__post_count_a1, i]
	}
	return page__post_count_a1
}
