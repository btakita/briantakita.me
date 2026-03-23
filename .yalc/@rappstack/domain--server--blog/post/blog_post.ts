import { post_mod_a1_ } from '@rappstack/domain--any--blog/post'
import { nullish__none_, tup } from 'ctx-core/function'
import { type request_ctx_T } from 'rhonojs/server'
import { id_be_memo_pair_ } from 'rmemo'
import { blog_post_slug_ } from './blog_post_slug.js'
export const [
	,
	blog_post_mod_,
] = id_be_memo_pair_(
	'blog_post_mod',
	(ctx:request_ctx_T)=>
		nullish__none_(tup(
			post_mod_a1_(ctx),
			blog_post_slug_(ctx)
		), (
			post_mod,
			post_slug
		)=>post_mod.find(post_mod=>
			post_mod.meta_(ctx).slug === post_slug)))
export const [
	,
	blog_post_mod__meta_,
] = id_be_memo_pair_(
	'blog_post_mod__meta',
	(ctx:request_ctx_T)=>
		blog_post_mod_(ctx)?.meta_(ctx))
/** @see {import('@rappstack/ui--server--blog/post').blog_post__html$_} */
export const [
	,
	blog_post__tag_,
] = id_be_memo_pair_(
	'blog_post__tag',
	(ctx:request_ctx_T)=>
		blog_post_mod_(ctx)?.default)
export const [
	,
	blog_post__canonical_url_,
] = id_be_memo_pair_(
	'blog_post__canonical_url',
	(ctx:request_ctx_T)=>
		blog_post_mod__meta_(ctx)?.canonical_url)
export const [
	,
	blog_post__hero_image_,
] = id_be_memo_pair_(
	'blog_post__hero_image',
	(ctx:request_ctx_T)=>
		blog_post_mod__meta_(ctx)?.hero_image)
export const [
	,
	blog_post__pub_date_,
] = id_be_memo_pair_(
	'blog_post__pub_date',
	(ctx:request_ctx_T)=>
		blog_post_mod__meta_(ctx)?.pub_date)
export const [
	,
	blog_post__tags_,
] = id_be_memo_pair_(
	'blog_post__tags',
	(ctx:request_ctx_T)=>
		blog_post_mod__meta_(ctx)?.tags)
export const [
	,
	blog_post__author_a1_,
] = id_be_memo_pair_(
	'blog_post__author_a1',
	(ctx:request_ctx_T)=>
		blog_post_mod__meta_(ctx)?.author_a1)
export const [
	,
	blog_post__title_,
] = id_be_memo_pair_(
	'blog_post__title',
	(ctx:request_ctx_T)=>
		blog_post_mod__meta_(ctx)?.title)
export const [
	,
	blog_post__subtitle_,
] = id_be_memo_pair_(
	'blog_post__subtitle',
	(ctx:request_ctx_T)=>
		blog_post_mod__meta_(ctx)?.subtitle)
export const [
	,
	blog_post__description_,
] = id_be_memo_pair_(
	'blog_post__description',
	(ctx:request_ctx_T)=>
		blog_post_mod__meta_(ctx)?.description)
export const [
	,
	blog_post__description_html_,
] = id_be_memo_pair_(
	'blog_post__description_html',
	(ctx:request_ctx_T)=>
		blog_post_mod__meta_(ctx)?.description_html)
export const [
	,
	blog_post__video_url_,
] = id_be_memo_pair_(
	'blog_post__video_url',
	(ctx:request_ctx_T)=>
		blog_post_mod__meta_(ctx)?.video_url)
export const [
	,
	blog_post__playlist_url_,
] = id_be_memo_pair_(
	'blog_post__playlist_url',
	(ctx:request_ctx_T)=>
		blog_post_mod__meta_(ctx)?.playlist_url)
