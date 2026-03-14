import { is_entry_file_ } from 'ctx-core/fs'
import { isNumber } from 'ctx-core/number'
import yaml from 'js-yaml'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
export async function index__generate() {
	const dir = dirname(new URL(import.meta.url).pathname)
	const content_dir = join(dir, 'content')
	const file_a = await readdir(content_dir)
	// Generate .md.js files for raw .md files
	for (const file of file_a) {
		if (!isNumber(file[0])) continue
		if (!file.endsWith('.md') || file.endsWith('.md.ts')) continue
		await md_js__generate(join(content_dir, file))
	}
	await writeFile(join(dir, 'index.ts'),
		`
import { type post_mod_T } from '@rappstack/domain--any--blog/post'
export const post_mod_a1:post_mod_T[] = await Promise.all([
${import_line_a_(file_a)}
])
`.trim() + '\n')
}
function import_line_a_(file_a:string[]) {
	return file_a
		.filter(file=>isNumber(file[0]))
		.map(file=>{
			if (file.endsWith('.md.ts'))
				return `\timport('./content/${basename(file, '.ts')}.js'),`
			if (file.endsWith('.md'))
				return `\timport('./content/${file}.js'),`
			return null
		})
		.filter(Boolean)
		.join('\n')
}
async function md_js__generate(md_path:string) {
	const raw = await readFile(md_path, 'utf8')
	let body = raw
	let meta:Record<string, any> = {}
	if (raw.startsWith('---\n')) {
		const end = raw.indexOf('\n---\n', 4)
		if (end >= 0) {
			meta = (yaml.load(raw.substring(4, end)) as Record<string, any>) ?? {}
			body = raw.substring(end + 5)
		}
	}
	const fname = basename(md_path, '.md')
	const slug = meta.slug
		?? fname.replace(/^\d{4}-\d{2}-\d{2}-/, '')
	const pub_date = meta.date
		? (meta.date instanceof Date
			? meta.date.toISOString()
			: String(meta.date).includes('T')
				? String(meta.date)
				: String(meta.date) + 'T00:00:00Z')
		: new Date().toISOString()
	const contents = `import { post_meta__validate } from '@rappstack/domain--server--blog/post'
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
	await writeFile(md_path + '.js', contents)
}
if (is_entry_file_(import.meta.url, process.argv[1])) {
	index__generate()
		.then(()=>process.exit(0))
		.catch(err=>{
			console.error(err)
			process.exit(1)
		})
}
