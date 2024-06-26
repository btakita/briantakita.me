import { briantakita_com__tb_a_ } from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2013-09-05T05:07Z',
	title: `DIY SEO with BrandYourself.com`,
	slug: 'diy-seo-brandyourself',
	tag_a1: ['seo'],
	description: `Personal SEO branding with brandyourself.com.`,
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_({ ctx }, `
The wonderful web makes it easy for someone to publish their thoughts and opinions, good and bad, true and false. If you find yourself at the wrong end of a post that shows up in your Google results, the implications can be very damaging. It ceases to be a matter of truth, but a matter of marketing.

Fortunately, you can take control over your name on the web, without having to spend thousands of dollars that online reputation repair firms charge.

${tb_a_({ href: 'http://brandyourself.com', nofollow: true }, 'Brandyourself.com')} makes it easy to inexpensively control your SEO destiny. Here is my ${tb_a_({ href: 'http://briantakita.brandyourself.com/' }, 'profile')}.

Their free plan has a limitation of setting up three links for the free plan, so I bought their "Premium	Membership" giving me unlimited links for $9 every 3 months. This should give me an initial bump. Since I just acquired (my now defunct site) ${briantakita_com__tb_a_()} I can transfer the links to my blog after the 3 months.

Now I sit back and wait for Google to index the results :-)
`.trim())
// @formatter:on
