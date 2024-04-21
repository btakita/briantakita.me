import { ado_net__tb_a_, generic_query_analyzer__tb_a_ } from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import { blog_post__top_note__p_ } from '@rappstack/ui--server--blog/post'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2004-11-05T07:54Z',
	title: `Generic Query Analyzer 0.2.1 released`,
	slug: 'generic-query-analyzer-0-2-1-released',
	tag_a1: [
		'db',
		'sql',
		'open-source',
		'dotnet'
	],
	description:
		`Follow release of the Generic Query Analyzer. An icon was added & a little-used dll was removed.`
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_(ctx, `
${blog_post__top_note__p_(`Originally posted on `, tb_a_({ href: 'https://web.archive.org/web/20130407190313/http://geekswithblogs.net/btakita/archive/2004/11/05/14411.aspx', nofollow: true }, 'geekswithblogs.net'))}

The Generic Query Analyzer is a Database Independent Query Analyzer that uses ${ado_net__tb_a_('ADO.NET (OLEDB)')}  technology. This Query Analyzer is run off the .NET 2.0 platform on Windows.

${generic_query_analyzer__tb_a_()}

This release…

- Adds an icon for the Generic Query Analyzer
- Is refactored to remove a little used dll

I got some positive feedback on it so far. Let me know if you have any suggestions, requests or find some bugs. Right now, the GQA implementation is well factored so its in a good position to move forward.
`.trim())
// @formatter:on
