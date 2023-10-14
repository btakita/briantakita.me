import { blog_server__ctx__new } from '@btakita/domain--server--blog'
import type { APIContext, AstroGlobal } from 'astro'
import { LOGO_IMAGE, SITE, SOCIALS } from '@config'
export function server__ctx__new(Astro:APIContext|AstroGlobal) {
	return blog_server__ctx__new(Astro, {
		logo_image: LOGO_IMAGE,
		site: SITE,
		socials: SOCIALS,
	})
}