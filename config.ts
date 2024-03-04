// Place any global data in this file.
import { site_logo__svg_ } from '@btakita/ui--server--briantakita/icon'
import { type blog_site_T } from '@rappstack/domain--server--blog/site'
import { type logo_image__new_T } from '@rappstack/domain--server/logo'
import { type social_T } from '@rappstack/domain--server/social'
import {
	tabler_brand_discord_,
	tabler_brand_github_,
	tabler_brand_gitlab_,
	tabler_brand_linkedin_,
	tabler_brand_telegram_,
	tabler_mail_
} from '@rappstack/ui--any--blog/icon'
import { import_meta_env_ } from 'ctx-core/env'
import { relement__use } from 'relementjs'
import { server__relement } from 'relementjs/server'
import { app_ctx, cwd__set, port__set, src_path__set } from 'relysjs/server'
import briantakita_og_jpg from './public/assets/images/briantakita-og.jpg'
// You can import this data from anywhere in your site by using the `import` keyword.
export const blog_site:blog_site_T = {
	website: 'https://briantakita.me', // replace this with your deployed domain
	author: 'Brian Takita',
	description: 'Reactive Context Enthusiast',
	title: 'Brian Takita',
	og_image: briantakita_og_jpg,
	light_and_dark_mode: true,
	page__post_count: 10,
	home__post_count: 4,
}
export const logo_image__new:logo_image__new_T = ($p?:{ class?:string })=>
	site_logo__svg_($p)
export const social_a1:social_T[] = [
	{
		icon_: tabler_brand_github_,
		href: 'https://github.com/btakita',
		link_title: `${blog_site.title} on Github`,
		active: true,
	},
	{
		icon_: tabler_brand_linkedin_,
		href: 'https://www.linkedin.com/in/briantakita/',
		link_title: `${blog_site.title} on LinkedIn`,
		active: true,
	},
	{
		icon_: tabler_mail_,
		href: 'mailto:brian.takita@gmail.com',
		link_title: `Send an email to ${blog_site.title}`,
		active: false,
	},
	{
		icon_: tabler_brand_discord_,
		href: 'https://discord.com/users/413926819733962762',
		link_title: `${blog_site.title} on Discord`,
		active: false,
	},
	{
		icon_: tabler_brand_gitlab_,
		href: 'https://gitlab.com/btakita',
		link_title: `${blog_site.title} on GitLab`,
		active: false,
	},
	{
		icon_: tabler_brand_telegram_,
		href: 'https://t.me/BrianTakita',
		link_title: `${blog_site.title} on Telegram`,
		active: false,
	},
]
export function config__init() {
	const port = parseInt(import_meta_env_().BRIANTAKITA_PORT) || 4100
	port__set(app_ctx, port)
	cwd__set(app_ctx, process.cwd())
	src_path__set(app_ctx, process.cwd())
	relement__use(server__relement)
}
