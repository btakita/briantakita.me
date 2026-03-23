import type { post_mod_T } from '@rappstack/domain--any--blog/post'
import { site__set, type site_T, type social_T } from '@rappstack/domain--server/site'
import { id_be_sig_triple_, memo_ } from 'relementjs'
import { id_be_memo_pair_ } from 'rmemo'
export const [
	,
	blog_site_,
	blog_site__set
] = id_be_sig_triple_(
	'blog_site',
	()=><blog_site_T|undefined>undefined,
	[
		(ctx, blog_site$)=>
			memo_(()=>site__set(ctx, blog_site$()))
	])
export const [
	,
	site__page__post_count_,
] = id_be_memo_pair_(
	'site__page__post_count',
	ctx=>blog_site_(ctx)?.page__post_count)
export const [
	,
	site__home__post_count_,
] = id_be_memo_pair_(
	'site__home__post_count',
	ctx=>blog_site_(ctx)?.home__post_count)
export const [
	,
	site__post_mod_a1_
] = id_be_memo_pair_(
	'site__post_mod_a1',
	ctx=>blog_site_(ctx)?.post_mod_a1)
export type blog_site_T = site_T&{
	social_a1:social_T[]
	post_mod_a1:post_mod_T[]
	page__post_count:number
	home__post_count:number
}
