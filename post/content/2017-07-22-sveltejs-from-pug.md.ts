import { pugjs__tb_a_, sveltejs__tb_a_ } from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2017-07-22T09:00Z',
	title: `Svelte JS from Pug`,
	slug: 'sveltejs-from-pug',
	tag_a1: [
		'sveltejs',
		'pug',
		'hydration',
		'web development',
	],
	description:
		`On my current project, I will be migrating from Pug to Svelte. The key concepts are Server Side Rendering, Hydration, client/server architectural options.`
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_(ctx, `
Now it's time to implement server side rendering (SSR) using SvelteJS.

On my current project, I will be migrating from ${pugjs__tb_a_()} to ${sveltejs__tb_a_()}. The key concepts are ${tb_a_({ href: 'https://svelte.technology/guide#server-side-rendering', nofollow: true }, 'Server Side Rendering')}, ${tb_a_({ href: 'https://github.com/sveltejs/svelte/pull/649', nofollow: true }, 'Hydration')}, client/server architectural options.

SvelteJS allows one to render in dom & server side environments. SSR is simpler than DOM rendering since Svelte does not worry about \`oncreate\`, \`ondestroy\`, or \`events\`, or \`methods\`. \`data\` & \`computed properties\` still work to create the properties and \`helpers\` are also available.

Svelte SSR is fully capable of replacing any server side html/xml templating system. For my current project, I replaced PUG.

Here's a relatively full-featured example of the Isomorphic Svelte components that utilize hydration.

One the server side, the \`__SSR\` component (\`Index__SSR.html\`) wraps the content (\`Index.html\`) component. On the dom, the \`Index.html\` component is rehydrated when loaded.

This allows html to be generated on the server side (enabling HTTP caching), while allowing dynamic behavior to be \`rehydrated\` in the dom.

All of this happens solely in Svelte components, creating a unified architecture for both server side & dom rendering.
`.trim())
// @formatter:on
