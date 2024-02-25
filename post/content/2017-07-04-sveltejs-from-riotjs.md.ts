import {
	ctx_core__tb_a_,
	metalsmithjs__tb_a_,
	riotjs__tb_a_,
	sveltejs__tb_a_
} from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--any--blog/post'
import { md__raw_ } from '@rappstack/ui--any/md'
import { tb_a_ } from '@rappstack/ui--any/anchor'
export const meta_ = ()=>post_meta__validate({
	title: `Svelte JS from Riot JS`,
	author: `Brian Takita`,
	pub_date: '2017-07-04T00:30Z',
	slug: 'sveltejs-from-riotjs',
	tag_a1: [
		'sveltejs',
		'riotjs',
		'web development',
	],
	description:
		`Creating Web Components/Web Apps has never been more pleasurable. It's out with the old & in with the new. I converted my client's project to use Svelte JS from Riot JS. This post highlights some considerations why I chose Svelte & a sample web component using Svelte.`
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
Creating Web Components/Web Apps has never been more pleasurable. It's out with the old & in with the new. I converted my client's project to use Svelte JS from Riot JS. This post highlights some considerations why I chose Svelte & a sample web component using Svelte.

${sveltejs__tb_a_()} is a build-time isomorphic library that utilizes a transpilation process to build completely	self-contained web components.

${riotjs__tb_a_()} is a runtime isomorphic component library.

I recently ${tb_a_({ href: '/posts/monorepo-static-sites-using-sveltejs-rollup-bash'}, 'converted this site')} to svelte from ${metalsmithjs__tb_a_()}, which is a static site generator.

While it's easy to get stuck into the rat race of endless technological upgrades & porting to the latest hyped piece of tech&hellip;

## Performance & Memory Usage

Despite beinga young library, svelte ${tb_a_({ href: 'https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html' }, 'does quite well')} on krausest/js-framework-benchmark for Performance & Memory Usage. That's because, Svelte	JS generates optimal javascript while not having the overhead of a runtime library. It's also going to have an	advantage in page load time due to not requiring a runtime library to be loaded.

## HTML-based Components

HTML is the lingua franca of the world wide web. HTML the lowest common denominator (developers, designers, non-technical) can work with. With Svelte, the HTML file is converted to be a Component. Components can use other Components.

I feel confident that I will continue to use Svelte for a long time. Since it's design is simple & well thought out (all of my use cases were supported with elegance), I don't expect to have upgrade pains that plague some of the larger frameworks out there.

## APIs

Svelte's api idioms are well thought out. Development flow was coherent natural during the port from Riot.

For each of my professional clients, I usea monorepo using the ${ctx_core__tb_a_()} toolkit. ctx-core has supporting architecture of a dependency injected ctx (context), agents, & build tools.

You can ${tb_a_({ href: 'https://svelte.dev/docs' }, 'read more about the features of svelte')}.
`.trim())
// @formatter:on
