import { post_meta__validate } from '@rappstack/domain--any--blog/post'
import { md__raw_ } from '@rappstack/ui--any--blog/md'
import { tb_a_ } from '@rappstack/ui--any/anchor'
export const meta_ = ()=>post_meta__validate({
	author: `Brian Takita`,
	pub_date: '2007-10-18T02:16Z',
	title: `Sake for Gems Downloads List`,
	slug: 'sake-gem-downloads-list',
	tag_a1: [
		'ruby',
		'open source',
		'pivotal labs',
	],
	description:
		`Use the ruby sake tool to list the total downloads of ruby gems`,
	canonical_url: 'https://tanzu.vmware.com/content/blog/sake-for-gems-downloads-list'
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
I have a few gems on Rubyforge and I want to track how many of them were downloaded. I found Firefox's search tools lacking to find my gem rr.

To fix this issue, I made a sake task, named \`gems:downloads:list\`, that prints the gem downloads in text.

The source is on ${tb_a_({ href: 'http://pastie.caboo.se/79547' }, 'caboo.se')}.

You can install it by using:

\`\`\`sh
sudo gem install sake
sake -i http://pastie.caboo.se/79547.txt gems:downloads:list
sake gems:downloads:list | less
\`\`\`

This will give an output like:
\`\`\`
------------------------------------------------
|                              Gem | Downloads |
------------------------------------------------
|                            rails |   1194471 |
|                     activerecord |   1121778 |
|                       actionpack |   1054718 |
|                    activesupport |    990851 |
|                     actionmailer |    960759 |
|                 actionwebservice |    948640 |
|                             rake |    860824 |
|                            mysql |    593476 |
|                             fcgi |    230394 |
|                          mongrel |    220370 |
|                          daemons |    167443 |
|                          rmagick |    164537 |
|                       gem_plugin |    153505 |
|                         RedCloth |    147182 |
|                  rubygems-update |    119615 |
|                          net-ssh |    114369 |
|                     sqlite3-ruby |    105796 |
|                       fastthread |     95534 |
|            cgi_multipart_eof_fix |     95399 |
|                           needle |     87718 |
\`\`\`
Sake is way cool. It was just too easy to implement and deploy this. Have fun making your own sake tasks.
`.trim())
// @formatter:on
