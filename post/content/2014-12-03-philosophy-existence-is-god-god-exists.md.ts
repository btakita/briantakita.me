import {
	abstraction__tb_a_,
	domain_specific_language__tb_a_,
	existence__tb_a_,
	god__tb_a_,
	scope__tb_a_,
	universal_set__tb_a_
} from '@btakita/ui--server--briantakita/anchor'
import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { md__raw_ } from '@rappstack/ui--any/md'
import { nl } from '@rappstack/ui--any/string'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2014-12-03T12:00:00Z',
	slug: 'philosophy-existence-is-god-god-exists',
	title: 'Philosophy — Existence is God & God Exists',
	tag_a1: ['philosophy'],
	description:
		`I’m happy to utilize, and prove, God’s existence. Since Existence is God and Existence, well exists, God Exists in this Philosophy. It’s about how God & Existence is defined.`,
	canonical_url:
		'https://medium.com/@briantakita/philosophy-existence-is-god-god-exists-b2ec35ea39d2',
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>''
+ md__raw_({ ctx }, `
Philosophies are conceptual models. Conceptual models have a ${domain_specific_language__tb_a_()}. If we expand	the scope of certain definitions, we have the ability to expand consciousness. If we are able to make more	associations between concepts, consciousness expands.

I’m evolving a philosophy that has it’s own domain language. The domain language is similar to their common cultural definitions, however, I expand the scope of these words. Expanding the scope of these words enables conceptual patterns to be reused across different scopes in Existence.
`.trim())
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	[`# A tool to explore ${existence__tb_a_()}`, [
		`My motive is to build a tool that can use everyday terminology to explore the scope of Existence. The domain is Existence & the task is to create a domain language to explore Existence.`,
		nl,
		`Since the meanings of words are subjective to the entity’s domain knowledge of & experience with the abstraction, I feel justified in defining the words to match the domain of Existence.`]],
	[`# ${abstraction__tb_a_()}, ${scope__tb_a_()}, Zooming In/Out`, [
		`We humans can hold a limited amount of information in our head. If we are to focus on all Existence, then the abstractions are broad. If we wish to focus on a particular abstraction, we can zoom in on that abstraction. When zooming in, the scope is smaller than Existence & context is applied to the new domain model. This allows words to contextually apply to the scope. The words still have a similar meaning in the zoomed in scope as in the scope of Existence.`,
		nl,
		`For example, if we wish to focus on the Physical Universe, Physical Existence means an object exists in the physical world. Abstract thoughts are not in Physical Existence, so an abstract thought does not physically exist.`,]],
	[`# ${god__tb_a_()} Exists`, [
		`I’m happy to utilize, and prove, God’s existence. Since Existence is God and Existence, well exists, God Exists in this Philosophy. It’s about how God & Existence is defined.`,
		nl,
		`While there has been some critique on Ann Rand’s statement “Existence Exists”, these critiques are based on the definition of “exists” being scoped to mean “physical existence”.`,
		nl,
		`The “Existence is God” Philosophy defines existence as “Everything that ‘is’, or more simply, everything" or the ${universal_set__tb_a_()} of everything. That includes all thoughts ever thought, all possible concepts, including the notion of Existence being everything. Thus Existence Exists. Everything (even fiction) exists. Thus God Exists.`,
		nl,
		`I enjoy speaking to atheists because ideas from atheism led to me expanding the scope of God. Also, atheists tend to be skeptical toward dogmas, which leads to further exploration. This exploration expands consciousness.`,]],
	[`# Exploration & Collaboration`, [
		`In our present culture, redefining words and the subject of the existence of God are controversial topics. These controversies and paradoxes are ripe for exploration & expanding consciousness.`,
		nl,
		`If you wish to explore some of these concepts with me, please contact me or leave a comment!`,]],
])
// @formatter:on
