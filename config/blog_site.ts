import { site_logo__svg_ } from '@btakita/ui--server--briantakita/icon'
import { type blog_site_T } from '@rappstack/domain--server--blog/site'
import { type logo_image__new_T } from '@rappstack/domain--server/site'
import { import_meta_env_ } from 'ctx-core/env'
import favicon_svg from '../public/assets/favicon.svg'
import briantakita_og_jpg from '../public/assets/images/briantakita-og.jpg'
export const logo_image__new:logo_image__new_T = ($p?:{ class?:string })=>
	site_logo__svg_($p)
export const blog_site:blog_site_T = {
	website: 'https://briantakita.me', // replace this with your deployed domain
	author: 'Brian Takita',
	description: 'Reactive Context Enthusiast',
	title: 'Brian Takita',
	icon: {
		type: 'image/svg+xml',
		href: favicon_svg
	},
	social_image_url: briantakita_og_jpg,
	font__meta_props_a1: [
		{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 1 },
		{
			href: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=JetBrains+Mono:wght@400;700&display=swap',
			rel: 'stylesheet'
		}
	],
	light_and_dark_mode: true,
	google_site_verification: import_meta_env_().PUBLIC_GOOGLE_SITE_VERIFICATION,
	gtag_id: 'G-F2F171MSE3',
	logo_image__new,
	page__post_count: 10,
	home__post_count: 4,
}
