import { nullish__none_ } from 'ctx-core/function'
import { id_be_memo_pair_ } from 'rmemo'
import { page_num_a1_ } from './page_num_a1.js'
export const [
	page_count$_,
	page_count_,
] = id_be_memo_pair_(
	'page_count',
	ctx=>
		nullish__none_([page_num_a1_(ctx)], (
			page__post_count_a1
		)=>page__post_count_a1.length))
