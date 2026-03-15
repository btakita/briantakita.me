import './hljs.css'
import { app_marked__set } from '@rappstack/ui--server/md'
import { import_meta_env_ } from 'ctx-core/env'
import hljs from 'highlight.js'
import cs from 'highlight.js/lib/languages/csharp'
import js from 'highlight.js/lib/languages/javascript'
import sh from 'highlight.js/lib/languages/shell'
import ts from 'highlight.js/lib/languages/typescript'
import { Marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { markedHighlight } from 'marked-highlight'
import { relement__use } from 'relementjs'
import { server__relement } from 'relementjs/server'
import { app_ctx, cwd__set, port__set, src_path__set } from 'rhonojs/server'
export function config__init() {
	const port = parseInt(import_meta_env_().BRIANTAKITA_PORT) || 4100
	port__set(app_ctx, port)
	cwd__set(app_ctx, process.cwd())
	src_path__set(app_ctx, process.cwd())
	marked__init()
	relement__use(server__relement)
}
function marked__init() {
	hljs.registerLanguage('cs', cs)
	hljs.registerLanguage('js', js)
	hljs.registerLanguage('sh', sh)
	hljs.registerLanguage('shell', sh)
	hljs.registerLanguage('ts', ts)
	const marked = new Marked(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code, lang, info) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext'
				return hljs.highlight(code, { language }).value
			}
		}))
	marked.use(gfmHeadingId())
	marked.use({
		renderer: {
			link({ href, title, tokens }) {
				const text = this.parser.parseInline(tokens)
				const titleAttr = title ? ` title="${title}"` : ''
				if (href && /^https?:\/\//.test(href) && !href.includes('briantakita.me')) {
					return `<a href="${href}"${titleAttr} target="_blank" rel="noopener">${text}</a>`
				}
				return `<a href="${href}"${titleAttr}>${text}</a>`
			}
		}
	})
	app_marked__set(app_ctx, marked)
}
