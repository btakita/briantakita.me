import { isNumber } from 'ctx-core/number'
import { id_be_memo_pair_ } from 'rmemo'
import { blog_post_slug_or_page_num_ } from '../post/index.js'
import { page_num_a1_ } from './page_num_a1.js'
export const [
	page_num$_,
	page_num_,
] = id_be_memo_pair_(
	'page_num',
	ctx=>
		blog_post_slug_or_page_num_(ctx) == null
			? 1
			: (
				isNumber(blog_post_slug_or_page_num_(ctx))
				&& page_num_a1_(ctx)?.includes?.(Number(blog_post_slug_or_page_num_(ctx))))
				? Number(blog_post_slug_or_page_num_(ctx))
				: 0)
