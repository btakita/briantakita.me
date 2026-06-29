import { site_logo__svg_ } from '@btakita/ui--server--briantakita/icon'
import { type blog_site_T } from '@rappstack/domain--server--blog/site'
import { author_T, type logo_image__new_T } from '@rappstack/domain--server/site'
import {
	tabler_brand_discord_,
	tabler_brand_github_,
	tabler_brand_gitlab_,
	tabler_brand_linkedin_,
	tabler_brand_telegram_,
	tabler_mail_
} from '@rappstack/ui--any--blog/icon'
import { import_meta_env_ } from 'ctx-core/env'
import { url__join } from 'ctx-core/uri'
import { post_mod_a1 } from '../post/index.js'
import favicon_svg from '../public/assets/favicon.svg'
import briantakita_og_jpg from '../public/assets/images/briantakita-og.jpg'
import author_image from '../public/assets/images/briantakita-profile-photo.webp'
export const logo_image__new:logo_image__new_T = ($p?:{ class?:string })=>
	site_logo__svg_($p)
const title = 'Brian Takita'
const website = 'https://briantakita.me'
const social_a1 = [
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
export const brian_takita = <author_T>{
	'@type': 'Person',
	'@id': url__join(website, '#Person'),
	name: 'Brian Takita',
	url: website,
	image: url__join(website, author_image),
}
export const blog_site:blog_site_T = {
	website,
	author_a1: [brian_takita],
	description: 'Full Stack Software, Design, Author, & SEO',
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
			href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap',
			rel: 'stylesheet'
		}
	],
	color_scheme_vars: {
		light: {
			'--color-fill': '250,249,246',
			'--color-text-base': '31,32,35',
			'--color-text-muted': '91,94,99',
			'--color-accent': '0,102,91',
			'--color-card': '240,239,235',
			'--color-card-muted': '226,230,226',
			'--color-border': '217,214,207',
			'--color-code-fill': '29,33,37',
			'--color-inline-code-fill': '232,238,235',
			'--color-inline-code-text': '23,69,64',
		},
		dark: {
			'--color-fill': '18,21,24',
			'--color-text-base': '229,231,226',
			'--color-text-muted': '166,174,172',
			'--color-accent': '115,219,196',
			'--color-card': '31,36,40',
			'--color-card-muted': '45,53,58',
			'--color-border': '70,79,84',
			'--color-code-fill': '10,14,17',
			'--color-inline-code-fill': '34,42,45',
			'--color-inline-code-text': '202,249,238',
		},
	},
	google_site_verification: import_meta_env_().PUBLIC_GOOGLE_SITE_VERIFICATION,
	gtag_id: 'G-F2F171MSE3',
	logo_image__new,
	post_mod_a1,
	page__post_count: 10,
	home__post_count: 4,
	social_a1
}
