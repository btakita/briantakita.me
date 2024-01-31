import { blog_ctx__new } from '@btakita/domain--any--blog'
import { logo_image__set, site__set, social_a1__set } from '@btakita/domain--server--blog'
import { LOGO_IMAGE, SITE, SOCIALS } from '@config'
import { relement__use } from 'relementjs'
import { server__fragment__relement } from 'relementjs/server'
export function mdx__ctx__new() {
	const ctx = blog_ctx__new()
	relement__use(server__fragment__relement)
	logo_image__set(ctx, LOGO_IMAGE)
	site__set(ctx, SITE)
	social_a1__set(ctx, SOCIALS)
	return ctx
}
