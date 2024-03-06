import { is_entry_file_ } from 'ctx-core/fs'
import { isNumber } from 'ctx-core/number'
import { readdir, writeFile } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
export async function index__generate() {
	const dir = dirname(new URL(import.meta.url).pathname)
	await writeFile(join(dir, 'index.ts'),
		`
import { type post_mod_T } from '@rappstack/domain--any--blog/post'
export const post_mod_a1:post_mod_T[] = await Promise.all([
${await import_line_a_ts_()}
])
`.trim() + '\n')
	function import_line_a_ts_() {
		return (
			readdir(join(dir, 'content'))
				.then(file_a=>
					file_a
						.filter(file=>isNumber(file[0]))
						.map(file=>
							`\timport('./content/${basename(file, '.ts')}.js'),`)
						.join('\n'))
		)
	}
}
if (is_entry_file_(import.meta.url, process.argv[1])) {
	index__generate()
		.then(()=>process.exit(0))
		.catch(err=>{
			console.error(err)
			process.exit(1)
		})
}
