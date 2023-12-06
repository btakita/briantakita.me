import { import_meta_env_ } from '@ctx-core/env'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
// https://astro.build/config
export default defineConfig({
	site: 'https://briantakita.me',
	output: 'hybrid',
	adapter: vercel(),
	integrations: [mdx(), sitemap(), tailwind()],
	...(import_meta_env_().BRIANTAKITAME_PORT ? {
		server: {
			host: '0.0.0.0', // heroku requires 0.0.0.0
			port: parseInt(import_meta_env_().BRIANTAKITAME_PORT)
		}
	} : {}),
})
