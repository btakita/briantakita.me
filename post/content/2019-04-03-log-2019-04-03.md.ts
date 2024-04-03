import {
	eric_yang__tb_a_,
	flux_social__tb_a_,
	holochain__tb_a_,
	holochain_currency_paper__tb_a_,
	holochain_green_paper__tb_a_,
	holochain_whitepaper__tb_a_,
	sapper__tb_a_,
	sveltejs__tb_a_
} from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import type { request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2019-04-03T12:00:00Z',
	title: 'Log 2019-04-03',
	slug: 'log-2019-04-03',
	tag_a1: [
		'log',
		'name convention',
		'tag vector',
		'holochain',
	],
	description: `2019-04-03: Naming Conventions, Sveltejs, Holochain`,
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
## Naming Conventions

I've been experimenting & making progress with ${tb_a_({ href: '/posts/naming-conventions' }, 'Naming Conventions')}. Naming conventions for immutable entities has proven to reduce incidental complexity. I'm working on fleshing out the last details & a whitepaper. Please stay tuned. This practice has helped me remove incidental complexity from my codebases.

## ${sveltejs__tb_a_()}

I'm a fan of Sveltejs & ${sapper__tb_a_()}. Svelte provides truly reactive stores & html components. Html components mean it's easy for programmers & non-programmers (e.g. designers) to work with. Svelte is compiled, resulting in a payload that is small, fast, & memory efficient.

## ${holochain__tb_a_()}

Lately, I have been turned onto Holochain. Thanks to ${eric_yang__tb_a_()} founder of ${flux_social__tb_a_('Junto (now Flux Social)')} for introducing me to this technology.

I've read through:

* ${holochain_whitepaper__tb_a_()}
* ${holochain_currency_paper__tb_a_()}
* ${holochain_green_paper__tb_a_()}

I encourage you to read these papers, as they explain the state of distributed networks & the innovations that Holochain & the Holo currency bring.
`.trim())
// @formatter:on
