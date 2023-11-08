import rss from '@astrojs/rss'
import type { Post } from '@btakita/domain--all--blog'
import { sorted__posts__new } from '@btakita/domain--server--blog'
import { SITE } from '@config'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
export async function GET(Astro:APIContext) {
	const posts = sorted__posts__new(await getCollection('posts') as Post[])
	const items = posts.map(post=>({
		...post.data,
		link: `/posts/${post.slug}/`,
	}))
	return rss({
		title: SITE.title,
		description: SITE.description,
		site: Astro.site!,
		items: items,
	})
}
