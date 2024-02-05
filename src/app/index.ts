import { import_meta_env_ } from 'ctx-core/env'
import { Elysia } from 'elysia'
import { dirname, join, resolve } from 'path'
import { relement__use } from 'relementjs'
import { server__relement } from 'relementjs/server'
import { app_ctx, cwd__set, is_prod_, port__set, static_middleware_ } from 'relysjs/server'
export async function prebuild() {
	return new Elysia()
		.onError(({ error, request })=>{
			console.error(request.url, error)
		})
}
export default ()=>{
	config__init()
	return static_middleware_(
		is_prod_(app_ctx)
			? {
				headers_: ()=>({
					'Cache-Control': 'max-age=2592000, public'
				})
			}
			: {})
}
export function config__init() {
	const port = parseInt(import_meta_env_().BRIANTAKITA_PORT) || 4100
	port__set(app_ctx, port)
	cwd__set(app_ctx, resolve(join(dirname(new URL(import.meta.url).pathname), '../..')))
	relement__use(server__relement)
}
