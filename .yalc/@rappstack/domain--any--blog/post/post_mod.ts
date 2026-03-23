import { type tag_dom_T } from 'relementjs'
import { type request_ctx_T } from 'rhonojs/server'
import { id_be_sig_triple_ } from 'rmemo'
import { type dehydrated_post_meta_T } from './post_meta.js'
export const [
	,
	post_mod_a1_,
	post_mod_a1__set,
] = id_be_sig_triple_<post_mod_T[]|undefined>(
	'post_mod_a1',
	()=>undefined)
export type post_mod_T = {
	meta_:(ctx:request_ctx_T)=>dehydrated_post_meta_T
	default:(ctx:request_ctx_T)=>tag_dom_T
}
