// Place any global data in this file.
import type { logo_image_T, site_T, social_T } from '@btakita/domain--server--blog'
// You can import this data from anywhere in your site by using the `import` keyword.
export const SITE:site_T = {
	website: 'https://briantakita.me/', // replace this with your deployed domain
	author: 'Brian Takita',
	description: 'Reactive Context Enthusiast',
	title: 'Brian Takita',
	og_image: '/assets/images/briantakita-og.jpg',
	light_and_dark_mode: true,
	page__post_count: 10,
	home__post_count: 4,
}
export const LOGO_IMAGE:logo_image_T = {
	enable: false,
	svg: true,
	width: 216,
	height: 46,
}
export const SOCIALS:social_T[] = [
	{
		name: 'Github',
		href: 'https://github.com/btakita',
		link_title: ` ${SITE.title} on Github`,
		active: true,
	},
	{
		name: 'LinkedIn',
		href: 'https://www.linkedin.com/in/briantakita/',
		link_title: `${SITE.title} on LinkedIn`,
		active: true,
	},
	{
		name: 'Mail',
		href: 'mailto:brian.takita@gmail.com',
		link_title: `Send an email to ${SITE.title}`,
		active: false,
	},
	{
		name: 'Discord',
		href: 'https://discord.com/users/413926819733962762',
		link_title: `${SITE.title} on Discord`,
		active: false,
	},
	{
		name: 'GitLab',
		href: 'https://gitlab.com/btakita',
		link_title: `${SITE.title} on GitLab`,
		active: false,
	},
	{
		name: 'Skype',
		href: 'https://github.com/satnaing/astro-paper',
		link_title: `${SITE.title} on Skype`,
		active: false,
	},
	{
		name: 'Telegram',
		href: 'https://t.me/BrianTakita',
		link_title: `${SITE.title} on Telegram`,
		active: false,
	},
]
