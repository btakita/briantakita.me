import { nullish__none_, tup } from 'ctx-core/function'
import { id_be_memo_pair_ } from 'rmemo'
import { page_num_ } from '../page/index.js'
import { blog_post_slug_or_page_num_ } from './blog_post_slug_or_page_num.js'
export const [
	blog_post_slug$_,
	blog_post_slug_,
] = id_be_memo_pair_(
	'blog_post_slug',
	ctx=>
		nullish__none_(tup(
			blog_post_slug_or_page_num_(ctx),
			page_num_(ctx)
		), (blog_post_slug_or_page_num, page_num)=>
			page_num ? null : blog_post_slug_or_page_num))
