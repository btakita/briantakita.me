import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { md__raw_ } from '@rappstack/ui--any/md'
import { nl } from '@rappstack/ui--any/string'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2013-09-07T04:39:00.000Z',
	title: 'There is no privacy! Control your internet face',
	slug: 'no-privacy-control-your-internet-face',
	hero_image: `https://briantakita.files.wordpress.com/2013/09/4959060_750beab5a4.jpg`,
	tag_a1: [
		'privacy',
		'security',
	],
	description:
		`With all the revelations over how the NSA is snooping over your personal communications, companies storing and controlling your data, encryption backdoors and the fact that it's always crackable, one thing is becoming clear.`,
	canonical_url:
		`https://briantakita.wordpress.com/2013/09/08/there-is-no-privacy-control-your-internet-face/`,
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>''
+ md__raw_({ ctx }, `
With all the revelations over how the NSA is snooping over your personal communications, companies storing and controlling your data, encryption backdoors and the fact that it's always crackable, one thing is becoming clear.
`.trim())
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	[`## There is no privacy on the internet`, [
		`Ok, maybe if you are good at covering your tracks, then there is a bit of privacy, but for most people doing most tasks, privacy is an illusion and has been for a while.`,
		nl,
		`It's similar to the physical world. The moment you step outside onto a public street, your privacy has ended. Everyone can see you. And it's ok...`,
		nl,
		`You want to be well groomed and wear clothes that represent what you want to show to the world. Portray yourself how you want to be viewed. It's the same thing with the internet.`,
		nl,
		`So take control over your image. Wear that awesome internet outfit that allows you to express yourself. Adopt your public internet persona. Welcome to a world which should be familiar.`,]],
])
// @formatter:on
