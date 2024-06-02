import { briantakita_server_env_ } from '@btakita/domain--server--briantakita/env'
import { heroicons_chevron_double_right_ } from '@btakita/ui--server--briantakita/icon'
import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { nofollow_tb_a_ } from '@rappstack/ui--any/anchor'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { md__raw_ } from '@rappstack/ui--any/md'
import { nl } from '@rappstack/ui--any/string'
import { footnote__sup_ } from '@rappstack/ui--server--blog/footnote'
import { class_ } from 'ctx-core/html'
import { url__join } from 'ctx-core/uri'
import { type request_ctx_T } from 'rebuildjs/server'
import { iframe_, img_ } from 'relementjs/html'
import chrome_dev_toolbar_menu_lighthouse_webp
	from '../../public/assets/lighthouse/chrome-dev-toolbar-menu-lighthouse.webp'
const slug = 'squarespace-site-lighthouse-scores'
const bucket_url = briantakita_server_env_().ASSETS_BRIANTAKITA_ME__BUCKET_URL
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2024-03-06T01:41:02.185Z',
	title: 'Squarespace Site Lighthouse Scores',
	slug,
	tag_a1: [
		'performance',
		'lighthouse',
		'squarespace',
		'ecommerce',
		'shopify',
		'wordpress',
		'woocommerce',
		'crm',
	],
	description: `Let's analyze the performance of some Squarespace sites. Along with the fastest WordPress & Shopify themes.`,
	featured: true,
})
export default (ctx:request_ctx_T)=>{
	// @formatter:off
	// language=md
	return ''
+ md__raw_({ ctx }, `Squarespace is an E-commerce CRM with dominant market share. I became curious about it's performance when reviewing some squarespace sites. I will use the lighthouse scores for performance analysis of some squarespace sites.`)
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	[`## Site performance impacts SEO`, [
		`Google & other search engines ${nofollow_tb_a_({ href: 'https://developers.google.com/search/blog/2010/04/using-site-speed-in-web-search-ranking' }, 'factor page load time')} in ranking search results. Page speed ensures the audience has an optimal experience viewing the search result.`,]],
	[`## The Lighthouse Test Tool`, [
		`Lighthouse is ${nofollow_tb_a_({ href: 'https://developer.chrome.com/docs/lighthouse/overview/' }, 'built into Google Chrome')}. To use:`,
		`1. Open Chrome in Incognito Mode`,
    `1. Navigate to the Web Page that you want to test`,
    `1. Open the Developer Toolbar. Ctrl+Shift+I on Windows/Linux & Cmd+Shift+I on OSX`,
    `1. Select the Lighthouse tab at the top menu. You may have to press the ${heroicons_chevron_double_right_({ class: 'inline-block m-0 h-6 w-6'})} icon at the right to see the Lighthouse tool
       ${img_({
         src: chrome_dev_toolbar_menu_lighthouse_webp,
         alt: 'Google Chrome Dev Toolbar Menu with Lighthouse',
         class: class_('max-h-[395px]', 'w-full')
       })}`,
		nl,
		`Keep in mind that this site scores at 100 across the board (performance, accessibility, best practices, seo)${footnote__sup_({ ctx, id: 'briantakita-me-100' }, 'briantakita.me lighthouse', lighthouse__iframe_(url__join(bucket_url, 'lighthouse/briantakita.me.html'), 'briantakita.me lighthouse'))}. Also keep in mind that anything above 90 is considered a good score.`,]],
	[`## Case 1 - ${nofollow_tb_a_({ href: 'https://www.artipsstudio.com/' }, 'artipsstudio.com')}`, [
		`A performance score of 20 is surprising. But then, this site targets fans of artistry. So large beautiful images & elegant design take priority.`,
		nl,
		`${lighthouse__iframe_(url__join(bucket_url, 'lighthouse/artipsstudio.html'), 'artipsstudio.com lighthouse')}`,]],
	[`## Case 2 - ${nofollow_tb_a_({ href: 'https://www.jonesbbqkc.com/' }, 'jonesbbqkc.com')}`, [
		`This site performed better but leaves much to be desired. The home page animation is catchy.`,
		nl,
		`${lighthouse__iframe_(url__join(bucket_url, 'lighthouse/jonesbbqkc.html'), 'jonesbbqkc.com lighthouse')}`,]],
	[`## Case 3 - ${nofollow_tb_a_({ href: 'https://devoe-fluid-demo.squarespace.com/' }, 'devoe fluid demo')}`, [
		`${nofollow_tb_a_({ href: 'https://www.stylefactoryproductions.com/blog/how-to-speed-up-a-squarespace-site' }, 'How to Speed Up a Squarespace Site')} features the Devoe template. For it's performance improvements over other Squarespace Site templates. With a performance score of 55, Squarespace has a ways to go.`,
		nl,
		`${lighthouse__iframe_(url__join(bucket_url, 'lighthouse/devoe.html'), 'devoe demo lighthouse')}`,]],
	[`## Squarespace going forward`, [
		`Squarespace 7.1 has performance improvements over 7.0. So expect further performance improvements in the future. Squarespace by itself will not get you to a high score. Judicious use of javascript, css, & images are necessary for a high performance website.`,]],
	[`## Alternatives to Squarespace`, [
		`Alternative e-commerce platforms are another option. The ${nofollow_tb_a_({ href: 'https://boostertheme.com/' }, 'Booster theme')} is the fastest Shopify theme I found.`,]],
	[`## Bonus Shopify Booter Theme Case Study - ${nofollow_tb_a_({ href: 'https://dodropshipping.com/' }, 'dodropshipping.com')}`, [
		`dodropshipping.com has a performance score of 85. A decent score! My hunch is that Shopify has an advantage due it's 3rd party theme ecosystem. These 3rd party themes boutique developers to specialize. The Booster theme team delivers high performance Shopify themes. Dodropshipping.com is close. I would not be surprised if dodropshipping.com could optimize their page to be in the mid 90's or higher.`,
		nl,
		`${lighthouse__iframe_(url__join(bucket_url, 'lighthouse/dodropshipping.html'), 'dodropshipping lighthouse')}`,]],
	[`## Bonus Shopify Booter Theme Case Study - ${nofollow_tb_a_({ href: 'https://dodropshipping.com/' }, 'dodropshipping.com')}`, [
		`dodropshipping.com has a performance score of 85. A decent score! My hunch is that Shopify has an advantage due it's 3rd party theme ecosystem. These 3rd party themes boutique developers to specialize. The Booster theme team delivers high performance Shopify themes. Dodropshipping.com is close. I would not be surprised if dodropshipping.com could optimize their page to be in the mid 90's or higher.`,
		nl,
		`${lighthouse__iframe_(url__join(bucket_url, 'lighthouse/dodropshipping.html'), 'dodropshipping lighthouse')}`,]],
	[`## Bonus #2 WordPress WooCommerce Theme Shoptimizer - ${nofollow_tb_a_({ href: 'https://shoptimizerdemo.commercegurus.com/' }, 'Shoptimizer demo')}`, [
		`The ${nofollow_tb_a_({ href: 'https://www.commercegurus.com/product/shoptimizer/' }, 'Shoptimizer')} theme breaks into the "good" performance score with a 95! Kudos to the Shoptimizer team. Keep in mind that this is a demo & is likely the ceiling of this theme's optimization. Yet few theme achieve a performance score >90, so it is noteworthy.`,
		nl,
		`${lighthouse__iframe_(url__join(bucket_url, 'lighthouse/shoptimizer.html'), 'shoptimizer lighthouse')}`,]],
	[`## Why are there few e-commerce themes with good (>90) to Perfect Performance Scores?`, [
		`An e-commerce CMS theme has to account for a wide range of use cases. Some use cases include:`,
		`- Integrating with the Platform's CMS tooling`,
    `- Appealing to a wide range of industries`,
    `- Supporting the business & staff overhead while making a profit. This often means maximizing revenue by serving many customers. And lowering costs by sharing infrastructure.`,
    `- The site configuration must be high performance. This means not adding unnecessary javascript, css, & assets. And using non-blocking methods for page interaction.`,
		nl,
		`Good to perfect performance scores with a large e-commerce CMS platform is possible. Obtaining these measurables is difficult. It will take time for e-commerce platforms to develop their codebases, practices, & infrastructures.`,]],
	[`## A good (>90) to Perfect Performance Score with Custom Sites or Custom Platforms`, [
		`A custom e-commerce site or platform can have a good to perfect performance score. With a software stack built for speed. I am working on high performance e-commerce solutions. I custom built software for performance, efficiency, & maintainability. Using cutting edge industry & novel tech. Stay tuned for an e-commerce platform that will give you a high performance. With SEO & Semantic AI optimization. Along with usability. There will be other features geared toward serving Small Business Owners.`,
		nl,
		`I am striving to announce this platform soon. Until then, happy optimizing!`,
		nl,
		`Email me ${nofollow_tb_a_({ href: 'mailto:info+squarespace-site-lighthouse-scores@briantakita.me' }, 'email me')} discuss further.`,]],
])}
// @formatter:on
function lighthouse__iframe_(src:string, title:string) {
	return iframe_({ 'data-src': src, class: 'w-full h-80 mb-24', loading: 'lazy', title })
}
