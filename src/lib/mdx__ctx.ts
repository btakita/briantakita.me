import { blog__ctx__new, van__set } from '@btakita/domain--all--blog'
import { logo_image__set, site__set, socials__set } from '@btakita/domain--server--blog'
import { LOGO_IMAGE, SITE, SOCIALS } from '@config'
import van from 'mini-van-plate/van-plate'
export function mdx__ctx__new() {
	const ctx = blog__ctx__new()
	van__set(ctx, van)
	logo_image__set(ctx, LOGO_IMAGE)
	site__set(ctx, SITE)
	socials__set(ctx, SOCIALS)
	return ctx
}
