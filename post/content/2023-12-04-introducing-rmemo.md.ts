import {
	ctx_core_nanostores__tb_a_,
	ctx_core_solid_nanostores__tb_a_,
	nanostores__tb_a_,
	relementjs__tb_a_,
	rmemo__tb_a_,
	WeakRef__tb_a_
} from '@btakita/ui--server--briantakita/anchor'
import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { md__raw_ } from '@rappstack/ui--any/md'
import { lines_, nl } from '@rappstack/ui--any/string'
import { footnote__sup_ } from '@rappstack/ui--server--blog/footnote'
import { type request_ctx_T } from 'rebuildjs/server'
import { code_ } from 'relementjs/html'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2023-12-04T03:12:00Z',
	title: `Introducing rmemo`,
	slug: '2023-12-04-introducing-rmemo',
	tag_a1: [
		'rmemo',
		'reactive',
		'state-management',
		'open-source',
	],
	description: `Introducing the rmemo reactive state management library.`,
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>''
+ md__raw_({ ctx }, lines_(
	`I'm pleased to announce ${rmemo__tb_a_()}, a tiny no-fluff reactive state library. rmemo is the reactive core of ${relementjs__tb_a_()}, a server & browser UI rendering library that I also released.`,
))
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	[`# What is rmemo?`, [
		`rmemo is a tiny no-fluff state management library. It offers reactive memos & reactive signals for the server & browser. This includes:`,
		nl,
		`- reactive memos`,
		`- reactive signals`,
		`- autosubscriptions`,
		`- async support`,
		`- a terse & focused api`,
		`- performance`,
		`- integration with garbage collector`,
		nl,
		`| imports                                                    | size  |`,
		`|------------------------------------------------------------|:-----:|`,
		`| memo_                                                      | 338 B |`,
		`| memo_ + sig_                                               | 354 B |`,
		`| memo_ + sig_ + be_ + ctx_                                  | 506 B |`,
		`| memo_ + sig_ + be_ + ctx_ + be_memo_pair_ + be_sig_triple_ | 602 B |`,]],
	[`# It looks something like:`, [
		'```ts',
		`// users.ts`,
		`import { sig_ } from 'rmemo'`,
		`export const user_a$ = sig_<User[]>([], user_a$=>`,
		`	fetch('https://an.api/users')`,
		`		.then(res=>res.json())`,
		`		.then(user_a=>user_a$.set(user_a)))`,
		`export function user__add(user:User) {`,
		`	user_a$([...user_a$(), user])`,
		`}`,
		`export interface User {`,
		`	id:number`,
		`	name:string`,
		`}`,
		'```',]],
	[`# Garbage Collection Integration`, [
		`rmemo tracks listeners using ${WeakRef__tb_a_()}. Most other reactive state management libraries track listener references. This means the listener must unregister itself once the listener is complete. Let's examine the trade-offs:`,]],
	[`# Motivation`, [
		`Until recently I was using ${nanostores__tb_a_()} for my goto state management solution. I contributed to fixing	diamond dependency issues. I also wrote some extension libraries${ctx_core_nanostores__footnote_sup_(ctx)}. Nanostores is small, usable on the server & browser, & works with any UI rendering library. All seemed well	& I used Nanostores for some large projects. The api is cumbersome in a few ways:`,
		()=>[
			[`## \`computed\` requires it's parents to be listed as arguments.`, [
				'```ts',
				`import { atom, computed } from 'nanostores'`,
				`const user_cache = {`,
				`  1: { id: 1, name: \`Joe Blo\` }`,
				`}`,
				`const id$ = atom(1)`,
				`const user$ = computed(id$, id=>user_cache[id])`,
				'```',
			]],
			[`## async operations must use a writable \`atom\` & \`subscribe\`${nanostores_async_task__footnote_sup_(ctx)}`, [
				'```ts',
				`import { atom } from 'nanostores'`,
				`const id$ = atom(1)`,
				`const user$ = atom()`,
				`id$.subscribe(async id=>{`,
				`  const user = id ? await user__get(id) : null`,
				`  user$.set(user)`,
				`})`,
				`function user__get(id:number) {`,
				`  return fetch('https://my.api/users/' + id)`,
				`    .then(res=>res.json())`,
				`}`,
				'```',]],
			[`## Should be smaller`, [
				`| atom  | atom + computed | atom + computed + contexts (next release) |`,
        `|:-----:|:---------------:|:-----------------------------------------:|`,
        `| 298 B | 1013 B          | > 1200 B                                  |`,
				nl,
				'The bundle size of nanostores is tiny when only using `atom` but grows over 1 kb when including `computed`.',]],],]],
])
// @formatter:on
export function ctx_core_nanostores__footnote_sup_(ctx:request_ctx_T) {
	return footnote__sup_({
		ctx,
		id: 'ctx_core_nanostore'
	}, [
		`${ctx_core_nanostores__tb_a_()} & ${ctx_core_solid_nanostores__tb_a_()}`,])
}
export function nanostores_async_task__footnote_sup_(ctx:request_ctx_T) {
	return footnote__sup_({
		ctx,
		id: 'nanostores_async_task'
	}, [
		`The next major version will integrate \`task\` with \`computed\`.`,
	])
}
