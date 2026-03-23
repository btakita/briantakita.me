import { type nullish } from 'ctx-core/function'
import { id_be_memo_pair_, rmemo__wait } from 'rmemo'
import { type SatoriOptions } from 'satori'
import { _fonts_ } from './_fonts.js'
import { _og_image__ctx } from './_og_image__ctx.js'
const [
	_satori_options$_,
	_satori_options_
] = id_be_memo_pair_<SatoriOptions|nullish>(
	'_satori_options',
	()=>undefined,
	[
		(ctx, _satori_options$)=>{
			const _fonts = _fonts_(ctx)
			const {
				regular_font,
				load__regular_font,
				bold_font,
				load__bold_font
			} = _fonts!
			_satori_options$.set({
					width: 1200,
					height: 630,
					embedFont: true,
					fonts: [
						{
							name: load__regular_font.name,
							data: regular_font,
							weight: load__regular_font.weight,
							style: load__regular_font.style,
						},
						{
							name: load__bold_font.name,
							data: bold_font,
							weight: load__bold_font.weight,
							style: load__bold_font.style,
						},
					],
				})
		}
	])
export function _satori_options__load() {
	return rmemo__wait(
		_satori_options$_(_og_image__ctx),
		$=>$,
		10_000) as Promise<SatoriOptions>
}
