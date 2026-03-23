import { style_ } from 'ctx-core/html'
import { type ReactNode } from 'react'
import { relement__use } from 'relementjs'
import { div_, p_, span_ } from 'relementjs/html'
import { server__relement } from 'relementjs/server'
import { type request_ctx_T } from 'rhonojs/server'
import { html } from 'satori-html'
import { site__description_, site__title_, site__website__url_ } from '@rappstack/domain--server/site'
export function site__og_template__new(ctx:request_ctx_T) {
	relement__use(server__relement)
	// language=html
	return html('' +
		div_<'server'>({
			style: style_({
				background: '#fefbfb',
				width: '100%',
				height: '100%',
				display: 'flex',
				'align-items': 'center',
				'justify-content': 'center',
			})
		}, [
			div_({
				style: style_({
					position: 'absolute',
					top: '-1px',
					right: '-1px',
					border: '4px solid #000',
					background: '#ecebeb',
					opacity: '0.9',
					'border-radius': '4px',
					display: 'flex',
					'justify-content': 'center',
					margin: '2.5rem',
					width: '88%',
					height: '80%',
				})
			}, [
				div_({
					style: style_({
						border: '4px solid #000',
						background: '#fefbfb',
						'border-radius': '4px',
						display: 'flex',
						'justify-content': 'center',
						margin: '2rem',
						width: '88%',
						height: '80%',
					})
				}, [
					div_({
						style: style_({
							display: 'flex',
							'flex-direction': 'column',
							'justify-content': 'space-between',
							margin: '20px',
							width: '90%',
							height: '90%',
						})
					}, [
						div_({
							style: style_({
								display: 'flex',
								'flex-direction': 'column',
								'justify-content': 'center',
								'align-items': 'center',
								height: '90%',
								'max-deight': '90%',
								overflow: 'hidden',
								'text-align': 'center',
							})
						}, [
							p_({
								style: style_({
									'font-size': 72,
									'font-weight': 'bold',
								})
							}, site__title_(ctx)),
							p_({
								style: style_({
									'font-size': 28
								})
							}, site__description_(ctx))
						]),
						div_({
							style: style_({
								display: 'flex',
								'justify-content': 'flex-end',
								width: '100%',
								'margin-bottom': '8px',
								'font-size': 28,
							})
						}, [
							span_({
								style: style_({
									overflow: 'hidden',
									'font-weight': 'bold',
								})
							}, site__website__url_(ctx)?.hostname)
						])
					])
				])
			])
		])) as ReactNode
}
