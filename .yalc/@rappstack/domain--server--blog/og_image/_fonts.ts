import { type wide_ctx_T } from 'ctx-core/be'
import { type nullish, nullish__none_ } from 'ctx-core/function'
import { id_be_sig_triple_ } from 'relementjs'
import { load__bold_font_, type load__font_T, load__regular_font_ } from './font/index.js'
export const [
	_fonts$_,
	_fonts_,
] = id_be_sig_triple_<_font_T|nullish>(
	'_fonts',
	()=>undefined,
	[
		(ctx, _fonts$)=>
			nullish__none_([load__regular_font_(ctx), load__bold_font_(ctx)], async (
				load__regular_font,
				load__bold_font
			)=>{
				const fonts = await _fonts__load(ctx)
				if (
					load__regular_font === load__regular_font_(ctx)
					&& load__bold_font === load__bold_font_(ctx)
				) {
					_fonts$.set(fonts)
				}
			}, nullish=>{
				_fonts$.set(nullish)
			})
	])
async function _fonts__load(ctx:wide_ctx_T):Promise<_font_T> {
	// Regular Font
	const load__regular_font = load__regular_font_(ctx)!
	const regular_font__response = await fetch(load__regular_font.url)
	const regular_font = await regular_font__response.arrayBuffer()
	// Bold Font
	const load__bold_font = load__bold_font_(ctx)!
	const bold_font__response = await fetch(load__bold_font.url)
	const bold_font = await bold_font__response.arrayBuffer()
	return {
		regular_font,
		load__regular_font,
		bold_font,
		load__bold_font,
	}
}
export interface _font_T {
	regular_font:ArrayBuffer
	load__regular_font:load__font_T
	bold_font:ArrayBuffer
	load__bold_font:load__font_T
}
