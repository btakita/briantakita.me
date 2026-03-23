import { type Post } from '@rappstack/domain--any--blog/post'
import { type request_ctx_T } from 'rhonojs/server'
import satori from 'satori'
import { post__og_template__new } from './_og_template/index.js'
import { _satori_options__load } from './_satori_options.js'
import { _svg__png_buffer__new } from './_svg__png_buffer__new.js'
export async function post__og_image__buffer__new(
	ctx:request_ctx_T,
	post:Post
) {
	const _satori_options = await _satori_options__load()
	const svg = await satori(
		post__og_template__new(ctx, post),
		_satori_options)
	return _svg__png_buffer__new(svg)
}
