import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { request_url__origin_ } from '@rappstack/domain--server/request'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { md__raw_ } from '@rappstack/ui--any/md'
import { nl } from '@rappstack/ui--any/string'
import { footnote__sup_ } from '@rappstack/ui--server--blog/footnote'
import { type request_ctx_T } from 'rebuildjs/server'
import encyclopedia_britannica_jpg from '../../public/assets/images/encyclopedia-britannica.jpg'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2014-12-19T05:50Z',
	title: `Why Say History When You Can Say Story?`,
	slug: 'why-say-history-when-you-can-say-story',
	hero_image: new URL(encyclopedia_britannica_jpg, request_url__origin_(ctx)).href,
	tag_a1: ['philosophy'],
	description:
		`In culture, we are taught to distinguish history & story as two separate concepts. Some (falsely) think of history being a masculine version of story (his story). However, history & story can be used interchangeably. Here's why.`,
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>''
+ md__raw_({ ctx }, `
${
	footnote__sup_({ ctx, id: 'encyclopedia-britannica-hero-image' }, [
	`From ${tb_a_({ href: 'http://www.flickr.com/photos/bostontx/4461314652/', nofollow: true })} - Licensed under Creative Commons`,])
}

In culture, we are taught to distinguish history & story as two separate concepts. Some (falsely) think of history being a masculine version of story (his story). However, history & story can be used interchangeably. Here's why.
`.trim())
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	[`# ${tb_a_({ href: 'https://github.com/btakita/philosophy/blob/master/src/story.md' }, 'Story')}`, [
		`> Story, a recounting of a sequence of events`,
		nl,
		`Our ${tb_a_({ href: 'https://github.com/btakita/philosophy/blob/master/src/culture.md' }, 'culture')} distinguishes a story as being used for entertainment and fiction. Our culture also uses story for an informal narrative for people, animals, etc.`,]],
	[`# ${tb_a_({ href: 'https://github.com/btakita/philosophy/blob/master/src/history.md' }, 'History')}`, [
		`> History (from Greek ἱστορία, historia, meaning "inquiry, knowledge acquired by investigation") is the study of the past, particularly how it relates to humans. It is an umbrella term that relates to past events as well as the memory, discovery, collection, organization, presentation, and interpretation of information about these events. Scholars who write about history are called historians. Events occurring prior to written record are considered prehistory.`,
		nl,
		`> History can also refer to the academic discipline which uses a narrative to examine and analyse a sequence of past events, and objectively determine the patterns of cause and effect that determine them.`,
		nl,
		`Our culture says History is the recorded narrative of the sequence of Human events. However, we've heard the usages: The history of human civilization; The history of Mars; The history of the Universe; The history of Middle Earth. The vernacular has expanded the definition of history to include all the time and fiction worlds.`,
		nl,
		`${
			tb_a_({ href: 'http://en.wikipedia.org/wiki/Biography', nofollow: true }, 'Biographies')
		} & ${
			tb_a_({ href: 'http://en.wikipedia.org/wiki/Autobiography', nofollow: true }, 'Autobiographies')
		} are also considered history.`,]],
	[`# Story & History can be used Interchangeably`, [
		`We already can use "story" in place of "history" since both are a recounting of events.`,
		nl,
		`"History" can also be used in place of "story" since the vernacular usage of history includes fiction worlds, geological events, & physical events.`,
		nl,
		`The defining line is blurred. Story & History can be used Interchangeably. The usages of Story & History are connected. Enjoy the connection.`,]],
])
// @formatter:on
