import { meteorjs__tb_a_ } from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { md__raw_ } from '@rappstack/ui--any/md'
import { type request_ctx_T } from 'rebuildjs/server'
import { details_, p_, summary_ } from 'relementjs/html'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2016-02-25T11:00:00.000Z',
	title: `Monorepo Musings with ctx-core`,
	slug: 'monorepo-musings-with-ctx-core',
	tag_a1: [
		'ctx-core',
		'monorepo',
	],
	description: `Monorepos Create a Holistic Way to Develop Domains & Platforms`
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_(ctx, `
It's been about 2 years since my previous post here. I've been busy working on a few client projects. As a consultant, I'm naturally inclined to accumulate a toolkit of tech (technology & techniques). In the domain of technology, where all levels of the solution stack are subject to change, keeping a toolkit while moving from project to project is a challenge.

${details_([
		summary_('Why I choose Javascript'),
		p_([
			`I'm developing full-stack applications using node.js & es6/es2017. An advantage of web applications written in javascript is the potential to share logic on all levels of the stack. Frameworks such as `, meteorjs__tb_a_(), ` provide full-stack solutions; with the price being lock-in to the design idioms that the framework authors have chosen to support their toolsets.`
		])
	])}

## Independence/Autonomy

As desirable features emerge in other libraries, the Framework would need to integrate the new feature. If a library is no longer desirable, it may be difficult to decouple from that library. A Framework has inertia. Once a Framework gains a community, it has an obligation to keep a feature set out while maintaining a simple interface. This often has a cost of complexity & loss of freedom to provide additional functionality.

As any software project (Frameworks included) is used & as new tech emerges, the idioms of the project often change.
`.trim())
// @formatter:on
