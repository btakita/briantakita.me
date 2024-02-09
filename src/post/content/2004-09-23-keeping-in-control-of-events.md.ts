import { post_meta__validate } from '@rappstack/domain--any--blog/post'
import { md__raw_ } from '@rappstack/ui--any--blog/md'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { blog_post__top_note__p_ } from '@rappstack/ui--server--blog/post'
export const meta_ = ()=>post_meta__validate({
	author: `Brian Takita`,
	pub_date: '2004-09-23T10:27:00Z',
	title: `Keeping in Control of Events`,
	slug: 'keeping-in-control-of-events',
	tag_a1: ['programming', 'dotnet'],
	description:
		`At work, I'm having an issue with losing control over events in my code. One big issue I'm having is recursion in the \`DataRow.RowChanged\` event.`
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
${blog_post__top_note__p_(`Originally posted on `, tb_a_({ href: 'https://web.archive.org/web/20130407190636/http://geekswithblogs.net/btakita/archive/2004/09/23/11571.aspx' }, 'geekswithblogs.net'))}

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
