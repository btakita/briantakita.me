import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { nofollow_tb_a_, tb_a_ } from '@rappstack/ui--any/anchor'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { nl } from '@rappstack/ui--any/string'
import { type request_ctx_T } from 'rebuildjs/server'
import { code_, sub_ } from 'relementjs/html'
const slug = 'signals-proposal-compared-to-rmemo-weak-ref'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2024-06-01T18:49:51.217Z',
	title: 'Signals Proposal Compared to rmemo/WeakRef',
	slug,
	tag_a1: [
		'performance',
		'reactive',
		'signals',
		'state-management',
	],
	description: `WeakRef can simplify reactivity within the Signals Proposal. WeakRef is criticized for having extra memory allocations & being slow. It turns out that the slowness is due to a bug in V8. JSCore's implementation of WeakRef is reasonable.`,
	featured: true,
	draft: true,
})
export default (ctx:request_ctx_T)=>{
	// @formatter:off
	// language=md
	return ''
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	[`## The Signals Proposal`, [
		`The ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals' }, 'Signals Proposal')} forms a foundational API for reactive signal libraries in Javascript. The emphasis is on interoperability between libraries that build on the Signals Proposal. The Signal Proposall does not emphasize the VanillaJS use case. There's ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals?tab=readme-ov-file#example---a-signals-counter' }, 'an example in VanillaJS')}.`,
		()=>[
			[`### Relevant Architecture`, [
				`Focusing on the architecture relevant to this article. Framing the definitions to relate to this article.`,
				()=>[
					[`#### ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals?tab=readme-ov-file#signal-algorithms' }, 'Signal')}`, [
						`A Signal is an Object that forms a dependency graph with other Signals. It is made of:`,
						()=>[
							[`##### ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals?tab=readme-ov-file#the-signalstate-class' }, 'Signal.State')}`, [
								`A Signal.State stores reactive data in an internal slot.`,]],
							[`##### ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals?tab=readme-ov-file#the-signalcomputed-class' }, 'Signal.Computed')}`, [
								`A Signal.Computed stores the return value of a lazy function in the internal slot. The Signal.Computed can reference dependency signals (Signal.State or Signal.Computed) in the lazy function.`,
								()=>[
									[`###### Signal Directed Acyclic Graph (DAG)`, [
										`Signal.Computed referencing other dependency Signals forms a dependency Directed Acyclic Graph.`,]],],]],],]],
					[`#### ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals?tab=readme-ov-file#the-signalsubtlewatcher-class' }, 'Watcher')}`, [
						`The Watcher makes the Signals reactive. Let's say \`Signal.Computed\` ${code_('sig', sub_('child'))} depends on another Signal ${code_('sig', sub_('parent'))}.`,
						()=>[
							[`##### Without the Watcher`, [
								`Without the Watcher, the Signal's \`.get()\` method invokes the Signal Graph. Any subsequent changes to the signals in the DAG do not notify any dependents. The only way to see the changes to the slot values in a DAG is to call \`.get()\` again.`,
								()=>[
									[`###### Lazy`, [
										`\`Signal.Computed\` \`.get()\` will store the return value in its slot.`,]],
									[`###### Not Reactive`, [
										`\`Signal.Computed\` \`.get()\` must be called **every** time to see dependency updates.`]],],]],
							[`##### With the Watcher`, [
								`When a Signal is watched by the Watcher, the Signal becomes lazily reactive. When ${code_('sig', sub_('child'))} is watched, any change to ${code_('sig', sub_('parent'))} will notify ${code_('sig', sub_('child'))} to rerun its lazy function & store the return value in its slot.`,
								()=>[
									[`###### Lazy`, [
										`\`Signal.Computed\` \`.get()\` will store the return value in its slot.`,]],
									[`###### Reactive`, [
										`\`Signal.Computed\` \`.get()\` must be called **one** time to see dependency updates. When a dependency Signal updates, the Watcher notifies the \`Signal.Computed\`.`,]],],]],],]],
					[`#### Effect`, [
						`An Effect is defined by the Signal Proposal. An Effect is not implemented within the Signals Proposal. Effects are ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals?tab=readme-ov-file#implementing-effects' }, 'implemented by the library')} using the Signals Proposal. Effects use Watcher to watch the Signals & manage the Signal Lifetime.`,]],
					[`### Memory Management & Lifetime`, [
						`From the Signal Proposal's ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals?tab=readme-ov-file#memory-management' }, 'Memory Management:')} section. Annotations inline:`,
						nl,
						`> - If possible: A computed Signal should be garbage-collectable if nothing live is referencing it for possible future reads, even if it's linked into a broader graph which stays alive (e.g., by reading a state which remains live).`,
						`>   - Note that most frameworks today require explicit disposal of computed Signals if they have any reference to or from another Signal graph which remains alive.`,
						`>   - This ends up not being so bad when their lifetime is tied to the lifetime of a UI component, and effects need to be disposed of anyway.`,
						`>   - If it is too expensive to execute with these semantics, then we should add explicit disposal (or "unlinking") of computed Signals to the API below, which currently lacks it.`,
						nl,
						()=>[
							[`#### Live`, [
								`A Signal is "live" when it is watched by a Watcher.`,
								`- The "live" Signal is in the scope of the Watcher.`,
								`- When a "live" Signal is unwatched, it is removed from the scope of the Watcher.`,
								`- When the Watcher is in memory scope, the Watcher & all "live" Signals are not eligible for Garbage Collection.`,
								`- When the Watcher & the "live" Signal graph goes out of memory scope, they are eligible for Garbage Collection.`,
								nl,
								'```ts',
								`// True if this signal is "live", in that it is watched by a Watcher,`,
								`// or it is read by a Computed signal which is (recursively) live.`,
								`function hasSinks(s: State | Computed): boolean;`,
								'```',
								nl,
								`A computed Signal should be garbage-collectable if nothing watched is referencing it for possible future reads.`,]],],
						nl,
						`> - A separate related goal: Minimize the number of allocations, e.g., `,
						`>   - to make a writable Signal (avoid two separate closures + array)`,
						`>   - to implement effects (avoid a closure for every single reaction)`,
						`>   - In the API for observing Signal changes, avoid creating additional temporary data structures`,
						`>   - Solution: Class-based API enabling reuse of methods and fields defined in subclasses`,
						nl,
						`Unnecessary allocations should be avoided. Benchmarks & memory profiling help detect the impact of these allocations.`,]],],]],],]],
	[`## ${tb_a_({ href: 'https://github.com/ctx-core/rmemo' }, 'rmemo')}`, [
		`The rmemo library is named as a contraction of "reactive memo". A memo function that is reactive. A reactive memo has similarities to a Signal where both:`,
		`- hold state in a "slot"`,
		`- lazily load state`,
		`- lazily start reactivity when called`,
		()=>[
			[`### Motivations to Develop rmemo`],
			[`### Why does rmemo use WeakRef?`, [
				()=>[
					[`#### Signal Lifetime`],
					[`#### Garbage Collection`],],]],],]],
	[`## Signals Proposal does not support WeakRef`, [
		()=>[
			[`### Discussions for the Signals Proposal supporting WeakRef`],],]],
	[`## Benchmarking the Signals Proposal vs rmemo/WeakRef`],
	[`## VanillaJS Use Cases`, [
		()=>[
			[`A Plea for Simplicity`],],]],
	[`## WeakRef Performance`, [
		()=>[
			[`### WeakRef on V8`, [
				()=>[
					[`#### NodeJS Benchmark`],
					[`#### Deno Benchmark`],],]],
			[`### WeakRef on JavascriptCore`, [
				()=>[
					[`#### BunJS Benchmark`],],]],
			[`### Chromium Bug Report`],],]],
])
}
// @formatter:on
