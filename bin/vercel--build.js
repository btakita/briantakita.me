#!/bin/env bun
import { readFile, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
const project_dir = join(dirname(process.argv[1]), '..')
const build = Bun.spawn(['astro', 'build'], {
	cwd: '.',
	env: process.env,
})
const text_decoder = new TextDecoder('UTF8')
if (build.stdout) {
	build.stdout.pipeTo(new WritableStream({
		write(chunk) {
			process.stdout.write(text_decoder.decode(chunk))
		}
	}))
}
if (build.stderr) {
	build.stderr.pipeTo(new WritableStream({
		write(chunk) {
			process.stderr.write(text_decoder.decode(chunk))
		}
	}))
}
const build__exitcode = await build.exited
if (build__exitcode) {
	process.exit(build__exitcode)
}
const vercel_output_config_json_path = `${project_dir}/.vercel/output/config.json`
const config_json = await readFile(vercel_output_config_json_path)
	.then(buf=>buf.toString())
const config = JSON.parse(config_json)
const { routes } = config
const astro_file_route = routes.find(route=>route.src === '^/_astro/(.*)$')
astro_file_route.src = '^/_astro/(?<path>.*)$'
astro_file_route.dest = 'static/_astro/$path'
delete astro_file_route.continue
const handle_route_idx = routes.findIndex(route=>route.handle)
routes.splice(handle_route_idx, 1, {
	"src": "/(?<path>.*)",
	"dest": "static/$path"
})
await writeFile(vercel_output_config_json_path, JSON.stringify(config, null, 2))
