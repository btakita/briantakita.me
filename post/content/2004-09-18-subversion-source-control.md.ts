import {
	apache__tb_a_,
	cvs_scm__tb_a_,
	ms_source_safe__tb_a_,
	subversion__tb_a_,
	tortoisesvn__tb_a_,
	vault_scm__tb_a_
} from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--any--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import { blog_post__top_note__p_ } from '@rappstack/ui--server--blog/post'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2004-09-18T21:31:00Z',
	title: `Subversion Source Control`,
	slug: 'subversion-source-control',
	tag_a1: ['version control', 'software development'],
	description:
		`I really like Subversion because is it is fast, lightweight, and, when coupled with Tortoise, easy to use, administer, and set up.`
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
${blog_post__top_note__p_(`Originally posted on `, tb_a_({ href: 'https://web.archive.org/web/20051217083500/http://geekswithblogs.net/btakita/archive/2004/09/18/11347.aspx', nofollow: true }, 'geekswithblogs.net'))}

I am very impressed with ${subversion__tb_a_('Subversion Source Control')}.

I've used ${ms_source_safe__tb_a_()}, ${vault_scm__tb_a_()}, ${cvs_scm__tb_a_()} but none of them matched my needs.

I like Subversion because it is fast, lightweight, and, when coupled with ${tortoisesvn__tb_a_()}, easy to use, administer, and set up. Commits are as easy as going to Windows Explorer, select the folders and files to commit > right click > select Commit. I dont need to integrate the source control with Visual Studio, and suffer the performance hit and a more complicated development environment.

Branching, merging, rollbacks, and conflict resolution are easy. Subversion makes source control fun, rather than a chore like the other tools I used before.

Now, I'm version controlling items that I edit, including my blog posts and articles.

Subversion can be run on a desktop, file share, or as a web service. The web service interface for Subversion can be run off of its own svn server or ${apache__tb_a_()}. If you use the svn server on a Windows server, you may want to consider using ${tb_a_({ href: 'https://web.archive.org/web/20051217083500/http://dark.clansoft.dk/~mbn/svnservice/', nofollow: true }, 'SVNService')} to register the svn server as a Service.
`.trim())
// @formatter:off
