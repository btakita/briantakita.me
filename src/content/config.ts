import { Post__schema } from '@btakita/domain--server--blog'
import { defineCollection } from 'astro:content'
const posts = defineCollection({
	// Type-check frontmatter using a schema
	schema: Post__schema,
})
export const collections = { posts }
