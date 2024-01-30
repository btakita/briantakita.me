import { md_c_ } from '@btakita/ui--any--blog/md'
import { tb_a_ } from '@btakita/ui--server--blog/anchor'
import { blog_post__top_note_p_ } from '@btakita/ui--server--blog/post'
export const meta = {
	author: `Brian Takita`,
	pubDate: '2004-09-23T10:27:00Z',
	title: `Keeping in Control of Events`,
	slug: 'keeping-in-control-of-events',
	tags: ['programming', 'dotnet'],
	description:
		`At work, I'm having an issue with losing control over events in my code. One big issue I'm having is recursion in the \`DataRow.RowChanged\` event.`
}
// @formatter:off
// language=md
export default ()=>md_c_(`
${blog_post__top_note_p_(`Originally posted on `, tb_a_({ href: 'https://web.archive.org/web/20130407190636/http://geekswithblogs.net/btakita/archive/2004/09/23/11571.aspx' }, 'geekswithblogs.net'))}

At work, I'm having an issue with losing control over events in my code. One big issue I'm having is recursion inthe \`DataRow.RowChanged\` event.

In this case, I'm trying to update the database, during every whenever \`e.Action == DataRowAction.Changed\`. This alsomeans having a call to \`DataRow.AcceptChanges()\` which raises another \`DataRowAction.Changed\`. I also have instanceswhen \`e.Action == DataRowAction.Changed\` but \`DataRow.RowState == DataRowState.Unchanged\`.

Some thoughts I came up with to try to combat this madness is to...

- Lock the object that fired the event
- Check if the object state matches the event state. If not, throw an exception.
- Implement an event counter.
- Unit test the event count.

What kinds of things do all of you do to keep events under control?
`.trim())
// @formatter:on
