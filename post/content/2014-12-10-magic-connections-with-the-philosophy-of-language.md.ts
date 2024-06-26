import {
	behavior_driven_development__tb_a_,
	domain_driven_design__tb_a_,
	domain_specific_language__tb_a_,
	existence__tb_a_,
	pivotal_labs__tb_a_,
	rspec__tb_a_
} from '@btakita/ui--server--briantakita/anchor'
import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { request_url__origin_ } from '@rappstack/domain--server/request'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { md__raw_ } from '@rappstack/ui--any/md'
import { nl } from '@rappstack/ui--any/string'
import { type request_ctx_T } from 'rebuildjs/server'
import unicorn_jpg from '../../public/assets/images/unicorn.jpg'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2014-12-10T07:15:00Z',
	title: `Magic Connections with the Philosophy of Language`,
	slug: `magic-connections-with-the-philosophy-of-language`,
	hero_image: new URL(unicorn_jpg, request_url__origin_(ctx)).href,
	tag_a1: [
		'philosophy',
		'ontology',
		'language',
	],
	description:
		`Magic exists! Well, if you have listened to me lately, you will hear that everything exists (including fiction). When everything exists, we can recapture the entirety of language from those who impose restrictions on Existence. We have all heard "that does not exist". We can now say, "that" does exist & "that" is a useful concept.`,
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>''
+ md__raw_({ ctx }, `
${tb_a_({ href: 'https://github.com/btakita/philosophy/blob/master/src/magic.md' }, `Magic`)} exists! Well,if you have listened to me lately, you will hear that ${tb_a_({ href: 'https://github.com/btakita/philosophy/blob/master/src/exist.md' }, `everything exists (including fiction)`)}. When everything exists, we can recapture the entirety of language from those who impose restrictions on ${existence__tb_a_()}. We have all heard "that does not exist". We can now say, "that" does exist & "that" is a useful concept.

I'm happy to see my own homespun approach have a strong connection to an established Philosophical branch. The ${tb_a_({ href: 'http://en.wikipedia.org/wiki/Philosophy_of_language', nofollow: true }, 'Philosophy of Language (Wikipedia)')} brings concepts together into a system of logic to yield magical & insightful connections in Existence.
`.trim())
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	[`# My Story with Magic`, [
		`I've always been a daydreaming, fantasy imagining, professing, believer in magic. It's a fascination that I've stubbornly cultivated from childhood, in spite of attempts from others to change my view. I felt judgement & a bit crazy when I spoke, so I ended up not speaking much. I had a strong emotional belief without the rational backing.`,
		nl,
		`In high school, I had two notable role models who helped set direction to my life. My brother in law who		founded a technology company & my physics teacher. It wasn't the facts that they taught. It was the enthusiastic approach that seemingly unrelated concepts can be connected, yielding novelty & innovation.`,
		nl,
		`I explored ${
			tb_a_({ href: 'http://en.wikipedia.org/wiki/Engineering_physics', nofollow: true }, 'Engineering Physics')
		} in college & found I had a natural aptitude for software development. Ever since I started following the path of a technologist, I've wanted to explore the connections between technology & magic.`,
		nl,
		`My practice started with agile software development as a consultant for startups in San Francisco with Pivotal		Computer Systems (now ${pivotal_labs__tb_a_()}). There was a new technique called ${domain_driven_design__tb_a_()} that was making it's way around. ${domain_specific_language__tb_a_(`Domain Specific Languages (DSLs)`)} became the rage. I became an early		contributor to a ${behavior_driven_development__tb_a_()} framework called ${rspec__tb_a_()}. The premise behind rspec was to make automated testing software look more like the English language.`,
		nl,
		`Domain Driven Design states coherence is facilitated when members of an organization speak the same domain language. That means that when everybody in the business uses the same terminology, better overall	communication, better overall thought, & more innovative connections. The necessary precision is determined by what the concept is being used for (i.e. a sales presentation or software implementation).`,
		nl,
		`I also grew up with an interest in ${tb_a_({ href: 'https://github.com/btakita/philosophy/blob/master/src/spirituality.md' }, 'spirituality')} & the nature of Existence. I wanted to unify everything in Existence. What if we use Domain Driven Design principles where the Domain is Existence? Magic!`,]],
	[`# Culture & Magic`, [
		`Culture has evolved a definition of ${
			tb_a_({ href: 'https://www.thefreedictionary.com/magic', nofollow: true }, `Magic (thefreedictionary.com)`)
		}.`,
		nl,
		`> The art that purports to control or forecast natural events, effects, or forces by invoking the supernatural.`,
		nl,
		`Where ${
			tb_a_({ href: 'https://www.thefreedictionary.com/supernatural', nofollow: true }, `Supernatural (thefreedictionary.com)`)
		} means.`,
		nl,
		`> Of or relating to existence outside the natural world.`,]],
	[`# Magic of Expanding Consciousness`, [
		`The cultural definition is accurate. However, let's add the qualification that supernatural is defined from the perspective of the ${tb_a_({ href: 'https://github.com/btakita/philosophy/blob/master/src/exist.md' }, 'entity')} that is perceiving the event. That means prehistoric humans will see the thing that creates lightning as being supernatural, because prehistoric humans did not understand weather patterns. Modern humans don't see the thing that creates lightning as supernatural because there is a natural scientific explanation.`,
		nl,
		`Taking perspective into account; Magic is the phenomenon that cannot be accurately and/or precisely explained by the context of the entity perceiving the phenomenon.`,
		nl,
		`This means magic is the awareness & abstraction of the unexplained phenomenon. Magic is tied to Expanding Consciousness, as we attempt to understand the phenomenon. That does not mean we can't enjoy magic. Magic is motivated by the mystery & wonder as we interact with the unexplained (and unexplainable).`,
		nl,
		`Even when we can explain the physical process, like the hormonal interactions involved with love, we still experience love as magic. After all, a being in love often does not focus on these chemical interactions.`,]],
	[`# Magic Connections with the Philosophy of Language`, [
		`Not having a formal training in Philosophy, it's been my pleasure to come across the Philosophy of Language. I've arrived at a similar approach from my life experience. However, it is great to see that there is a Philosophical tradition with a similar focus.`,
		nl,
		`It's quite magical that patterns in Existence repeat in many different Domains. It's a tragedy culture has separated many Domains in Existence. A notable schism was when rational materialistic science separated from esoteric spirituality.`,
		nl,
		`Any "ism" tends to restrict the adherent's scope on Existence, restricting the connections that entity has within Existence. This may rob the adherents of the "ism" the ability to utilize similar patterns in different domains, to make connections with adherents of other domains, and can ultimately lead to objectification of others.`,
		nl,
		`Language has a magical effect on entities. Language sets the conceptual scope of the entities that communicate with each other. Language also sets the conceptual scope of rational, symbolic logic. Language is spoken by the voice in our heads. Language influences the thoughts & context of the entities that listen to.`,
		nl,
		`Marketing entities understand the power of language & images. That's why Marketing departments & politicians spend hours picking the right name & terminology. That's why you see ads defining & redefining words for the audience. That's why some people are given labels, like "terrorist", "freedom fighter", "anarchist", "republican", "democrat", etc. These words affect the perceived identities of the people with the labels. These words make it easy to kill, to oppress, & to ignore.`,]],
	[`# What is Language?`, [
		`Language has often been thought of as a human trait.`,
		nl,
		`${tb_a_({ href: 'http://en.wikipedia.org/wiki/Language', nofollow: true }, 'Language (Wikipedia)')}`,
		nl,
		`> Language is the human ability to acquire and use complex systems of communication, and a language is any specific example of such a system.`,
		nl,
		`${tb_a_({ href: 'http://thefreedictionary.com/language', nofollow: true }, 'Language (thefreedictionary.com)')}`,
		nl,
		`> Communication of thoughts and feelings through a system of arbitrary signals, such as voice sounds, gestures, or written symbols.`,
		nl,
		`We can expand the scope of Language to be utilized by any entity signaling another entity. That means plants have Language (${
			tb_a_({ href: 'http://www.pbs.org/wnet/nature/what-plants-talk-about-video-full-episode/8243/', nofollow: true}, 'What Plants Talk About')
		}). Stars have Language. The Universe itself has Language. Concepts have Language.`,]],
	[`# Awareness of the Ecosystem of Language`, [
		`Language is an evolutionary ecosystem of the culture's mindshare & heartshare by those who propagate definitions & meaning. Language influences (even determines) how we, as a culture, act. We, as participating entities, have the power to be aware of & change the language. We can influence each other to become harmonious, loving, intelligent, peaceful, beautiful, playful, creative, magical.`,
		nl,
		`Language is also a tool of empowerment. Awareness of context & choice of words effectively shape your mental model & the model of those who listen to you. Language, in it's many forms, is a key tool that has been Expanding Consciousness of Life.`,
		nl,
		`Be aware! Expand consciousness! Peace & Love!`,]],
])
// @formatter:on
