#!/usr/bin/node
import { spawn } from 'child_process'
import { readFile, writeFile } from 'fs/promises'
const build = spawn('astro', ['build'], {
	cwd: '.',
	env: process.env,
	stdio: ['pipe', process.stdout, process.stderr]
})
await new Promise(res=>{
	build.on('close', code=>{
		if (code) {
			process.exit(code)
		}
		res(0)
	})
})
const vercel_output_config_json_path = './.vercel/output/config.json'
const config_json = await readFile(vercel_output_config_json_path)
	.then(buf=>buf.toString())
const config = JSON.parse(config_json)
const { routes } = config
const handle_route_idx = routes.findIndex(route=>route.handle)
routes.splice(handle_route_idx, 1, {
	src: '/.*',
	dest: 'static'
})
await writeFile(vercel_output_config_json_path, JSON.stringify(config, null, 2))
