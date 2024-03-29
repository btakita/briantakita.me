import {
	astrojs__tb_a_,
	aws__tb_a_,
	cms__tb_a_,
	codemirror__tb_a_,
	docker__tb_a_,
	flyio__tb_a_,
	grapejs__tb_a_,
	jamstack__tb_a_,
	reactjs__tb_a_,
	solidjs__tb_a_,
	sqlite__tb_a_,
	strapi__tb_a_,
	sveltejs__tb_a_,
	vercel__tb_a_,
	vite__tb_a_,
	vue__tb_a_
} from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--any--blog/post'
import { site__author_, site__author_img_url_ } from '@rappstack/domain--server/site'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import type { request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate({
	author: site__author_(ctx)!,
	author_img_url: site__author_img_url_(ctx)!,
	pub_date: '2023-10-29T08:31:00Z',
	title: 'Log 2023-10-29',
	slug: 'log-2023-10-29',
	tag_a1: [
		'cms',
		'astrojs',
		'log',
	],
	description: `CMS exploration: Strapi, GrapeJS, CodeMirror, Astrojs, Vite, Vercel, Fly.io`,
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
## ${cms__tb_a_()}

Looking at some tools to rapidly create CMS backed sites for artists, bloggers, etc.

### ${strapi__tb_a_()}

Strapi seems like the best option for the headless CRM. I features:

- a flexible model to create content & apis
- supporting multiple databases to store content
- a ui to edit content

### ${grapejs__tb_a_()}

A No Code website builder. It features:

- full site design
- a nice ui that supports components
- responsive design
- vanilla js
- Codemirror editors

### ${codemirror__tb_a_()}

A Rich Text Editor. It features:

- an extensible api
- good docs
- modular design

### ${astrojs__tb_a_()}

A MPA web app library. It features:

* a ${vite__tb_a_()} core
* support for multiple component libraries (${solidjs__tb_a_()}, ${reactjs__tb_a_()}, ${sveltejs__tb_a_()}, ${vue__tb_a_()})

### ${vercel__tb_a_()}

A cloud host on ${aws__tb_a_()}

### ${flyio__tb_a_()}

An edge-computing cloud service that runs ${docker__tb_a_()} images.

### Approach

I will start working with GrapeJS & integrating it with Strapi in an Astrojs app. Editable content will be saved	in Strapi using ${sqlite__tb_a_()}. When an edit is published, the Astrojs app is rebuilt with the new content & site is then republished as a ${jamstack__tb_a_()} on Vercel. I may also just use dynamic api requests to Strapi, using ${tb_a_({ href: 'https://fly.io/blog/all-in-on-sqlite-litestream/', nofollow: true }, 'sqlite on Fly.io')}.
`.trim())
// @formatter:on
