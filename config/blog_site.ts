import { site_logo__svg_ } from '@btakita/ui--server--briantakita/icon'
import { type blog_site_T } from '@rappstack/domain--server--blog/site'
import { type logo_image__new_T } from '@rappstack/domain--server/site'
import {
	tabler_brand_discord_,
	tabler_brand_github_,
	tabler_brand_gitlab_,
	tabler_brand_linkedin_,
	tabler_brand_telegram_,
	tabler_mail_
} from '@rappstack/ui--any--blog/icon'
import { import_meta_env_ } from 'ctx-core/env'
import { post_mod_a1 } from '../post/index.js'
import favicon_svg from '../public/assets/favicon.svg'
import briantakita_og_jpg from '../public/assets/images/briantakita-og.jpg'
import briantakita_profile_photo_webp from '../public/assets/images/briantakita-profile-photo.webp'
export const logo_image__new:logo_image__new_T = ($p?:{ class?:string })=>
	site_logo__svg_($p)
const title = 'Brian Takita'
export const blog_site:blog_site_T = {
	website: 'https://briantakita.me', // replace this with your deployed domain
	author: 'Brian Takita',
	author_img_url: briantakita_profile_photo_webp,
	description: 'Reactive Context Enthusiast',
	title: title,
	favicon: {
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
	post_mod_a1,
	page__post_count: 10,
	home__post_count: 4,
	social_a1: [
		{
			icon_: tabler_brand_github_,
			href: 'https://github.com/btakita',
			link_title: `${title} on Github`,
			active: true,
		},
		{
			icon_: tabler_brand_linkedin_,
			href: 'https://www.linkedin.com/in/briantakita/',
			link_title: `${title} on LinkedIn`,
			active: true,
		},
		{
			icon_: tabler_mail_,
			href: 'mailto:brian.takita@gmail.com',
			link_title: `Send an email to ${title}`,
			active: false,
		},
		{
			icon_: tabler_brand_discord_,
			href: 'https://discord.com/users/413926819733962762',
			link_title: `${title} on Discord`,
			active: false,
		},
		{
			icon_: tabler_brand_gitlab_,
			href: 'https://gitlab.com/btakita',
			link_title: `${title} on GitLab`,
			active: false,
		},
		{
			icon_: tabler_brand_telegram_,
			href: 'https://t.me/BrianTakita',
			link_title: `${title} on Telegram`,
			active: false,
		},
	]
}
