import { md_c_ } from '@btakita/ui--any--blog/md'
import { tb_a_ } from '@btakita/ui--server--blog/anchor'
import { blog_post__top_note_p_ } from '@btakita/ui--server--blog/post'
import { to_pair_or_not_to_pair__comments_c_ } from '../to_pair_or_not_to_pair/index.js'
export const meta = {
	author: `Brian Takita`,
	pubDate: '2010-01-31T12:00Z',
	title: `To Pair or Not to Pair`,
	slug: 'to-pair-or-not-to-pair',
	tags: [
		'agile',
		'software development',
	],
	description:
		`Here at Honk, we have been transitioning away from pair programming. I do not think that this necessarily reflects badly on pair programming. We still do some pair programming. However, our current circumstances steered us away from pair programming being our primary development practice.`,
}
// language=md
// @formatter:off
export default ()=>md_c_(`
${blog_post__top_note_p_(`Originally posted on `, tb_a_({ href: 'https://web.archive.org/web/20120513132750/http://blog.honk.com/to-pair-or-not-to-pair/' }, 'blog.honk.com'))}

Here at Honk, we have been transitioning away from pair programming. I do not think that this necessarily reflects badly on pair programming. We still do some pair programming. However, our current circumstances steered us away from pair programming being our primary development practice.

Pair programming is a very powerful way to transfer and increase the skill of your developers. During my time at Pivotal Labs (and on the first few months at Honk), I have made leaps in my design skill, development speed, and bug reduction. I cannot think of a better way to transfer skill. It is easy to learn from someone when you are in the act of solving a problem.

Accelerated learning is something that cannot be overstated, and thus makes pair programming a very sustainable process in the right circumstances. You can also concentrate two minds on a single problem. Compared with soloing, you have half the tracks of development with more concentrated thought on each track of development.

However, we currently have a situation where we have few developers and many problems to solve. We simply would not have enough tracks of development, given the size of our current team. There are two solutions, hire talent or make due with your existing talent. Unfortunately, finding the right fit is challenging in an industry where there is not enough supply. So for now, we have to make due and try to get more done with the same number of developers.

Going back to primarily solo programming has been an interesting experience. I certainly feel less time pressure, and more empowered to focus on making better quality software. I think this has to do with my propensities, and the fact that there is nobody is there to prod me to take the quicker solution. I don’t mean this to be a value judgment, just a trade-off that has occurred.

A key practice is to keep communication open and share knowledge. Even though there is not the constant banter, you can still quickly and efficiently communicate with the rest of your team. For the most part, I feel that we have been successful at that.

Another practice is discipline is even more important. We no longer have our pair to make sure we are following good practices. That means, we need to keep ourselves in check. That means slower development on each track, but more tracks should mean we get more done. We must also be disciplined enough to recognize situations where some code can be controversial and ask for the help of a peer.

Integrating our work is also of the upmost importance. We still perform TDD and have a continuous integration server. We have verification via a smoke suite and manual QA to ensure that we release the correct software. We also practice shared code ownership, and try to communicate issues with code.

So in a sense, we have modified our system of software development to account for present realities. That is not to say that everything we are doing is correct, but if problems emerge, we can combat them. In the future, pair programming may be the best option, given different circumstances.

---

Comments *(copied from original post)*:

${to_pair_or_not_to_pair__comments_c_()}
`.trim())
// @formatter:on
