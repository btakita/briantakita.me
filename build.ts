import { preprocess } from '@ctx-core/preprocess'
import { rebuild_tailwind_plugin_ } from '@rebuildjs/tailwindcss'
import cssnano from 'cssnano'
import { MAX_INT32 } from 'ctx-core/number'
import { import_meta_env_ } from 'ctx-core/env'
import { is_entry_file_ } from 'ctx-core/fs'
import { type Plugin } from 'esbuild'
import { esmcss_esbuild_plugin_ } from 'esmcss'
import yaml from 'js-yaml'
import { readdir, readFile } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
import {
	type rhonojs__build_config_T,
	rhonojs__ready__wait,
	rhonojs_browser__build,
	rhonojs_server__build, run
} from 'rhonojs/server'
import { config__init } from './config/index.js'
if (is_entry_file_(import.meta.url, process.argv[1])) {
	build({
		rebuildjs: { watch: false },
		rhonojs: { app__start: false }
	}).then(()=>process.exit(0))
		.catch(err=>{
			console.error(err)
			process.exit(1)
		})
}
export async function build(config?:rhonojs__build_config_T) {
	config__init()
	const esmcss_esbuild_plugin = esmcss_esbuild_plugin_()
	const rebuild_tailwind_plugin = rebuild_tailwind_plugin_({
		postcss_plugin_a1_: tailwindcss_plugin=>[
			tailwindcss_plugin,
			cssnano({ preset: 'default' })
		],
	})
	const preprocess_plugin = preprocess_plugin_()
	const json_esbuild_plugin = json_esbuild_plugin_()
	const md_esbuild_plugin = md_esbuild_plugin_()
	await Promise.all([
		run(async ()=>{
			try {
				return rhonojs_browser__build({
					...config ?? {},
					treeShaking: true,
					plugins: [
						esmcss_esbuild_plugin,
						rebuild_tailwind_plugin,
						preprocess_plugin,
						json_esbuild_plugin,
						md_esbuild_plugin,
					],
				})
			} finally {
				console.info('rhonojs_browser__build|done')
			}
		}),
		run(async ()=>{
			try {
				return rhonojs_server__build({
					...config ?? {},
					target: 'es2022',
					external: await server_external_(),
					treeShaking: true,
					plugins: [
						esmcss_esbuild_plugin,
						rebuild_tailwind_plugin,
						preprocess_plugin,
						json_esbuild_plugin,
						md_esbuild_plugin,
					],
				})
			} finally {
				console.info('rhonojs_server__build|done')
			}
		}),
		rhonojs__ready__wait(MAX_INT32)
	])
}
async function server_external_() {
	return readdir(join(
		dirname(new URL(import.meta.url).pathname),
		'..',
		'..',
		'node_modules'
	)).then(file_a1=>[
		...file_a1
			.filter(file=>file !== '@btakita' && file !== '@rappstack')
			.map(file=>file[0] === '@' ? file + '/*' : file),
		'bun',
		'bun:*'
	])
}
function preprocess_plugin_():Plugin {
	return {
		name: 'hyop',
		setup(build) {
			if (import_meta_env_().NODE_ENV !== 'production') {
				build.onLoad({ filter: /(\/ctx-core\/?.*|\/hyop\/?.*)$/ }, async ({ path })=>{
					const source = await Bun.file(path).text()
					return {
						contents: preprocess(
							source,
							{ DEBUG: '1' },
							{ type: 'ts' }),
						loader: 'ts'
					}
				})
			}
		}
	}
}
export function json_esbuild_plugin_() {
	return <Plugin>{
		name: 'json',
		setup(build) {
			build.onLoad(
				{ filter: /\.json\.(js|ts)$/ },
				async (config)=>{
					const { path, suffix } = config
					const contents = await import(path + (suffix ?? '')).then(mod=>mod.default())
					return { contents, loader: 'json' }
				}
			)
		},
	}
}
export function md_esbuild_plugin_():Plugin {
	return {
		name: 'md',
		setup(build) {
			build.onLoad(
				{ filter: /\.md$/ },
				async (config)=>{
					const raw = await readFile(config.path, 'utf8')
					let body = raw
					let meta:Record<string, any> = {}
					if (raw.startsWith('---\n')) {
						const end = raw.indexOf('\n---\n', 4)
						if (end >= 0) {
							meta = (yaml.load(raw.substring(4, end)) as Record<string, any>) ?? {}
							body = raw.substring(end + 5)
						}
					}
					const fname = basename(config.path, '.md')
					const slug = meta.slug
						?? fname.replace(/^\d{4}-\d{2}-\d{2}-/, '')
					const pub_date = meta.date
						? (meta.date instanceof Date
							? meta.date.toISOString()
							: String(meta.date).includes('T')
								? String(meta.date)
								: String(meta.date) + 'T00:00:00Z')
						: new Date().toISOString()
					const contents = `
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { md__raw_ } from '@rappstack/ui--any/md'
export const meta_ = (ctx)=>post_meta__validate(ctx, ${JSON.stringify({
						pub_date,
						title: meta.title ?? slug,
						slug,
						description: meta.description ?? '',
						tags: meta.tags ?? ['other'],
						...(meta.hero_image && { hero_image: meta.hero_image }),
						...(meta.og_image && { og_image: meta.og_image }),
						...(meta.draft !== undefined && { draft: meta.draft }),
					})})
export default (ctx)=>md__raw_({ ctx }, ${JSON.stringify(body)})
`
					return { contents, loader: 'js' }
				}
			)
		},
	}
}
