import { md_c_ } from '@btakita/ui--any--blog/md'
import { tb_a_ } from '@btakita/ui--server--blog/anchor'
import {
	atb_astrojs_,
	atb_aws_,
	atb_cms_,
	atb_codemirror_,
	atb_docker_,
	atb_flyio_,
	atb_grapejs_,
	atb_jamstack_,
	atb_reactjs_,
	atb_solidjs_,
	atb_sqlite_,
	atb_strapi_,
	atb_sveltejs_,
	atb_vercel_,
	atb_vite_,
	atb_vue_
} from '@btakita/ui--server--briantakita/anchor'
export const meta = {
	author: `Brian Takita`,
	pubDate: '2023-10-29T08:31:00Z',
	title: 'Log 2023-10-29',
	slug: 'log-2023-10-29',
	tags: [
		'cms',
		'astrojs',
		'log',
	],
	description: `CMS exploration: Strapi, GrapeJS, CodeMirror, Astrojs, Vite, Vercel, Fly.io`,
}
// @formatter:off
// language=md
export default ()=>md_c_(`
# ${atb_cms_()}

Looking at some tools to rapidly create CMS backed sites for artists, bloggers, etc.

## ${atb_strapi_}

Strapi seems like the best option for the headless CRM. I features:

- a flexible model to create content & apis
- supporting multiple databases to store content
- a ui to edit content

## ${atb_grapejs_()}

A No Code website builder. It features:

- full site design
- a nice ui that supports components
- responsive design
- vanilla js
- Codemirror editors

## ${atb_codemirror_()}

A Rich Text Editor. It features:

- an extensible api
- good docs
- modular design

## ${atb_astrojs_()}

A MPA web app library. It features:

* a ${atb_vite_()} core
* support for multiple component libraries (${atb_solidjs_()}, ${atb_reactjs_()}, ${atb_sveltejs_()}, ${atb_vue_()})

## ${atb_vercel_()}

A cloud host on ${atb_aws_()}

## ${atb_flyio_()}

An edge-computing cloud service that runs ${atb_docker_()} images.

## Approach

I will start working with GrapeJS & integrating it with Strapi in an Astrojs app. Editable content will be saved	in Strapi using ${atb_sqlite_()}. When an edit is published, the Astrojs app is rebuilt with the new content & site is then republished as a ${atb_jamstack_()} on Vercel. I may also just use dynamic api requests to Strapi, using ${tb_a_({ href: 'https://fly.io/blog/all-in-on-sqlite-litestream/' }, 'sqlite on Fly.io')}.
`.trim())
// @formatter:on
