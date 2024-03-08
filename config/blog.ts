import { site_logo__svg_ } from '@btakita/ui--server--briantakita/icon'
import type { blog_site_T } from '@rappstack/domain--server--blog/site'
import type { logo_image__new_T } from '@rappstack/domain--server/logo'
import briantakita_og_jpg from '../public/assets/images/briantakita-og.jpg'
export const logo_image__new:logo_image__new_T = ($p?:{ class?:string })=>
	site_logo__svg_($p)
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
