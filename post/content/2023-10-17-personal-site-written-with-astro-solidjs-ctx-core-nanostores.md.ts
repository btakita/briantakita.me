import {
	astrojs__tb_a_,
	astropaper__tb_a_,
	bunjs__tb_a_,
	ctx_core__tb_a_,
	nanostores__tb_a_,
	solidjs__tb_a_,
	tailwindcss__tb_a_,
	vercel__tb_a_,
} from '@btakita/ui--server--briantakita/anchor'
import { attribution_web_framework_realworld_app_sizes__add } from '@btakita/ui--server--briantakita/attribution'
import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { md__raw_ } from '@rappstack/ui--any/md'
import { lines_, nl } from '@rappstack/ui--any/string'
import { footnote__sup_ } from '@rappstack/ui--server--blog/footnote'
import { type request_ctx_T } from 'rebuildjs/server'
import { figcaption_, figure_, img_ } from 'relementjs/html'
import web_framework_realworld_app_sizes_png from '../../public/assets/images/web-framework-realworld-app-sizes.png'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
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
export default (ctx:request_ctx_T)=>''
+ md__raw_({ ctx }, lines_([
	`I'm excited to launch my new site https://briantakita.me. The Typescript/Javascript ecosystem has made important advancement over the past few years to support development from small scale to large scale websites & applications.`,
	nl,
	`This site is forked from ${astropaper__tb_a_()} theme. I made some modifications & will go through them in this	post.`,
	nl,
	`This is a static site is a monorepo built with:`,
	nl,
	`- ${bunjs__tb_a_()}`,
	`- ${astrojs__tb_a_()}`,
	`- ${nanostores__tb_a_()}`,
	`- ${ctx_core__tb_a_()}`,
	`- ${solidjs__tb_a_()}`,
	`- ${tailwindcss__tb_a_()}`,
	nl,
	`It is deployed to ${vercel__tb_a_()}.`,
]))
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	[`# Monorepo`, [
		`For simplicity & ease of distribution, most ${tb_a_({ href: 'https://astro.build/themes/', nofollow: true }, 'Astro Themes')} are built in a single repository. I broke up the project into monorepo, where the libraries & apps are broken into	separate git repos. This provides structure to where the code is deployed to & how it's used while enabling code	re-use for other projects.`,
		nl,
		`The git repos include:`,
		`- ${tb_a_({ href: 'https://github.com/btakita/briantakita.me-dev' }, 'btakita/briantakita.me-dev')} — monorepo with ${tb_a_({ href: 'https://git-scm.com/book/en/v2/Git-Tools-Submodules' }, `git submodules`)} to other libraries`,
		`- ${tb_a_({ href: 'https://github.com/btakita/briantakita.me' }, `btakita/briantakita.me`)} — briantakita.me astro app`,
		`- ${tb_a_({ href: 'https://github.com/btakita/domain--all--blog' }, `btakita/domain--all--blog`)} — domain library targeting the browser & server for blogs`,
		`- ${tb_a_({ href: 'https://github.com/btakita/domain--server' }, `btakita/domain--server`)} — domain library targeting the server`,
		`- ${tb_a_({ href: 'https://github.com/btakita/domain--server--blog'}, `btakita/domain--server--blog`)} — domain logic targeting the server for blogs`,
		`- ${tb_a_({ href: 'https://github.com/btakita/ui--all--blog' }, `btakita/ui--all--blog`)} — UI library targeting the browser & server for blogs`,
		`- ${tb_a_({ href: 'https://github.com/btakita/ui--server--blog' }, `btakita/ui--server--blog`)} — UI library targeting the server for blogs`,]],
	[`# Tech Stack`, [
		()=>[
			[`## Solidjs provides benefits over other isomorphic component frameworks *(e.g. React)*:`, [
				`- A more comprehensible API & more natural integration with the DOM API`,
				`- \`Reactive Signals — \`${tb_a_({ href: 'https://dev.to/this-is-learning/react-vs-signals-10-years-later-3k71', nofollow: true }, `cleaner component state management`)}`,
				`- Smaller payload *(from ${tb_a_({ href: 'https://dev.to/ryansolid/introducing-the-solidjs-ui-library-4mck', nofollow: true }, `Introducing the SolidJS UI Library`)})*${web_framework_realworld_app_sizes_(ctx)}`,
				`- ${tb_a_({ href: 'https://krausest.github.io/js-framework-benchmark/2023/table_chrome_118.0.5993.70.html', nofollow: true },`Fast`)}`,
				`- Less code needed for components`,
				`- JSX — function components facilitate composition *(compared to single file components with Vue or Svelte)*`,]],
			[`## Full-stack global state management with ctx-core & nanostores`, [
				`ctx-core with nanostores enables libraries & apps to easily share state management${
          footnote__sup_({ ctx, id: 'my-history-with-state-management-and-ctx-core-nanostores' }, [
            tb_a_({ href: '/posts/my-history-with-state-management-and-ctx-core-nanostores' },`How I ended up using ctx-core & nanostores…`),])
				}.`,]],],]],
])
// @formatter:on
function web_framework_realworld_app_sizes_(ctx:request_ctx_T) {
  return (
		figure_(
			img_({
				width: '50%',
				src: web_framework_realworld_app_sizes_png,
				alt: 'Web framework Realword App Sizes'
			}),
			figcaption_(
				attribution_web_framework_realworld_app_sizes__add({ ctx })))
	)
}
