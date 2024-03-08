import type { social_T } from '@rappstack/domain--server/social'
import {
	tabler_brand_discord_,
	tabler_brand_github_,
	tabler_brand_gitlab_,
	tabler_brand_linkedin_,
	tabler_brand_telegram_,
	tabler_mail_
} from '@rappstack/ui--any--blog/icon'
import { blog_site } from './blog.js'
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
