import rss from '@astrojs/rss'
import { SITE } from '@config'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
export async function GET(Astro:APIContext) {
	const posts = await getCollection('posts')
	const items = posts.map(post=>({
		...post.data,
		link: `/blog/${post.slug}/`,
	}))
	return rss({
		title: SITE.title,
		description: SITE.description,
		site: Astro.site!,
		items: items,
	})
}
