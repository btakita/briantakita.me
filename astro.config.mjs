import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
// https://astro.build/config
export default defineConfig({
	site: 'https://briantakita.me',
	integrations: [mdx(), sitemap(), tailwind()],
	server: {
		host: '0.0.0.0', // heroku requires 0.0.0.0
		port: parseInt(import.meta.env.BRIANTAKITAME_PORT)
	},
})
