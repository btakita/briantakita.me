import { post_meta__validate } from '@rappstack/domain--any--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import type { request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2019-04-15T12:00:00Z',
	title: 'Log 2019-04-15',
	slug: 'log-2019-04-15',
	tag_a1: [
		'log',
		'tag vector',
	],
	description: `2019-04-15: Multi Underscore Tag Naming Convention`,
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
## Multi Underscore Tag Naming Convention

I wrote ${tb_a_({ href: '/posts/multi-underscore-tag-naming-convention-analysis' }, 'Multi Underscore Tag Naming Convention Analysis')} which describes the Ontology & structure of the naming convention.

TODO: I will latter post how & why the "Multi Underscore Tag Naming Convention" (${tb_a_({ href: '/posts/tag-vector-0-introduction'}, `Tag Vector: Part 0: Introduction`)}) can assist in creating simpler software that scales with complexity. Also, I will explain how this naming convention makes it easy to find abstractions in a codebase with confidence, across any number of software & data	layers.

I also have a previous post with a quick introduction to the ${tb_a_({ href: '/posts/naming-conventions' }, `Multi Underscore Tag Naming Convention`)}.
`.trim())
// @formatter:on
