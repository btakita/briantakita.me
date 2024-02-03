import { rebuild_tailwind_plugin_, rebuild_tailwind_plugin__ready } from '@rebuildjs/tailwindcss'
import { is_entry_file_ } from 'ctx-core/fs'
import { esmcss_esbuild_plugin_ } from 'esmcss'
import {
	type relysjs__build_config_T,
	relysjs__ready,
	relysjs_browser__build,
	relysjs_server__build
} from 'relysjs/server'
import tailwind_config from '../tailwind.config.js'
import { config__init } from './app/index.js'
export async function build(config?:relysjs__build_config_T) {
	config__init()
	const rebuild_tailwind_plugin = rebuild_tailwind_plugin_(
		tailwind_config)
	await relysjs_browser__build({
		...config ?? {},
		plugins: [rebuild_tailwind_plugin],
	})
	await relysjs_server__build({
		...config ?? {},
		target: 'es2022',
		external: ['/assets/*', 'relementjs', 'elysia-compression'],
		plugins: [
			esmcss_esbuild_plugin_(),
			rebuild_tailwind_plugin,
		],
	})
	await relysjs__ready()
	await rebuild_tailwind_plugin__ready()
}
if (is_entry_file_(import.meta.url, process.argv[1])) {
	build({
		rebuildjs: { watch: false },
		relysjs: { app__start: false }
	}).then(()=>process.exit(0))
		.catch(err=>{
			console.error(err)
			process.exit(1)
		})
}
