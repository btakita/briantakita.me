// Place any global data in this file.
import { type logo_image_T } from '@rappstack/domain--server--blog/logo'
import { type site_T } from '@rappstack/domain--server--blog/site'
import { type social_T } from '@rappstack/domain--server--blog/social'
import briantakita_og_jpg from '../public/assets/images/briantakita-og.jpg'
// You can import this data from anywhere in your site by using the `import` keyword.
export const site:site_T = {
	website: 'https://briantakita.me', // replace this with your deployed domain
	author: 'Brian Takita',
	description: 'Reactive Context Enthusiast',
	title: 'Brian Takita',
	og_image: briantakita_og_jpg,
	light_and_dark_mode: true,
	page__post_count: 10,
	home__post_count: 4,
}
export const logo_image:logo_image_T = {
	enable: false,
	svg: true,
	width: 216,
	height: 46,
}
export const social_a1:social_T[] = [
	{
		name: 'Github',
		href: 'https://github.com/btakita',
		link_title: ` ${site.title} on Github`,
		active: true,
	},
	{
		name: 'LinkedIn',
		href: 'https://www.linkedin.com/in/briantakita/',
		link_title: `${site.title} on LinkedIn`,
		active: true,
	},
	{
		name: 'Mail',
		href: 'mailto:brian.takita@gmail.com',
		link_title: `Send an email to ${site.title}`,
		active: false,
	},
	{
		name: 'Discord',
		href: 'https://discord.com/users/413926819733962762',
		link_title: `${site.title} on Discord`,
		active: false,
	},
	{
		name: 'GitLab',
		href: 'https://gitlab.com/btakita',
		link_title: `${site.title} on GitLab`,
		active: false,
	},
	{
		name: 'Skype',
		href: 'https://github.com/satnaing/astro-paper',
		link_title: `${site.title} on Skype`,
		active: false,
	},
	{
		name: 'Telegram',
		href: 'https://t.me/BrianTakita',
		link_title: `${site.title} on Telegram`,
		active: false,
	},
]
