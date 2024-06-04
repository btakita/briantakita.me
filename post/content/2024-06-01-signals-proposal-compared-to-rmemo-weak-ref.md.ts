// noinspection MarkdownUnresolvedHeaderReference
import {
	briantakita_me_dev__tb_a_,
	brookebrodack_dev__tb_a_,
	ctx_core_be__tb_a_,
	elysiajs__tb_a_,
	expressjs__tb_a_,
	motion_one__tb_a_,
	rappstack__tb_a_,
	rappstack_repositories__tb_a_,
	rebuildjs__tb_a_,
	rebuildjs_tailwind__tb_a_,
	relementjs__tb_a_,
	relysjs__tb_a_,
	rmemo__tb_a_,
	tailwindcss__tb_a_,
	vanjs__tb_a_,
} from '@btakita/ui--server--briantakita/anchor'
import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { nofollow_tb_a_, tb_a_ } from '@rappstack/ui--any/anchor'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { lines_, nl } from '@rappstack/ui--any/string'
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
	description: `WeakRef can simplify reactivity within the Signals Proposal. WeakRef is criticized for having extra memory allocations & being slow. It turns out that the slowness is due to a bug in V8. JSCore's implementation of WeakRef is reasonable. This post shows the benchmarks with the results. Along with how rmemo's WeakRef implementation is the simplest benchmark. This post then highlights use cases where WeakRef is necessary for the simplest & most flexible reactive apis.`,
	description_md: lines_(
		`WeakRef can simplify reactivity within the Signals Proposal. WeakRef is criticized for having extra memory allocations & being slow. It turns out that the slowness is due to a bug in V8. JSCore's implementation of WeakRef is reasonable.`,
		nl,
		`This post shows the benchmarks with the results. Along with how rmemo's WeakRef implementation is the simplest benchmark. This post then highlights use cases where WeakRef is necessary for the simplest & most flexible reactive apis.`
	),
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
						()=>[
							[`#### Live Signals`, [
								`> - If possible: A computed Signal should be garbage-collectable if nothing live is referencing it for possible future reads, even if it's linked into a broader graph which stays alive (e.g., by reading a state which remains live).`,
								`>   - Note that most frameworks today require explicit disposal of computed Signals if they have any reference to or from another Signal graph which remains alive.`,
								`>   - This ends up not being so bad when their lifetime is tied to the lifetime of a UI component, and effects need to be disposed of anyway.`,
								`>   - If it is too expensive to execute with these semantics, then we should add explicit disposal (or "unlinking") of computed Signals to the API below, which currently lacks it.`,
								nl,
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
								`A computed Signal should be garbage-collectable if nothing watched is referencing it for possible future reads.`,]],
							[`#### Memory Allocations`, [
								`> - A separate related goal: Minimize the number of allocations, e.g., `,
								`>   - to make a writable Signal (avoid two separate closures + array)`,
								`>   - to implement effects (avoid a closure for every single reaction)`,
								`>   - In the API for observing Signal changes, avoid creating additional temporary data structures`,
								`>   - Solution: Class-based API enabling reuse of methods and fields defined in subclasses`,
								nl,
								`Unnecessary allocations should be avoided. Benchmarks & memory profiling help detect the impact of these allocations.`,]],],]],],]],],]],
	[`## ${rmemo__tb_a_()}`, [
		`The rmemo library is named as a contraction of "reactive memo". A memo function that is reactive.`,
		`rmemo is small. Currently weighing in at 381 Bytes min + brotli. Which makes rmemo among the smallest reactive state management libraries.`,
		nl,
		`rmemo was forked from ${vanjs__tb_a_()}. VanJS only supports reactivity using its DOM component tree. The first commit occurred 2023-11-17. Since then, rmemo along with libraries & applications that depend on rmemo have been developed.`,
		nl,
		()=>[
			[`### Motivations to Develop rmemo`, [
				`Here are some motivations that I had when making rmemo.`,
				()=>[
					[`#### General Purpose`, [
						`rmemo is a general purpose library. Usages include:`,
						`- reactive browser dom state`,
						`- small hydration libraries`,
						`- browser or server side async reactive state`,
						`- devops async task scheduling`,
						`- build async task scheduling`,
						`- animation scheduling`,]],
					[`#### Small & Focused`, [
						`A library that is small to have a minimal impact to browser javascript package sizes.`]],
					[`#### Simple API`, [
						()=>[
							[`##### Function instead of Object with \`.get()\``, [
								`I find working with functions a bit more flexible than an object with \`.get()\`. Calling the rmemo function requires less code than calling \`.get()\` on an object. I tried both apis when writing relementjs, which is a small dom rendering library. The function api used less code.`,]],
							[`##### Implicit Lifetime Management`, [
								`This means Garbage Collection without having to manage lifetimes.`,
								()=>[
									[`###### Libraries Supporting Implicit Lifetimes`, [
										`Reactive Signal libraries that use UI component trees can use the lifecycle of the components to watch & unwatch the Signals. Since these libraries require a component tree, they are not general purpose. These libraries include:`,
										`- solidjs`,
										`- sveltejs`,
										`- vanjs`,
										nl,
										`rmemo uses WeakRef to support implicit lifetimes while being general purpose. Meaning rmemo does not require a component tree to operate.`,]],],]],],]],],]],
			[`### Why does rmemo use WeakRef?`, [
				()=>[
					[`#### Signal Lifetime`, [
						`WeakRef allows parent rmemos to notify but not hold a strong reference to child rmemos.`,]],
					[`#### Garbage Collection`, [
						`The javascript garbage collector collects live rmemos that fall out of memory scope.`,]],],]],],]],
			[`### Similarities to the Signals Proposal`, [
				`A reactive memo has similarities to a Signal where both:`,
				`- hold state in a "slot"`,
				`- lazily load state`,
				`- lazily start reactivity when called & watched`,]],
			[`### Differences from the Signals Proposal`, [
				()=>[
					[`#### rmemo's Functions are Reactive When Called`, [
						`When a rmemo function calls a dependency rmemo function, the reactive relationship immediately starts. There is no Watcher object. rmemo functions are immediately "watched".`,]],
					[`#### rmemo Uses WeakRef to Support Garbage Collection`, [
						`When a "live" rmemo goes out of scope, it will be Garbage Collected. In the Signals Proposal, a "live" Signal watched by a Watcher in memory scope will not be Garbage Collected.`,]],],]],
	[`## Signals Proposal does not support WeakRef`, [
		`I filed [a ticket](https://github.com/tc39/proposal-signals/issues/156) to add WeakRef support. I hope to explain why rmemo needs WeakRef support in order to build off of the Signals Proposal. rmemo could interop with the Signals Proposal as is, but that would require extra logic. There are only downsides to rmemo building off of the Signals Proposal.`,
		()=>[
			[`### Discussions for the Signals Proposal Supporting WeakRef`, [
				`So far, no delegates support this ticket. I was asked to show my use cases & a performance concern about WeakRef memory allocation.`,]],],]],
	[`## Benchmarking the Signals Proposal vs rmemo/WeakRef`, [
		`The ${tb_a_({ href: 'https://github.com/btakita/rmemo-vs-signal-polyfill-benchmark' }, 'benchmark source code')} compares:`,
		`- 1000 Signal chain: without watcher`,
		`- 1000 Signal chain: with watcher`,
		`- 1000 rmemo chain`,
		()=>[
			[`### The Benchmark Source Code`, [
				`I want to note how simple rmemo's benchmark is compared to the Signal Polyfill. From the full benchmark ${nofollow_tb_a_({ href: 'https://github.com/btakita/rmemo-vs-signal-polyfill-benchmark/blob/main/index.js' }, 'source code')}:`,
				()=>[
					[`#### 1000 Signal chain: without watcher`, [
						`Note that Signals are not reactive without the watcher.`,
						'```js',
						`let a1 = new Array(1000)`,
						`a1[0] = new Signal.State(1)`,
						`for (let i = 1; i < 1000; i++) {`,
						`  a1[i] = new Signal.Computed(()=>a1[i - 1].get() + 10)`,
						`}`,
						`a1[999].get()`,
						'```',]],
					[`#### 1000 Signal chain: with watcher`, [
						`These Signals are reactive with the watcher. Note the increase in complexity in adding the watcher.`,
						'```js',
						`let pending = false`,
						`let w = new Signal.subtle.Watcher(()=>{`,
						`  if (!pending) {`,
						`    pending = true`,
						`    queueMicrotask(()=>{`,
						`      pending = false`,
						`      for (let s of w.getPending()) s.get()`,
						`      w.watch()`,
						`    })`,
						`  }`,
						`})`,
						`let a1 = new Array(1000)`,
						`a1[0] = new Signal.State(1)`,
						`for (let i = 1; i < 1000; i++) {`,
						`  a1[i] = new Signal.Computed(()=>a1[i - 1].get() + 10)`,
						`}`,
						`w.watch(a1[999])`,
						`a1[999].get()`,
						'```',]],
					[`#### 1000 rmemo chain`, [
						`Note that the rmemo example is simpler than even the [1000 Signal chain: without watcher](#1000-signal-chain-without-watcher) example.`,
						'```js',
						`let a1 = new Array(1000)`,
						`a1[0] = sig_(1)`,
						`for (let i = 1; i < 1000; i++) {`,
						`  a1[i] = memo_(()=>a1[i - 1]() + 10)`,
						`}`,
						`a1[999]()`,
						'```',]],],]],
			[`### WeakRef Performance`, [
				`These benchmarks compare the Signal Polyfill vs. rmemo's performance. A single WeakRef is lazy instantiated whenever a rmemo is referenced by another rmemo. Each rmemo has one WeakRef. There are several props that are dynamically assigned to each rmemo. Each rmemo has a \`.set()\` function. A \`sig_()\` exposes the \`.set()\` function in its typescript type. A \`memo_()\` does not expose the \`.set()\` in its typescript type.`,
				()=>[
					[`#### WeakRef on JavascriptCore`, [
						()=>[
							[`##### BunJS Benchmark`, [
								`In the BunJS benchmark, rmemo benchmark is >20% faster than the reactive Signals benchmark. The reactive Signals benchmark only includes \`.watch()\` & does not include \`.unwatch()\`. \`.unwatch()\` has a ${nofollow_tb_a_({ href: 'https://githubcom/tc39/proposal-signals/issues/215' }, 'major performance issue')} at this moment.`,
								nl,
								`The rmemo benchmark is <5% slower than the non-reactive Signals benchmark. While WeakRef may have performance implications, it is not significant enough to throw the benchmarks.`,
								'```',
								`bun ./index.js`,
								`1000 Signal chain: without watcher x 4,968 ops/sec ±2.60% (80 runs sampled)`,
								`1000 Signal chain: with watcher x 3,941 ops/sec ±1.93% (85 runs sampled)`,
								`1000 rmemo chain x 4,829 ops/sec ±1.63% (89 runs sampled)`,
								`Fastest is 1000 Signal chain: without watcher, 1000 rmemo chain`,
								'```',]],],]],
					[`#### WeakRef on V8`, [
						`In the V8 benchmarks, WeakRef has major performance issues & runtime instability. So much so, I filed ${tb_a_({ href: 'https://issues.chromium.org/issues/333584632' }, 'an issue')} with Chromium.`,
						()=>[
							[`##### NodeJS Benchmark`, [
								`The rmemo benchmark is ~350% slower due to the V8 WeakRef performance bug. Also note the standard deviation spikes up to ±45.31%, suggesting runtime instability.`,
								'```',
								`node ./index.js`,
								`1000 Signal chain: without watcher x 3,317 ops/sec ±1.26% (92 runs sampled)`,
								`1000 Signal chain: with watcher x 2,414 ops/sec ±1.15% (93 runs sampled)`,
								`1000 rmemo chain x 542 ops/sec ±45.31% (46 runs sampled)`,
								`Fastest is 1000 Signal chain: without a watcher`,
								'```',]],
							[`##### Deno Benchmark`, [
								`Well, this is embarrassing. I hope this V8 WeakRef bug is fixed soon!`,
								'```',
								`deno run index.js`,
								`✅ Granted all read access.`,
								`1000 Signal chain: without watcher x 3,346 ops/sec ±2.37% (64 runs sampled)`,
								`1000 Signal chain: with watcher x 2,384 ops/sec ±1.81% (63 runs sampled)`,
								``,
								`<--- Last few GCs --->`,
								``,
								`[547229:0x5ef986310000]    21250 ms: Mark-Compact (reduce) 1399.0 (1426.6) -> 1398.7 (1425.4) MB, pooled: 0 MB, 183.17 / 0.00 ms  (+ 0.4 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 188 ms) (average mu = 0.545`,
								``,
								`<--- JS stacktrace --->`,
								``,
								``,
								``,
								`#`,
								`# Fatal JavaScript out of memory: Reached heap limit`,
								`#`,
								`==== C stack trace ===============================`,
								``,
								`    deno(+0x2b9b688) [0x5ef9551d6688]`,
								`    deno(+0x219503d) [0x5ef9547d003d]`,
								`    deno(+0x2191ffd) [0x5ef9547ccffd]`,
								`    deno(+0x21cb227) [0x5ef954806227]`,
								`    deno(+0x22e6ddc) [0x5ef954921ddc]`,
								`    deno(+0x22e4bcd) [0x5ef95491fbcd]`,
								`    deno(+0x22d86ac) [0x5ef9549136ac]`,
								`    deno(+0x22d8fc8) [0x5ef954913fc8]`,
								`    deno(+0x22bc0e2) [0x5ef9548f70e2]`,
								`    deno(+0x2d25cf1) [0x5ef955360cf1]`,
								`    deno(+0x2a5e036) [0x5ef955099036]`,
								`[1]    547229 trace trap (core dumped)  deno run index.js`,
								'```',]],],]],
					[`#### Chromium Bug Report`, [
						`If you have a chance, please upvote the ${tb_a_({ href: 'https://issues.chromium.org/issues/333584632' }, 'Chromium WeakRef Performance Issue')}. If you know someone on the Chromium team, please let them know about this issue. WeakRef has the potential to simplify apis. And it performs well on JavascriptCore.`,]],],]]],]],
	[`## VanillaJS Use Cases`, [
		`The Watcher api is in the subtle namespace. Targeting library authors. There are good reasons to make an accessible api for VanillaJS authors. Some use cases include:`,
		()=>[
			[`### Simple Hydration`, [
				`With the recent resurgence of Multi-Page Apps (MPAs) & non-javascript server-side languages. It would be beneficial to provide the option to use reactive state. Without having to use a library.`,]],],]],
	[`## rmemo Use Cases`, [
		`rmemo provides simple reactive memo functions. Here are some examples of where its used:`,
		()=>[
			[`#### ${relementjs__tb_a_()}`, [
				`relementjs was originally forked from VanJS alongside rmemo. rmemo is for reactive state. relementjs is for reactive isomorphic UI components. Unlike VanJS, rmemo & relementjs is reactive on both the browser & server side. This enables isomorphic UI components to work as-is on both the browser & server.`,
				nl,
				`relementjs is tree-shakable & is smaller than VanJS for equivalent functionality. The smaller bundle size is possible using WeakRef.`,
				nl,
				`relementjs enables components using:`,
				`- html`,
				`- svg`,
				`- mathml`,
				`- xml`,
				`  - also supports namespaced xml tags`,]],
			[`#### Hydration as Hypemedia with hyop`, [
				`The name hyop is a contraction of **HY**permedia **OP**eration. Hyop weighs in at 61 Bytes min + brotli. Hyop binds functions to html tags. With a minimal amount of logic. These functions can bind DOM elements to reactive memos.`,
				()=>[
					[`##### YouTube Video Player & Animations`, [
						`rmemo + hyop binds the video player control logic + animations on ${tb_a_({ href: 'https://brookebrodack.net/content' }, 'https://brookebrodack.net/content')}. The application logic is 4.16 kb gzip + brotli. The ${tb_a_({ href: 'https://github.com/btakita/ui--browser--brookebrodack/blob/main/content/hyop/content__hyop.ts' }, 'source code')} is available.`,]],
					[`##### Flexible & Lightweight Web Animation Timelines`, [
						`Reactive programming can manage Web Animation Timelines. I began developing the ${tb_a_({ href: 'https://brookebrodack.net/brookers' }, 'Brookers Timeline')} using ${motion_one__tb_a_()}, due to its small size at 3.8 kb min + gzip. Adding 1 kb min + gzip for spring easing. However, I found Motion One's timeline difficult to work with. As I was not able to use any form of callback when the event ended to chain events together.`,
						nl,
						`So I replaced Motion One with rmemo. Creating a new library, ${tb_a_({ href: 'https://github.com/ctx-core/web_animation' }, 'ctx-core/web_animation')}. This library includes various helper functions to manage the Web Animations.`,
						nl,
						`These helper library functions replacing Motion One end up being 1214 Bytes. Significantly smaller than Motion One. And these functions offer a larger breadth of reactive options. The imported functions include:`,
						`- be_`,
						`- be_memo_pair_`,
						`- be_sig_triple_`,
						`- calling`,
						`- memo_`,
						`- nullish__none_`,
						`- ref__bind`,
						`- rmemo__wait`,
						`- tup`,
						nl,
						`Now, the Brookers Timeline is 4.38 kb min + brotli in total. Saving around 3.6 kb. Here is the ${nofollow_tb_a_({ href: 'https://github.com/btakita/ui--browser--brookebrodack/blob/main/brookers/hyop/brookers__hyop.ts' }, 'source code')}`,]],],]],
			[`#### Reactive Builds & Servers`, [
				`Reactivity is great for managing asynchronous state graphs. A development build, development server, & production servers all have asynchronous state graphs. With this in mind, I created 3 libraries for my development stack.`,
				()=>[
					[`##### ${rebuildjs__tb_a_()}`, [
						`rebuildjs is a base library by integrating the following with a web server:`,
						`- server side reactive state for the:`,
						`  - app`,
						`  - middleware`,
						`  - request`,
						`- esbuild`,
						`- dev server`,
						`- production server`,
						`- middleware-based route builds:`,
						`  - server`,
						`  - browser`,
						`- cacheable asset builds:`,
						`  - css`,
						`  - images`,
						`  - videos`,
						`  - other media`,
						nl,
						`It works with a web server such as ${elysiajs__tb_a_()} or ${expressjs__tb_a_()}. relysjs is a library that uses rebuildjs to add reactive state to ElysiaJS.`,
						nl,
						`rebuildjs uses ${ctx_core_be__tb_a_()} for context state. This context state modularizes composable state for the:`,
						`- app`,
						`- middleware`,
						`- request`,
						`- browser`,]],
					[`##### ${rebuildjs_tailwind__tb_a_()}`, [
						`@rebuildjs/tailwindcss adds ${tailwindcss__tb_a_()} support to rebuildjs.`,]],
					[`##### ${relysjs__tb_a_()}`, [
						`Integrates ElysiaJS with rebuildjs.`,]],
					[`##### ${rappstack__tb_a_()} (reactive app stack)`, [
						`Rappstack is made of composable domain & ui plugin libraries that target:`,
						`- any environment`,
						`- server environments`,
						`- browser environments`,
						`- all environments`,
						nl,
						`ctx-core/be & rmemo are used to modularize the application, middleware, & request state across the plugin libraries. The ${rappstack_repositories__tb_a_()} forms the base of applications. Applications contain their own domain & ui plugin libraries that work with the rappstack plugin libraries.`,
						nl,
						`Some websites that use rappstack include:`,
						`- ${briantakita_me_dev__tb_a_()}`,
						`- ${brookebrodack_dev__tb_a_()}`,
						`- other private repositories`,]],],]],],]],
	[`## Conclusion`, [
		`WeakRef simplifies reactivity & expands reactivity's use cases. The ${v8_weakref_performance_bug__tb_a_()} is a roadblock to wider adoption of using WeakRef. Javascript Core proves that WeakRef can have reasonable performance. rmemo uses WeakRef. The first commit for rmemo was in 2023-11-17. Since then, the following has been developed by me. All of which are powered by rmemo & WeakRef:`,
		`- relementjs`,
		`- hyop & Hydration as Hypermedia techniques`,
		`  - YouTube Video Player & Animations`,
		`  - Flexible & Lightweight Web Animation Timelines`,
		`- Reactive Builds & Servers`,
		`  - rebuildjs`,
		`  - @rebuildjs/tailwindcss`,
		`  - relysjs`,
		`- rappstack`,
		`  - 14 rappstack plugin libraries`,
		`- applications along with application-specific plugin libraries`,
		`  - @btakita/briantakita.me-dev`,
		`  - @btakita/brookebrodack-dev`,
		`  - several private apps`,]],
])
}
// @formatter:on
function v8_weakref_performance_bug__tb_a_(text?:string) {
  return tb_a_({ href: 'https://issues.chromium.org/issues/333584632' }, text ?? 'V8 WeakRef performance bug')
}
