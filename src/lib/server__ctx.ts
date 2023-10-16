import { blog_server__ctx__new, type load__font_T, load__regular_font__set } from '@btakita/domain--server--blog'
import { LOGO_IMAGE, SITE, SOCIALS } from '@config'
import type { APIContext, AstroGlobal } from 'astro'
export function server__ctx__new(Astro:APIContext|AstroGlobal) {
	const ctx = blog_server__ctx__new(Astro, {
		logo_image: LOGO_IMAGE,
		site: SITE,
		socials: SOCIALS,
	})
	load__regular_font__set(ctx, {
		name: 'Atkinson Hyperlegible',
		weight: 400,
		style: 'normal',
		url: `https://${Astro.url.hostname}/assets/fonts/atkinson-regular.woff`,
	} as load__font_T)
	load__regular_font__set(ctx, {
		name: 'Atkinson Hyperlegible',
		weight: 600,
		style: 'normal',
		url: `https://${Astro.url.hostname}/assets/fonts/atkinson-bold.woff`,
	} as load__font_T)
	return ctx
}