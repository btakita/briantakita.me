import { post_meta__validate } from '@btakita/domain--any--blog'
import { md__raw_ } from '@btakita/ui--any--blog/md'
import { tb_a_ } from '@btakita/ui--server--blog/anchor'
import { atb_briantakita_com_ } from '@btakita/ui--server--briantakita/anchor'
export const meta = post_meta__validate({
	author: `Brian Takita`,
	pub_date: '2013-09-05T05:07Z',
	title: `DIY SEO with BrandYourself.com`,
	slug: 'diy-seo-brandyourself',
	tag_a1: ['seo'],
	description: `Personal SEO branding with brandyourself.com.`,
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
The wonderful web makes it easy for someone to publish their thoughts and opinions, good and bad, true and false. If you find yourself at the wrong end of a post that shows up in your Google results, the implications can be very damaging. It ceases to be a matter of truth, but a matter of marketing.

Fortunately, you can take control over your name on the web, without having to spend thousands of dollars that online reputation repair firms charge.

${tb_a_({ href: 'http://brandyourself.com' }, 'Brandyourself.com')} makes it easy to inexpensively control your SEO destiny. Here is my ${tb_a_({ href: 'http://briantakita.brandyourself.com/' }, 'profile')}.

Their free plan has a limitation of setting up three links for the free plan, so I bought their "Premium	Membership" giving me unlimited links for $9 every 3 months. This should give me an initial bump. Since I just acquired (my now defunct site) ${atb_briantakita_com_()} I can transfer the links to my blog after the 3 months.

Now I sit back and wait for Google to index the results :-)
`.trim())
// @formatter:on
