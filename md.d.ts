declare module '*.md' {
	import { type request_ctx_T } from 'rebuildjs/server'
	export const meta_:(ctx:request_ctx_T)=>any
	const _default:(ctx:request_ctx_T)=>any
	export default _default
}
