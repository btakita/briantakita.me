// Place any global data in this file.
import type { LogoImage, Site, Social } from '@btakita/domain--server--blog'
// You can import this data from anywhere in your site by using the `import` keyword.
export const SITE_TITLE = 'Astro Blog'
export const SITE_DESCRIPTION = 'Welcome to my website!'
export const SITE:Site = {
	website: 'https://briantakita.me/', // replace this with your deployed domain
	author: 'Brian Takita',
	desc: 'A minimal, responsive and SEO-friendly Astro blog theme.',
	title: 'Brian Takita',
	og_image: 'briantakita-og.jpg',
	light_and_dark_mode: true,
	post_per_page: 3,
}
export const LOGO_IMAGE:LogoImage = {
	enable: false,
	svg: true,
	width: 216,
	height: 46,
}
export const SOCIALS:Social[] = [
	{
		name: 'Github',
		href: 'https://github.com/btakita',
		linkTitle: ` ${SITE.title} on Github`,
		active: true,
	},
	{
		name: 'LinkedIn',
		href: 'https://www.linkedin.com/in/briantakita/',
		linkTitle: `${SITE.title} on LinkedIn`,
		active: true,
	},
	{
		name: 'Mail',
		href: 'mailto:brian.takita@gmail.com',
		linkTitle: `Send an email to ${SITE.title}`,
		active: false,
	},
	{
		name: 'Discord',
		href: 'https://discord.com/users/413926819733962762',
		linkTitle: `${SITE.title} on Discord`,
		active: false,
	},
	{
		name: 'GitLab',
		href: 'https://gitlab.com/btakita',
		linkTitle: `${SITE.title} on GitLab`,
		active: false,
	},
	{
		name: 'Skype',
		href: 'https://github.com/satnaing/astro-paper',
		linkTitle: `${SITE.title} on Skype`,
		active: false,
	},
	{
		name: 'Telegram',
		href: 'https://t.me/BrianTakita',
		linkTitle: `${SITE.title} on Telegram`,
		active: false,
	},
]
