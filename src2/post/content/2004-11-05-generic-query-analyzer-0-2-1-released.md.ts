import { post_meta__validate } from '@btakita/domain--any--blog'
import { md__raw_ } from '@btakita/ui--any--blog/md'
import { tb_a_ } from '@btakita/ui--server--blog/anchor'
import { blog_post__top_note_p_ } from '@btakita/ui--server--blog/post'
import { atb_ado_net_, atb_generic_query_analyzer_ } from '@btakita/ui--server--briantakita/anchor'
export const meta = post_meta__validate({
	author: `Brian Takita`,
	pub_date: '2004-11-05T07:54Z',
	title: `Generic Query Analyzer 0.2.1 released`,
	slug: 'generic-query-analyzer-0-2-1-released',
	tag_a1: [
		'db',
		'sql',
		'open source',
		'dotnet'
	],
	description:
		`Follow release of the Generic Query Analyzer. An icon was added & a little-used dll was removed.`
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
${blog_post__top_note_p_(`Originally posted on `, tb_a_({ href: 'https://web.archive.org/web/20130407190313/http://geekswithblogs.net/btakita/archive/2004/11/05/14411.aspx' }, 'geekswithblogs.net'))}

The Generic Query Analyzer is a Database Independent Query Analyzer that uses ${atb_ado_net_('ADO.NET (OLEDB)')}  technology. This Query Analyzer is run off the .NET 2.0 platform on Windows.

${atb_generic_query_analyzer_()}

This release…

- Adds an icon for the Generic Query Analyzer
- Is refactored to remove a little used dll

I got some positive feedback on it so far. Let me know if you have any suggestions, requests or find some bugs. Right now, the GQA implementation is well factored so its in a good position to move forward.
`.trim())
// @formatter:on
