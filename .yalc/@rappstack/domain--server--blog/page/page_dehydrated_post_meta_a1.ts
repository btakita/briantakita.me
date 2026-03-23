import { sorted_dehydrated_post_meta_a1_ } from '@rappstack/domain--any--blog/post'
import { nullish__none_, tup } from 'ctx-core/function'
import { id_be_memo_pair_ } from 'rmemo'
import { site__page__post_count_ } from '../site/index.js'
import { page_num_ } from './page_num.js'
export const [
	page_dehydrated_post_meta_a1$_,
	page_dehydrated_post_meta_a1_,
] = id_be_memo_pair_(
	'page_dehydrated_post_meta_a1',
	ctx=>
		nullish__none_(tup(
			sorted_dehydrated_post_meta_a1_(ctx),
			page_num_(ctx),
			site__page__post_count_(ctx),
		), (
			sorted_dehydrated_post_meta_a1,
			page_num,
			site__page__post_count,
		)=>{
			const end_post_num = page_num * site__page__post_count
			const begin_post_num = end_post_num - site__page__post_count
			return sorted_dehydrated_post_meta_a1.slice(begin_post_num, end_post_num)
		}))
