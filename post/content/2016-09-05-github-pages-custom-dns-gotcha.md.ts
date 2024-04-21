import { briantakita_com__tb_a_, github_pages__tb_a_ } from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2016-09-05T07:53Z',
	title: `Github Pages Custom DNS Gotcha`,
	slug: 'github-pages-custom-dns-gotcha',
	tag_a1: [
		'github pages',
		'dns',
		'website',
	],
	description: `Fixing a DNS-related 404 error with Github Pages.`
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_(ctx, `
I set up ${briantakita_com__tb_a_()} using ${github_pages__tb_a_()} to btakita.github.io.

To set up the DNS, I followed the ${tb_a_({ href: 'https://help.github.com/articles/setting-up-a-custom-domain-with-pages', nofollow: true }, 'official instructions')} and ${tb_a_({ href: 'http://davidensinger.com/2013/03/setting-the-dns-for-github-pages-on-namecheap/', nofollow: true }, 'github pages with namecheap')}.

I created the CNAME file with:

\`\`\`sh
briantakita.com
\`\`\`

and set up the DNS on Namecheap.

However, I got the 404 page on github.

So I ran

\`\`\`sh
$ dig briantakita.com +nostats +nocomments +nocmd

; <<>> DiG 9.8.4-rpz2+rl005.12-P1 <<>> briantakita.com +nostats +nocomments +nocmd
;; global options: +cmd
;briantakita.com.       IN  A
briantakita.com.  1627  IN  A 204.232.175.78

$ dig www.briantakita.com +nostats +nocomments +nocmd

; <<>> DiG 9.8.4-rpz2+rl005.12-P1 <<>> www.briantakita.com +nostats +nocomments +nocmd
;; global options: +cmd
;www.briantakita.com.       IN  A
www.briantakita.com.  1800  IN  CNAME	btakita.github.io.
btakita.github.io.    2163  IN  CNAME	github.map.fastly.net.
github.map.fastly.net.  29  IN  A	199.27.77.133
\`\`\`

What's this github.map.fastly.net? It looks like it related to github pages routing.

Anyways, it remained for a few minutes and then went away.

Some likely culprits are browser cache, some sort of propagation time in the Github platform, or something else entirely.

I don't think it was a browser cache because this was the first time I visited briantakita.com being routed to github pages. That leaves it being a propagation time issue or something else. While I believe it was propagation time, I'm not sure.

I also am just going to move on and leave it at that. Please comment if you run into the same issue or if you can confirm the issue.
`.trim())
// @formatter:on
