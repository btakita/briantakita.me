import { post_meta__validate } from '@btakita/domain--any--blog'
import { md__raw_ } from '@btakita/ui--any--blog/md'
import { tb_a_ } from '@btakita/ui--server--blog/anchor'
import { blog_post__top_note_p_ } from '@btakita/ui--server--blog/post'
import {
	atb_apache_,
	atb_cvs_scm_,
	atb_ms_source_safe_,
	atb_subversion_,
	atb_tortoisesvn_,
	atb_vault_scm_
} from '@btakita/ui--server--briantakita/anchor'
export const meta = post_meta__validate({
	author: `Brian Takita`,
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
${blog_post__top_note_p_(`Originally posted on `, tb_a_({ href: 'https://web.archive.org/web/20051217083500/http://geekswithblogs.net/btakita/archive/2004/09/18/11347.aspx' }, 'geekswithblogs.net'))}

I am very impressed with ${atb_subversion_('Subversion Source Control')}.

I've used ${atb_ms_source_safe_()}, ${atb_vault_scm_()}, ${atb_cvs_scm_()} but none of them matched my needs.

I like Subversion because it is fast, lightweight, and, when coupled with ${atb_tortoisesvn_()}, easy to use, administer, and set up. Commits are as easy as going to Windows Explorer, select the folders and files to commit > right click > select Commit. I dont need to integrate the source control with Visual Studio, and suffer the performance hit and a more complicated development environment.

Branching, merging, rollbacks, and conflict resolution are easy. Subversion makes source control fun, rather than a chore like the other tools I used before.

Now, I'm version controlling items that I edit, including my blog posts and articles.

Subversion can be run on a desktop, file share, or as a web service. The web service interface for Subversion can be run off of its own svn server or ${atb_apache_()}. If you use the svn server on a Windows server, you may want to consider using ${tb_a_({ href: 'https://web.archive.org/web/20051217083500/http://dark.clansoft.dk/~mbn/svnservice/' }, 'SVNService')} to register the svn server as a Service.
`.trim())
// @formatter:off
