import { redirect_response__new } from '@btakita/domain--server/response'
import { import_meta_env_ } from 'ctx-core/env'
import { is_entry_file_ } from 'ctx-core/fs'
import { Elysia } from 'elysia'
import { dirname, join, resolve } from 'path'
import { relement__use } from 'relementjs'
import { server__relement } from 'relementjs/server'
import {
	app__start as _app__start,
	app_ctx,
	compression_middleware_,
	cwd__set,
	is_prod_,
	port__set,
	static_middleware_
} from 'relysjs/server'
export async function app__start() {
	config__init()
	const app = new Elysia()
		.use(await static_middleware_(
			is_prod_(app_ctx)
				? {
					headers_: ()=>({
						'Cache-Control': 'max-age=2592000, public'
					})
				}
				: {}))
		.use(compression_middleware_())
		.onError(({ error, request })=>{
			console.error(request.url, error)
		})
	return _app__start(app)
}
export default app__start
export function config__init() {
	const port = parseInt(import_meta_env_().BRIANTAKITA_PORT) || 4100
	port__set(app_ctx, port)
	cwd__set(app_ctx, resolve(join(dirname(new URL(import.meta.url).pathname), '../..')))
	relement__use(server__relement)
}
if (is_entry_file_(import.meta.url, process.argv[1])) {
	app__start()
}
