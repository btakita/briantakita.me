import { post_meta__validate } from '@btakita/domain--any--blog'
import { md__raw_ } from '@btakita/ui--any--blog/md'
import { tb_a_ } from '@btakita/ui--server--blog/anchor'
import { blog_post__top_note_p_ } from '@btakita/ui--server--blog/post'
import { generic_query_analyzer__tb_a_ } from '@btakita/ui--server--briantakita/anchor'
export const meta = post_meta__validate({
	author: `Brian Takita`,
	pub_date: '2004-11-04T07:15Z',
	title: 'Generic Query Analyzer 0.1.1 released',
	slug: 'generic-query-analyzer-0-1-1-released',
	tag_a1: [
		'db',
		'sql',
		'open source',
		'dotnet'
	],
	description:
		`I developed a Query Analyzer that can Query any database that has an OleDb adapter. This means you can query an Excel spreadsheet or Access database.`
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
${blog_post__top_note_p_([`Originally posted on `, tb_a_({ href: 'https://web.archive.org/web/20060509022139/http://geekswithblogs.net/btakita/archive/2004/11/04/14347.aspx' }, 'geekswithblogs.net')])}

I developed a Query Analyzer that can Query any database that has an OleDb adapter. This means you can query an Excel spreadsheet or Access database.

It requires .NET 2.0.

Despite its version number, it is a beta release and works well.

You can get it on ${generic_query_analyzer__tb_a_('Sourceforge')}.
`.trim())
// @formatter:on
