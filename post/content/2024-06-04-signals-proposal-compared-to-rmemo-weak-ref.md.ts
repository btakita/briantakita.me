// noinspection MarkdownUnresolvedHeaderReference
import {
	briantakita_me_dev__tb_a_,
	brookebrodack_dev__tb_a_,
	ctx_core_be__tb_a_,
	elysiajs__tb_a_,
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
	pub_date: '2024-06-06T06:56:43.521Z',
	title: 'Signals Proposal Compared to rmemo/WeakRef',
	slug,
	tag_a1: [
		'performance',
		'reactive',
		'signals',
		'state-management',
	],
	description: `WeakRef can simplify systems built using the Signals Proposal. By removing the need to unwatch live Signals. WeakRef is criticized for having extra memory allocations & being slow. This post shows benchmarks. Including the Signals Proposal polyfill & rmemo, a reactive library that uses WeakRef. Comparing performance, memory usage, & implementation. V8 & Javascript Core have different Garbage Collection behavior for WeakRef. This caused me confusion with my initial benchmarks which were only synchronous. Along with demonstrating the implementations. This post then highlights use cases where WeakRef can be used for simple & flexible reactive apis.`,
	description_md: lines_(
		`WeakRef can simplify systems built using the Signals Proposal. By removing the need to unwatch live Signals. WeakRef is criticized for having extra memory allocations & being slow.`,
		nl,
		`This post shows benchmarks. Including the Signals Proposal polyfill & rmemo, a reactive library that uses WeakRef. Comparing:`,
		`- performance`,
		`- memory usage`,
		`- implementation`,
		nl,
		`V8 & Javascript Core have different Garbage Collection behavior for WeakRef. This caused me confusion with my initial benchmarks which were only synchronous. This post demonstrates the implementations. This post then highlights use cases where WeakRef can be used for simple & flexible reactive apis.`,
	),
	featured: true,
})
export default (ctx:request_ctx_T)=>{
	// @formatter:off
	// language=md
	return ''
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	[`## The Signals Proposal`, [
		`The ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals' }, 'Signals Proposal')} forms a foundational API for reactive signal libraries in Javascript. The emphasis is on interoperability between libraries that build on the Signals Proposal. The Signal Proposal does not emphasize the VanillaJS use case. However, there's ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals?tab=readme-ov-file#example---a-signals-counter' }, 'an example in VanillaJS')}.`,
		()=>[
			[`### Relevant Architecture`, [
				`Focusing on the architecture relevant to this article. Framing the definitions to relate to this article.`,
				()=>[
					[`#### ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals?tab=readme-ov-file#signal-algorithms' }, 'Signal')}`, [
						`A Signal is an Object that forms a directed acyclic graph (DAG) with other Signals. It is made of:`,
						()=>[
							[`##### ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals?tab=readme-ov-file#the-signalstate-class' }, 'Signal.State')}`, [
								`A Signal.State stores reactive data in an internal slot.`,]],
							[`##### ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals?tab=readme-ov-file#the-signalcomputed-class' }, 'Signal.Computed')}`, [
								`A Signal.Computed stores the return value of a lazy function in the internal slot. The Signal.Computed can reference dependency signals (Signal.State or Signal.Computed) in the lazy function.`,
								()=>[
									[`###### Signal Directed Acyclic Graph (DAG)`, [
										`Signal.Computed referencing other Signals forms a dependency Directed Acyclic Graph.`,]],],]],],]],
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
								`A Signal is **live** when it is watched by a Watcher.`,
								`- The **live** Signal is in the scope of the Watcher.`,
								`- When a **live** Signal is unwatched, it is removed from the scope of the Watcher.`,
								`- When the Watcher is in memory scope, the Watcher & all **live** Signals are not eligible for Garbage Collection.`,
								`- When the Watcher & the **live** Signal graph goes out of memory scope, they are eligible for Garbage Collection.`,
								nl,
								'```ts',
								`// True if this signal is **live**, in that it is watched by a Watcher,`,
								`// or it is read by a Computed signal which is (recursively) live.`,
								`function hasSinks(s: State | Computed): boolean;`,
								'```',
								nl,
								`A computed Signal is garbage-collectable if:`,
								`- the Signal is not watched`,
								`- no other Signal referencing the Signal is **live**`,]],
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
		`rmemo is small. Currently weighing in at 381 Bytes min + brotli. Which makes rmemo among the smallest reactive state management libraries. Possibly the smallest reactive state library that handles Diamond Dependencies in the correct order.`,
		nl,
		`Rmemo was forked from ${vanjs__tb_a_()}. VanJS only supports reactivity using its DOM component tree. VanJS does not support diamond dependencies.`,
		nl,
		`Rmemo's first commit occurred 2023-11-17. Since then, rmemo along with libraries & applications that depend on rmemo have been developed.`,
		nl,
		()=>[
			[`### Motivations to Develop rmemo`, [
				`Here are some motivations that I had when making rmemo.`,
				()=>[
					[`#### General Purpose`, [
						`Rmemo is a general purpose library. Usages include:`,
						`- reactive browser dom state`,
						`- small hydration libraries`,
						`- browser or server side async reactive state`,
						`- devops async task scheduling`,
						`- build async task scheduling`,
						`- animation scheduling`,]],
					[`#### Small & Focused`, [
						`A library that is small to have a minimal impact on browser javascript package sizes.`]],
					[`#### Simple API`, [
						()=>[
							[`##### Function instead of Object with \`.get()\``, [
								`Functions are a bit more flexible than an object with \`.get()\`. Calling the rmemo function requires less code than calling \`.get()\` on an object. I tried both apis when writing relementjs, which is a small dom rendering library. The function api used less code.`,]],
							[`##### Function Object has \`.set()\` method`, [
								`- \`memo_()\` returns a memo where the Typescript type does not have \`.set()\`.`,
								`- \`sig_()\` returns a memo where the Typescript type does have \`.set()\`.`,
								`- The javascript implementation for both \`memo_()\` & \`sig_()\` use \`.set()\` internally.`,]],
							[`##### Implicit Lifetime Management`, [
								`Garbage Collection occurs when the rmemo goes out of scope. Lifetime management occurs implicitly. There no need to explicitly manage lifetimes.`,
								()=>[
									[`###### Other Libraries Supporting Implicit Lifetimes`, [
										`Reactive Signal libraries that use UI component trees can use the lifecycle of the components to watch & unwatch the Signals. These libraries require a component tree with a cleanup event to manage lifetimes. They are not general purpose. These libraries include:`,
										`- solidjs`,
										`- sveltejs`,
										`- vanjs`,
										nl,
										`Rmemo uses WeakRef to support implicit lifetimes while being general purpose. Meaning rmemo does not require a component tree to operate.`,]],],]],
							[`##### Optional Explicit Lifetimes Management`, [
								`Rmemo allows explicit management of lifetimes. This occurs my overriding the reactive memo function's WeakRef's \`defer()\` method to return undefined. Rmemo provides a helper function \`rmemo__off(memo)\`.`,]],],]],],]],
			[`### How does Rmemo use WeakRef?`, [
				()=>[
					[`#### Signal Lifetime`, [
						`WeakRef allows the parent rmemo to notify but not hold a strong reference to the child rmemo.`,]],
					[`#### Garbage Collection`, [
						`The WeakRef allows the javascript garbage collector to collect the **live** rmemo that falls out of memory scope.`,]],],]],],]],
			[`### Similarities to the Signals Proposal`, [
				`A reactive memo has similarities to a Signal where both:`,
				`- hold state in a "slot"`,
				`- lazily load state`,
				`- lazily start reactivity when called & watched`,]],
			[`### Differences from the Signals Proposal`, [
				()=>[
					[`#### Rmemo's Functions are Reactive When Called`, [
						`When a rmemo function calls a dependency rmemo function, the reactive relationship immediately starts. There is no Watcher object. A rmemo function is **live** when it has a dependency rmemo & is called.`,]],
					[`#### Rmemo Uses WeakRef to Support Garbage Collection`, [
						`When a **live** rmemo goes out of memory scope, it will be eligable for Garbage Collection. In the Signals Proposal, a **live** Signal is watched by a Watcher. A **live** Signal will not be eligible for Garbage Collection if it or the Watcher remains in memory scope. This reference binding to the Watcher is broken when the Signal is no longer **live** by being **unwatched**.`,]],],]],
	[`## Signals Proposal does not support WeakRef`, [
		`I filed [a ticket](https://github.com/tc39/proposal-signals/issues/156) to add WeakRef support. I hope to explain why rmemo needs WeakRef support in order to build on the Signals Proposal. Rmemo could interop with the Signals Proposal as is, but that would:`,
		`- require extra logic`,
		`- require a larger bundle size`,
		`- would degrade in performance`,
		`- may use more heap memory`,
		()=>[
			[`### Discussions for the Signals Proposal Supporting WeakRef`, [
				`So far, no delegates support this ticket. I was asked to demonstrate my use cases & address performance/memory concerns about using WeakRef.`,]],],]],
	[`## ${tb_a_({ href: 'https://tc39.es/ecma262/#sec-weakref-processing-model' }, 'WeakRef Processing Model')}`, [
		`The WeakRef Processing Model is important to understand. Especially in regard to synchronous behavior. A couple of important notes:`,
		nl,
		`> When WeakRef.prototype.deref is called, the referent (if undefined is not returned) is kept alive so that subsequent, synchronous accesses also return the same value. This list is reset when synchronous work is done using the ${nofollow_tb_a_({ href: 'https://tc39.es/ecma262/#sec-clear-kept-objects' }, 'ClearKeptObjects')} abstract operation.`,
		nl,
		`> Neither of these actions (${nofollow_tb_a_({ href: 'https://tc39.es/ecma262/#sec-clear-kept-objects' }, 'ClearKeptObjects')} or ${nofollow_tb_a_({ href: 'https://tc39.es/ecma262/#sec-cleanup-finalization-registry' }, 'CleanupFinalizationRegistry')}) may interrupt synchronous ECMAScript execution. Because ${nofollow_tb_a_({ href: 'https://tc39.es/ecma262/#host' }, 'hosts')} may assemble longer, synchronous ECMAScript execution runs, this specification defers the scheduling of ${nofollow_tb_a_({ href: 'https://tc39.es/ecma262/#sec-clear-kept-objects' }, 'ClearKeptObjects')} and ${nofollow_tb_a_({ href: 'https://tc39.es/ecma262/#sec-cleanup-finalization-registry' }, 'CleanupFinalizationRegistry')} to the ${nofollow_tb_a_({ href: 'https://tc39.es/ecma262/#host-environment' }, 'host environment')}.`,
		nl,
		`This means a WeakRef will not know that the referent object is Garbage Collected in the same synchronous event loop run. As the host environment will need to call ClearKeptObjects in between event loop runs.`,
		nl,
		()=>[
			[`### WeakRef & Nursery Garbage Collected`, [
				`Some confusion with the Synchronous Benchmarks came with WeakRef & Nursery Garbage Collection. Consider the following loop:`,
				'```js',
				`while (true) {`,
				`  new WeakRef({})`,
				`}`,
				'```',
				nl,
				`The ${nofollow_tb_a_({ href: 'https://developer.apple.com/documentation/javascriptcore' }, 'Javascript Core')} runtime will run the loop in a steady state. Since its Garbage Collects both the WeakRef & the referent Object while in synchronous execution.`,
				nl,
				`However, both V8 & Spider Monkey will not run in a steady state. The memory will grow until there is an Out of Memory or Null Ptr error. This is due to V8 & Spider Monkey not Garbage Collecting the WeakRef while in synchronous execution. The Chromium team ${nofollow_tb_a_({ href: 'https://issues.chromium.org/issues/42202112#comment19' }, 'will fix this particular issue')}. I filed ${tb_a_({ href: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1900933' }, 'an issue')} with the Firefox team.`,]],],]],
	[`## Benchmarking the Signals Proposal vs rmemo/WeakRef`, [
		`The ${tb_a_({ href: 'https://github.com/btakita/rmemo-vs-signal-polyfill-benchmark' }, 'benchmark repo')} has several benchmarks. Consisting of:`,
		`- Synchronous Signal Chain Benchmark`,
		`  - 1000 Signal chain: without watcher`,
		`  - 1000 Signal chain: with watcher`,
		`  - 1000 rmemo chain`,
		`- Asynchronous Signal Chain Benchmark`,
		`  - 1000 Signal chain: without watcher`,
		`  - 1000 Signal chain: with watcher`,
		`  - 1000 rmemo chain`,
		`- Memory Benchmarks`,
		`  - 1000 x 1000 Signal Chain Memory allocation benchmark`,
		`  - 1000 x 1000 rmemo Chain Memory allocation benchmark`,
		nl,
		`None of the Signal benchmarks call \`.unwatch()\`, which has a ${nofollow_tb_a_({ href: 'https://github.com/tc39/proposal-signals/issues/215' }, 'performance issue')}.`,
		()=>[
			[`### Rmemo as a Proxy for WeakRef Performance`, [
				`These benchmarks compare the Signal Polyfill vs. rmemo's performance. A single WeakRef is lazy instantiated whenever a rmemo is referenced by another rmemo. A rmemo lazily instantiates one WeakRef when calling its first dependency rmemo.`,
				nl,
				`There are several props that are dynamically assigned to each rmemo. Each rmemo has a \`.set()\` method used internally. A \`sig_()\` exposes the \`.set()\` method in its typescript type. A \`memo_()\` does not expose \`.set()\` in its typescript type.`,
				nl,
				`There are several differences in implementation between Rmemo & the Signals Polyfill. However, comparing these two implementations should at least demonstrate whether or not WeakRef has a significant negative impact on performance & memory usage.`,]],
			[`### Synchronous Signal Chain Benchmark`, [
				`The Synchronous Signal Chain Benchmark was the first benchmark that I ran. The original version of this blog post only had this benchmark. There were issues with the V8 runtime being run synchronously. Not Garbage Collecting WeakRefs in the Nursery & out of memory scope.`,
				nl,
				`Here is the ${nofollow_tb_a_({ href: 'https://github.com/btakita/rmemo-vs-signal-polyfill-benchmark/blob/main/sync.js' }, 'synchronous benchmark source code')}.`,
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
						'```',]],
					[`#### Results`, [
						()=>[
							[`#### WeakRef on JavascriptCore`, [
								()=>[
									[`##### BunJS Synchronous Benchmark`, [
										`In the BunJS benchmark, rmemo benchmark is ~20% faster than the reactive Signals benchmark. The reactive Signals benchmark only includes \`.watch()\` & does not include \`.unwatch()\`.`,
										nl,
										`The rmemo benchmark is <5% slower than the non-reactive Signals benchmark. While WeakRef may have performance implications, it is not significant enough to throw the benchmarks.`,
										'```',
										`bun ./index.js`,
										`1000 Signal chain: without watcher x 4,968 ops/sec ±2.60% (80 runs sampled)`,
										`1000 Signal chain: with watcher x 3,941 ops/sec ±1.93% (85 runs sampled)`,
										`1000 rmemo chain x 4,829 ops/sec ±1.63% (89 runs sampled)`,
										`Fastest is 1000 Signal chain: without watcher, 1000 rmemo chain`,
										'```',]],],]],
							[`#### Synchronous WeakRef on V8`, [
								`In the V8 benchmarks, WeakRef has major performance issues & runtime instability. Due to the lack of Nursery Garbage Collection in synchronous code. There is ${nofollow_tb_a_({ href: 'https://issues.chromium.org/issues/42202112' }, 'an issue')}. I also filed ${nofollow_tb_a_({ href: 'https://issues.chromium.org/issues/333584632' }, 'an issue')}.`,
								()=>[
									[`##### NodeJS Synchronous Benchmark`, [
										`The rmemo benchmark is ~127% slower due to the V8 WeakRef performance bug. Also note the standard deviation spikes up to ±45.31%, suggesting runtime instability.`,
										'```',
										`node ./index.js`,
										`1000 Signal chain: without watcher x 3,317 ops/sec ±1.26% (92 runs sampled)`,
										`1000 Signal chain: with watcher x 2,414 ops/sec ±1.15% (93 runs sampled)`,
										`1000 rmemo chain x 542 ops/sec ±45.31% (46 runs sampled)`,
										`Fastest is 1000 Signal chain: without a watcher`,
										'```',]],
									[`##### Deno Synchronous Benchmark`, [
										`Well, this is embarrassing. I hope this V8 WeakRef bug is fixed soon! Nothing to see here...Moving on...`,
										'```',
										`deno run index.js`,
										`✅ Granted all read access.`,
										`1000 Signal chain: without watcher x 3,346 ops/sec ±2.37% (64 runs sampled)`,
										`1000 Signal chain: with watcher x 2,384 ops/sec ±1.81% (63 runs sampled)`,
										``,
										`<--- Last few GCs --->`,
										``,
										`[547229:0x5ef986310000]    21250 ms: Mark-Compact (reduce) 1399.0 (1426.6) -> 1398.7 (1425.4) MB, pooled: 0 MB, 183.17 / 0.00 ms  (+ 0.4 ms in 0 steps since the start of marking, biggest step 0.0 ms, walltime since the start of marking 188 ms) (average mu = 0.545`,
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
										'```',]],],]],],]],],]],
			[`### Asynchronous Signal Chain Benchmark`, [
				`Asynchronous code currently enables WeakRef to Garbage Collect for the major JS runtimes. Here is the ${nofollow_tb_a_({ href: 'https://github.com/btakita/rmemo-vs-signal-polyfill-benchmark/blob/main/async.js' }, 'async benchmark source code')}.`,
				()=>[
					[`#### Results`, [
						()=>[
							[`##### BunJS Asynchronous Benchmark`, [
								`In the [BunJS Synchronous Benchmark](#bunjs-synchronous-benchmark), rmemo was ~20% faster. In this benchmark, rmemo is ~10% slower.`,
								nl,
								'```',
								`bun ./async.js`,
								`1000 Signal chain: without watcher x 3,912 ops/sec ±3.68% (71 runs sampled)`,
								`1000 Signal chain: with watcher x 3,025 ops/sec ±3.61% (75 runs sampled)`,
								`1000 rmemo chain x 2,747 ops/sec ±4.73% (69 runs sampled)`,
								`Fastest is 1000 Signal chain: without watcher`,
								'```',]],
							[`##### NodeJS Asynchronous Benchmark`, [
								`In the [NodeJS Synchronous Benchmark](#nodejs-synchronous-benchmark), rmemo was \\~350% slower. In this benchmark, rmemo is \\~5% faster.`,
								nl,
								'```',
								`node async.js`,
								`1000 Signal chain: without watcher x 1,101 ops/sec ±8.32% (67 runs sampled)`,
								`1000 Signal chain: with watcher x 1,003 ops/sec ±3.43% (72 runs sampled)`,
								`1000 rmemo chain x 1,054 ops/sec ±4.92% (70 runs sampled)`,
								`Fastest is 1000 Signal chain: without watcher`,
								'```',]],
							[`##### Deno Asynchronous Benchmark`, [
								`In the [Deno Synchronous Benchmark](#deno-synchronous-benchmark), rmemo caused a core dump. In this benchmark, rmemo was \\~23% faster than the Signals Polyfill.`,
								nl,
								'```',
								`deno run async.js`,
								`✅ Granted all read access.`,
								`1000 Signal chain: without watcher x 1,005 ops/sec ±6.28% (38 runs sampled)`,
								`1000 Signal chain: with watcher x 825 ops/sec ±5.12% (40 runs sampled)`,
								`1000 rmemo chain x 1,043 ops/sec ±5.36% (44 runs sampled)`,
								`Fastest is 1000 rmemo chain,1000 Signal chain: without watcher`,
								'```',]],],]],],]],
			[`### Memory Allocation Benchmark`, [
				`This benchmark tests the memory allocation & time it takes to load & store 1000 x 1000 Signal Chains. Here are the source codes for:`,
				`- ${nofollow_tb_a_({ href: 'https://github.com/btakita/rmemo-vs-signal-polyfill-benchmark/blob/main/memory-signal.js' }, 'Signals Polyfill Memory Allocation Benchmark')}`,
				`- ${nofollow_tb_a_({ href: 'https://github.com/btakita/rmemo-vs-signal-polyfill-benchmark/blob/main/memory-rmemo.js' }, 'Rmemo Memory tallocation Benchmark')}`,
				nl,
				()=>[
					[`#### Results`, [
						`Rmemo consistently had a lower heapUsed than the Signals Polyfill. WeakRef does require some memory allocation. However, WeakRef does not allocate enough memory to change the observation that rmemo uses less memory than the Signals Polyfill.`,
						()=>[
							[`##### BunJS`, [
								`BunJS consistently had the best benchmarks out of the 3 runtimes. The Signals Polyfill performed significantly better (\\~36%) than rmemo. Rmemo used significantly less heap memory (\\~31%).`,
								()=>[
									[`##### bun memory-rmemo.js`, [
										'```shell',
										`time bun ./memory-rmemo.js`,
										`...`,
										`total: 1000000 {`,
										`  rss: 1022812160,`,
										`  heapTotal: 890159104,`,
										`  heapUsed: 310031248,`,
										`  external: 209487,`,
										`  arrayBuffers: 0,`,
										`}`,
										`bun ./memory-rmemo.js  1.07s user 0.21s system 286% cpu 0.446 total`,
										'```',]],
									[`##### bun memory-signal.js`, [
										'```shell',
										`time bun ./memory-signal.js`,
										`...`,
										`total: 1000000 {`,
										`  rss: 769392640,`,
										`  heapTotal: 620545024,`,
										`  heapUsed: 423323583,`,
										`  external: 16973580,`,
										`  arrayBuffers: 0,`,
										`}`,
										`bun ./memory-signal.js  0.74s user 0.11s system 222% cpu 0.382 total`,
										'```',]],],]],
							[`##### NodeJS`, [
								`Rmemo was ~21% faster & used ~16% less heap memory.`,
								()=>[
									[`###### node memory-rmemo.js`, [
										'```shell',
										`time node memory-rmemo.js`,
										`...`,
										`total: 1000000 {`,
										`  rss: 1152708608,`,
										`  heapTotal: 1103556608,`,
										`  heapUsed: 1060476424,`,
										`  external: 1619130,`,
										`  arrayBuffers: 10467`,
										`}`,
										`node ./memory-rmemo.js  2.59s user 0.53s system 224% cpu 1.387 total`,
										'```',]],
									[`###### node memory-signal.js`, [
										'```shell',
										`time node memory-signal.js`,
										`...`,
										`total: 1000000 {`,
										`  rss: 1333592064,`,
										`  heapTotal: 1281544192,`,
										`  heapUsed: 1239816688,`,
										`  external: 1619130,`,
										`  arrayBuffers: 10467`,
										`}`,
										`node ./memory-signal.js  3.21s user 0.59s system 238% cpu 1.598 total`,
										'```',]],],]],
							[`##### Deno`, [
								`Rmemo was ~7% faster & used ~12% less heap memory.`,
								()=>[
									[`###### deno memory-rmemo.js`, [
										'```shell',
										`time deno memory-rmemo.js`,
										`...`,
										`total: 1000000 [Object: null prototype] {`,
										`  rss: 1190764544,`,
										`  heapTotal: 1098571776,`,
										`  heapUsed: 1051931376,`,
										`  external: 2681434`,
										`}`,
										`deno run ./memory-rmemo.js  5.14s user 0.83s system 343% cpu 1.740 total`,
										'```',]],
									[`###### deno memory-signal.js`, [
										'```shell',
										`time deno memory-signal.js`,
										`...`,
										`total: 1000000 [Object: null prototype] {`,
										`  rss: 1375555584,`,
										`  heapTotal: 1292296192,`,
										`  heapUsed: 1240406376,`,
										`  external: 2681434`,
										`}`,
										`deno run ./memory-signal.js  5.50s user 0.93s system 331% cpu 1.937 total`,
										'```',]],],]],],]],],]],],]],
	[`## VanillaJS Use Cases`, [
		`The Watcher api is in the subtle namespace. Targeting library authors. There are good reasons to make an accessible api for VanillaJS authors. Some use cases include:`,
		()=>[
			[`### Simple Hydration`, [
				`With the recent resurgence of Multi-Page Apps (MPAs) & non-javascript server-side languages. It would be beneficial to provide the option to use reactive state. Without having to use a library.`,]],
			[`### Simplify & Compose Libraries with Reactive State`, [
				`See the [rmemo Use Cases](#rmemo-use-cases) section for examples on how a simpler reactive api powered by WeakRef increases simplicity, state modularity, & productivity.`,]],],]],
	[`## rmemo Use Cases`, [
		`Rmemo provides simple reactive memo functions. Here are some examples of where its used:`,
		()=>[
			[`#### ${relementjs__tb_a_()}`, [
				`relementjs was originally forked from VanJS alongside rmemo. Rmemo is for reactive state. relementjs is for reactive isomorphic UI components. Unlike VanJS, rmemo & relementjs is reactive on both the browser & server side. This enables isomorphic UI components to work as-is on both the browser & server.`,
				nl,
				`relementjs is tree-shakable & is smaller than VanJS for equivalent functionality. The smaller bundle size is possible using WeakRef.`,
				nl,
				`relementjs enables components using:`,
				`- html`,
				`- svg`,
				`- mathml`,
				`- xml`,
				`  - also supports namespaced xml tags`,]],
			[`#### Hydration as Hypermedia with hyop`, [
				`The name hyop is a contraction of **HY**permedia **OP**eration. Hyop weighs in at 61 Bytes min + brotli. Hyop binds functions to html tags. With a minimal amount of logic. These functions can bind DOM elements to reactive memos.`,
				()=>[
					[`##### YouTube Video Player & Animations`, [
						`Rmemo + hyop binds the video player control logic + animations on ${tb_a_({ href: 'https://brookebrodack.net/content' }, 'https://brookebrodack.net/content')}. The application logic is 4.16 kb gzip + brotli. The ${tb_a_({ href: 'https://github.com/btakita/ui--browser--brookebrodack/blob/main/content/hyop/content__hyop.ts' }, 'source code')} is available.`,]],
					[`##### Flexible & Lightweight Web Animation Timelines`, [
						`Reactive programming can manage Web Animation Timelines. I began developing the ${tb_a_({ href: 'https://brookebrodack.net/brookers' }, 'Brookers Timeline')} using ${motion_one__tb_a_()}, due to its small size at 3.8 kb min + gzip. Adding 1 kb min + gzip for spring easing. However, I found Motion One's timeline difficult to compose. As I was not able to use any form of callback when the event ended to chain timeline events together.`,
						nl,
						`So I replaced Motion One with rmemo. Creating a new library, ${tb_a_({ href: 'https://github.com/ctx-core/web_animation' }, 'ctx-core/web_animation')}. This library includes various helper functions to manage the Web Animations & their states.`,
						nl,
						`These helper library functions replacing Motion One end up being 1214 Bytes. Significantly smaller than Motion One. And these functions are multipurpose. Usabable for any domain with reactive state. The imported functions include:`,
						`- wanimato__new`,
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
						`It works with a web server such as ${elysiajs__tb_a_()}. relysjs is a library that uses rebuildjs to add reactive state to ElysiaJS.`,
						nl,
						`rebuildjs uses ${ctx_core_be__tb_a_()} for context state. This context state modularizes composable state for the:`,
						`- server-side app`,
						`- server-side middleware`,
						`- server-side request`,
						`- browser-side`,
						`- any environment`,]],
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
		`WeakRef has reasonable performance & memory usage. This is seen through the benchmarks where rmemo uses WeakRef. Rmemo stands for reactive memo. The reactive memo is a function that is reactive within other reactive memos. The first commit for rmemo was in 2023-11-17. Since then, the following has been developed by me. All of which are powered by rmemo & WeakRef:`,
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
