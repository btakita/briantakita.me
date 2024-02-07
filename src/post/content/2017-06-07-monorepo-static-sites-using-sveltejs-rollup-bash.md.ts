import {
	briantakita_com__tb_a_,
	ctx_core__tb_a_,
	domain_driven_design__tb_a_,
	jeckyllrb__tb_a_,
	metalsmithjs__tb_a_,
	rollupjs__tb_a_,
	sveltejs__tb_a_,
	wintersmithjs__tb_a_
} from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--any--blog'
import { md__raw_ } from '@rappstack/ui--any--blog/md'
export const meta_ = ()=>post_meta__validate({
	title: `Monorepo Static Sites using Svelte JS, Rollup, ctx-core, & Bash`,
	author: `Brian Takita`,
	pub_date: '2017-06-07T05:30Z',
	slug: 'monorepo-static-sites-using-sveltejs-rollup-bash',
	tag_a1: [
		'javascript',
		'ctx-core',
		'sveltejs',
		'monorepo',
		'web development',
		'open source',
	],
	description: `Building my old site briantakita.com using sveltejs, rollupjs, ctx-core, bash`
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
BrianTakita.com *(now briantakita.me)* is now built using a technology chain consisting of ${sveltejs__tb_a_()}, ${rollupjs__tb_a_()}, ${ctx_core__tb_a_()}, & good ol' Bash.

You can see the source in the ${briantakita_com__tb_a_()} repo.

I wanted a static site generator that felt like building a custom app, with a ${domain_driven_design__tb_a_()},	approachable custom build scripts, & isomorphic javascript.

This site was build using existing solutions such as ${jeckyllrb__tb_a_()}, ${wintersmithjs__tb_a_()}, & ${metalsmithjs__tb_a_()}. When using each of these libraries, I felt the desire to strip away the non-essential code & to have things done my way.

Some of my essential features include:

* a development server with watch/build scripts
* generate static html files to serve from github.io
* isomorphic javascript

With these techs, the following is possible:

* static file builds
* server side rendering
* client side rendering

This means the entire html page can be rendered using svelte on the server (or static file) & svelte on the client side (for dynamic components). This means there's no need for other rendering libraries like pug. Only svelte & raw html strings are needed to gain all of the features of dynamic isomorphic components!

With this retooling, I will begin working on components to enhance the experience of authoring & reading meaning-dense information.

Stay tuned&hellip;
`.trim())
// @formatter:on
