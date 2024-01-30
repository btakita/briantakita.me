import { md_c_ } from '@btakita/ui--any--blog/md'
import { tb_a_ } from '@btakita/ui--server--blog/anchor'
import { atb_pugjs_, atb_sveltejs_ } from '@btakita/ui--server--briantakita/anchor'
export const meta = {
	title: `Svelte JS from Pug`,
	author: `Brian Takita`,
	pubDate: '2017-07-22T09:00Z',
	slug: 'sveltejs-from-pug',
	tags: [
		'sveltejs',
		'pug',
		'hydration',
		'web development',
	],
	description:
		`On my current project, I will be migrating from Pug to Svelte. The key concepts are Server Side Rendering, Hydration, client/server architectural options.`
}
// @formatter:off
// language=md
export default ()=>md_c_(`
Now it's time to implement server side rendering (SSR) using SvelteJS.

On my current project, I will be migrating from ${atb_pugjs_()} to ${atb_sveltejs_()}. The key concepts are ${tb_a_({ href: 'https://svelte.technology/guide#server-side-rendering' }, 'Server Side Rendering')}, ${tb_a_({ href: 'https://github.com/sveltejs/svelte/pull/649' }, 'Hydration')}, client/server architectural options.

SvelteJS allows one to render in dom & server side environments. SSR is simpler than DOM rendering since Svelte does not worry about \`oncreate\`, \`ondestroy\`, or \`events\`, or \`methods\`. \`data\` & \`computed properties\` still work to create the properties and \`helpers\` are also available.

Svelte SSR is fully capable of replacing any server side html/xml templating system. For my current project, I replaced PUG.

Here's a relatively full-featured example of the Isomorphic Svelte components that utilize hydration.

One the server side, the \`__SSR\` component (\`Index__SSR.html\`) wraps the content (\`Index.html\`) component. On the dom, the \`Index.html\` component is rehydrated when loaded.

This allows html to be generated on the server side (enabling HTTP caching), while allowing dynamic behavior to be \`rehydrated\` in the dom.

All of this happens solely in Svelte components, creating a unified architecture for both server side & dom rendering.
`.trim())
// @formatter:on
