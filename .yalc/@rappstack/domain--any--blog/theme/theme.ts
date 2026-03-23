import { is_browser_, is_server_ } from 'ctx-core/env'
import { id_be_sig_triple_, memo_, rmemo__off__add, type wide_ctx_T } from 'rmemo'
export const [
	theme$_,
	theme_,
] = id_be_sig_triple_<theme_T, { watch?:MediaQueryList }>(
	'theme',
	()=>(is_browser_() && <theme_T>localStorage.getItem('theme')) || 'light',
	[
		(ctx, theme$)=>{
			if (is_server_()) return
			return memo_(()=>{
				document.firstElementChild!.setAttribute('data-color-scheme', theme$())
				// Get a reference to the body element
				const { body } = document
				// Check if the body element exists before using getComputedStyle
				if (body) {
					// Get the computed styles for the body element
					const ComputedStyle = window.getComputedStyle(body)
					// Get the background color property
					const { backgroundColor } = ComputedStyle
					// Set the background color in <meta theme-color ... />
					document
						.querySelector('meta[name="theme-color"]')
						?.setAttribute('content', backgroundColor)
				}
			})
		},
		(ctx, theme$)=>{
			if (is_browser_()) {
				const watch = window.matchMedia('(prefers-color-scheme: dark)')
				watch.addEventListener('change', watch__onchange)
				rmemo__off__add(theme$, ()=>{
					watch.removeEventListener('change', watch__onchange)
				})
				const localStorage__theme = localStorage.getItem('theme') as theme_T
				theme$.set(
					localStorage__theme
						? localStorage__theme
						: theme__new(watch.matches))
			}
			function watch__onchange({ matches: is_dark }:{ matches:boolean }) {
				const theme = theme__new(is_dark)
				theme$.set(theme)
				localStorage.setItem('theme', theme)
			}
		}
	]
)
function theme__new(is_dark:boolean) {
	return is_dark ? 'dark' : 'light'
}
export function theme__set(ctx:wide_ctx_T, theme:theme_T) {
	localStorage.setItem('theme', theme)
	theme$_(ctx).set(theme)
}
export function theme__toggle(ctx:wide_ctx_T) {
	theme__set(ctx, theme_(ctx) === 'light' ? 'dark' : 'light')
}
export type theme_T = 'light'|'dark'
