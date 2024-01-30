import { md_c_ } from '@btakita/ui--any--blog/md'
import { tb_a_ } from '@btakita/ui--server--blog/anchor'
import {
	atb_eric_yang_,
	atb_flux_social_,
	atb_holochain_,
	atb_holochain_currency_paper_,
	atb_holochain_green_paper_,
	atb_holochain_whitepaper_,
	atb_sapper_,
	atb_sveltejs_
} from '@btakita/ui--server--briantakita/anchor'
export const meta = {
	author: `Brian Takita`,
	pubDate: '2019-04-03T12:00:00Z',
	title: 'Log 2019-04-03',
	slug: 'log-2019-04-03',
	tags: [
		'log',
		'name convention',
		'tag vector',
		'holochain',
	],
	description: `2019-04-03: Naming Conventions, Sveltejs, Holochain`,
}
// @formatter:off
// language=md
export default ()=>md_c_(`
# Naming Conventions

I've been experimenting & making progress with ${tb_a_({ href: '/posts/naming-conventions' }, 'Naming Conventions')}. Naming conventions for immutable entities has proven to reduce incidental complexity. I'm working on fleshing out the last details & a whitepaper. Please stay tuned. This practice has helped me remove incidental complexity from my codebases.

# ${atb_sveltejs_()}

I'm a fan of Sveltejs & ${atb_sapper_()}. Svelte provides truly reactive stores & html components. Html components mean it's easy for programmers & non-programmers (e.g. designers) to work with. Svelte is compiled, resulting in a payload that is small, fast, & memory efficient.

# ${atb_holochain_()}

Lately, I have been turned onto Holochain. Thanks to ${atb_eric_yang_()} founder of ${atb_flux_social_('Junto (now Flux Social)')} for introducing me to this technology.

I've read through:

* ${atb_holochain_whitepaper_()}
* ${atb_holochain_currency_paper_}
* ${atb_holochain_green_paper_}

I encourage you to read these papers, as they explain the state of distributed networks & the innovations that Holochain & the Holo currency bring.
`.trim())
// @formatter:on
