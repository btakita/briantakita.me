import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { request_url__origin_ } from '@rappstack/domain--server/request'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { md__raw_ } from '@rappstack/ui--any/md'
import { nl } from '@rappstack/ui--any/string'
import { type request_ctx_T } from 'rebuildjs/server'
import Creation_of_Adam_jpg from '../../public/assets/images/1200px-Creation_of_Adam.jpg'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2015-01-03T11:45Z',
	title: `Do Not Worry, Everything Exists`,
	slug: 'everything-exists',
	hero_image: new URL(Creation_of_Adam_jpg, request_url__origin_(ctx)).href,
	tag_a1: [
		'philosophy',
		'worldview',
		'existence',
	],
	description:
		`Does God exist? Surely, Santa Claus & Unicorns do not exist. Yet we are talking about them. If they don't exist, why & how am I talking about them? Santa Claus & Unicorns do exist, as fictional characters; more on God later. Everything Exists. The concept conceptually exists. It may also physically exist; like the men who name themselves Santa Claus.`
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>''
+ md__raw_({ ctx }, `
Does God exist? Surely, Santa Claus & Unicorns do not exist. Yet we are talking about them. If they don't exist, why & how am I talking about them?

Santa Claus & Unicorns do exist, as fictional characters; more on God later. Everything Exists. The concept conceptually exists. It may also physically exist; like the men who ${tb_a_({ href: 'http://www.huffingtonpost.com/2014/12/23/real-santas_n_6366974.html', nofollow: true }, 'name themselves Santa Claus')}. 

Surely this must be a cheat; Some sort of sleight of hand; Missing the point. However...
`.trim())
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	[`## It's All About the Context`, [
		`Words are fuzzy patterns. A word in different situations has a different meaning. A word has different meanings between speaker & listener.`,
		nl,
		`Adding context gives precise meaning. An atheist can accurately say; God does not exist in my belief system or I don't believe in God; denying the need for God, yet having compassion for someone else's belief system. Religious believers can have compassion for all nonbelievers, as there are many interdependent tribes on Earth.`,]],
	[`## Everything is Governed by Nature`, [
		`The nature of Physical & Conceptual Existence follows behaviour that we can study using the arts (spirituality included) & sciences. Supernatural phenomena is caused by unknown Natural Law.`,]],
	[`## The Nature of God is Defined by each Person`, [
		`God is a concept, who's meaning is as individual as the person who hold it.`,
		nl,
		`God, to me, is Existence (conceptual & physical). Every person has a belief system. The simple abstraction of the belief system is the God, even if we don't call it God.`,
		nl,
		`God involves creation. Our feelings, thoughts, & actions create God; We can create God the jealous, wrathful, & cruel; We can create God the loving, compassionate, & nurturing.`,]],
	[`## The Need for Exoteric Religion?`, [
		`A person's belief system influences the person's thoughts, actions, & interpretations.`,
		nl,
		`Some ${tb_a_({ href: 'http://en.wikipedia.org/wiki/Exoteric', nofollow: true }, 'Exoteric Religions')} impose a belief system composed of some outdated traditions. There are unifying ethics that create harmony with self & others, however these ethics can be taught without Exoteric Religion.`,]],
	[`## Our Nature & Calling`, [
		`Having compassion for ourselves & each other connects us in harmonious interdependence. A symbiotic spiral of evolving intelligence, love, dignity.`,
		nl,
		`When we love, respect, & have compassion for ourselves & each other, we live.`,]],
])
// @formatter:on
