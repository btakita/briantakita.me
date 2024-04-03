import { post_meta__validate } from '@rappstack/domain--any--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import { footnote__sup_ } from '@rappstack/ui--server--blog/footnote'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2017-06-11T11:00Z',
	title: `When We become a Muse to Our Tools`,
	slug: 'when-we-become-a-muse-to-our-tools',
	tag_a1: [
		'tools',
		'technology',
	],
	description: `What happens when we become a muse to our tools?`
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_(`
What happens when we become a muse to our tools?

When YouTube suggests videos that cater to your proclivities, what you see in your feed will be a reflection on your conscious attention domain.

Would the nature of modern conscious enlightenment be a sort of leveling-up administered by machine learning algorithms?

Would we be better off if we consciously create & choose our tools? When would it make sense to take what is easily given with all the consequences? When would it make sense to create a tool that purely fulfills a need without unwanted attachments?

Some "it depends" questions to consider&hellip;

This post was inspired by ${tb_a_({ href: 'https://www.youtube.com/watch?v=L4IAwk1G5ts', nofollow: true }, 'Alan Watts')}${footnote__sup_({ ctx, id: 'alan-watts-thinking-too-much-illusion' }, 'Alan Watts Too much Thinking will throw you into Illusion')}.
`.trim())
// @formatter:on
