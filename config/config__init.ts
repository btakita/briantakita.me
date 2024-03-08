import { import_meta_env_ } from 'ctx-core/env'
import { relement__use } from 'relementjs'
import { server__relement } from 'relementjs/server'
import { app_ctx, cwd__set, port__set, src_path__set } from 'relysjs/server'
import {
	jsonld_AboutPage_,
	jsonld_ContactPage_,
	jsonld_Organization_,
	jsonld_Person_,
	jsonld_WebSite_
} from './jsonld.js'
export function config__init() {
	const port = parseInt(import_meta_env_().BRIANTAKITA_PORT) || 4100
	port__set(app_ctx, port)
	cwd__set(app_ctx, process.cwd())
	src_path__set(app_ctx, process.cwd())
	jsonld_Person_(app_ctx)
	jsonld_WebSite_(app_ctx)
	jsonld_Organization_(app_ctx)
	jsonld_AboutPage_(app_ctx)
	jsonld_ContactPage_(app_ctx)
	relement__use(server__relement)
}
