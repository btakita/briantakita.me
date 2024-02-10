import { isNumber } from 'ctx-core/number'
import { readdir, writeFile } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
const dir = dirname(new URL(import.meta.url).pathname)
await writeFile(join(dir, 'index.ts'),
	`
export const post_mod_a1 = await Promise.all([
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
