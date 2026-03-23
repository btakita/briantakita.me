import { nullish__none_ } from 'ctx-core/function'
export function blog_post__estimate_read_minutes__new(_blog_post__text?:string) {
	return nullish__none_([_blog_post__text], blog_post__text=>
		Math.ceil(blog_post__text.split(/\s+/).length / 200))
}
