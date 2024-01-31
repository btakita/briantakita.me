import { post_meta__validate } from '@btakita/domain--any--blog'
import { md__raw_ } from '@btakita/ui--any--blog/md'
import { tb_a_ } from '@btakita/ui--server--blog/anchor'
import { footnote__sup_, footnote_list__div_ } from '@btakita/ui--server--blog/footnote'
import {
	atb_astrojs_,
	atb_astropaper_,
	atb_bunjs_,
	atb_ctx_core_,
	atb_nanostores_,
	atb_solidjs_,
	atb_tailwindcss_,
	atb_vercel_,
} from '@btakita/ui--server--briantakita/anchor'
import { attribution_web_framework_realworld_app_sizes__add } from '@btakita/ui--server--briantakita/attribution'
import { type request_ctx_T } from 'rebuildjs/server'
import { figcaption_, figure_, img_ } from 'relementjs/html'
export const meta = post_meta__validate({
	author: `Brian Takita`,
	pub_date: '2023-10-17T15:35:28.259Z',
	title: `My new personal site`,
	slug: 'personal-site-written-with-astro-solidjs-ctx-core-nanostores',
	tag_a1: [
		'astrojs',
		'solidjs',
		'ctx-core',
		'nanostores',
		'tailwind',
	],
	description:
		`How I built my new site, using Astrojs, Solidjs, ctx-core, Nanostores, Tailwind.`
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_(`
I'm excited to launch my new site https://www.briantakita.me. The Typescript/Javascript ecosystem has made important advancement over the past few years to support development from small scale to large scale websites & applications.

This site is forked from ${atb_astropaper_()} theme. I made some modifications & will go through them in this	post.

This is a static site is a monorepo built with:

* ${atb_bunjs_()}
* ${atb_astrojs_()}
* ${atb_nanostores_()}
* ${atb_ctx_core_()}
* ${atb_solidjs_()}
* ${atb_tailwindcss_()}

It is deployed to ${atb_vercel_()}.

## Monorepo

For simplicity & ease of distribution, most ${tb_a_({ href: 'https://astro.build/themes/' }, 'Astro Themes')} are built in a single repository. I broke up the project into monorepo, where the libraries & apps are broken into	separate git repos. This provides structure to where the code is deployed to & how it's used while enabling code	re-use for other projects.

The git repos include:

* ${tb_a_({ href: 'https://github.com/btakita/briantakita.me-dev' }, 'btakita/briantakita.me-dev')} — monorepo with ${tb_a_({ href: 'https://git-scm.com/book/en/v2/Git-Tools-Submodules' }, `git submodules`)} to other libraries
* ${tb_a_({ href: 'https://github.com/btakita/briantakita.me' }, `btakita/briantakita.me`)} — briantakita.me astro app
* ${tb_a_({ href: 'https://github.com/btakita/domain--all--blog' }, `btakita/domain--all--blog`)} — domain library targeting the browser & server for blogs
* ${tb_a_({ href: 'https://github.com/btakita/domain--server' }, `btakita/domain--server`)} — domain library targeting the server
* ${tb_a_({ href: 'https://github.com/btakita/domain--server--blog'}, `btakita/domain--server--blog`)} — domain logic targeting the server for blogs
* ${tb_a_({ href: 'https://github.com/btakita/ui--all--blog' }, `btakita/ui--all--blog`)} — UI library targeting the browser & server for blogs
* ${tb_a_({ href: 'https://github.com/btakita/ui--server--blog' }, `btakita/ui--server--blog`)} — UI library targeting the server for blogs

## Tech Stack

### Solidjs provides benefits over other isomorphic component frameworks *(e.g. React)*:

* A more comprehensible API & more natural integration with the DOM API
* \`Reactive Signals — \`${tb_a_({ href: 'https://dev.to/this-is-learning/react-vs-signals-10-years-later-3k71' }, `cleaner component state management`)}* 
* Smaller payload *(from ${tb_a_({ href: 'https://dev.to/ryansolid/introducing-the-solidjs-ui-library-4mck' }, `Introducing the SolidJS UI Library`)})*${
	figure_(
		img_({
			width: '50%',
			src: '/assets/images/web-framework-realworld-app-sizes.png',
			alt: 'Web framework Realword App Sizes'
		}),
		figcaption_(
			attribution_web_framework_realworld_app_sizes__add({ ctx })))}
* ${tb_a_({ href: 'https://krausest.github.io/js-framework-benchmark/2023/table_chrome_118.0.5993.70.html' },`Fast`)}
* Less code needed for components
* JSX — function components facilitate composition *(compared to single file components with Vue or Svelte)*

### Full-stack global state management with ctx-core & nanostores

ctx-core with nanostores enables libraries & apps to easily share state management${
	footnote__sup_({ ctx, id: 'my-history-with-state-management-and-ctx-core-nanostores' },
		tb_a_({ href: '/posts/my-history-with-state-management-and-ctx-core-nanostores' },`How I ended up using ctx-core & nanostores…`))
}.

${footnote_list__div_({ ctx })}
`.trim())
// @formatter:on