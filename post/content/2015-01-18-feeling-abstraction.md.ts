import { post_meta__validate } from '@rappstack/domain--any--blog/post'
import { request_url__origin_ } from '@rappstack/domain--server/request'
import { md__raw_ } from '@rappstack/ui--any/md'
import { type request_ctx_T } from 'rebuildjs/server'
import feeling_abstraction_jpg from '../../public/assets/images/feeling-abstraction.jpg'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2015-01-18T04:00Z',
	title: `Feeling Abstraction`,
	slug: 'feeling-abstraction',
	hero_image: new URL(feeling_abstraction_jpg, request_url__origin_(ctx)).href,
	tag_a1: [
		'philosophy',
		'worldview',
		'abstraction',
	],
	description:
		`Reductionist mechanisms in Physical Existence are Energy & Energy Transfer. We are all physically made of Energy. Feeling an abstract notion such as Energy Transfer may seem tricky; however, it's simply connection. A trick to feeling abstract terms is connect to something more familiar, such as a physical sensation.`
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
Reductionist mechanisms in Physical Existence are Energy & Energy Transfer. We are all physically made of Energy.

Feeling an abstract notion such as Energy Transfer may seem tricky; however, it's simply connection.

A trick to feeling abstract terms is connect to something more familiar, such as a physical sensation.

A form of Energy Transfer is heat transfer. Something feeling hot means Heat (Energy) is transferred to your body from that thing; something feeling cold means Heat is transferred from your body to that thing.

A simple connection can lead to analogies in similar abstract structures. Like I felt a hot response from her as her attention poured on me; or she seemed cold to my attention.

Humans create mental models, called abstractions; Whether the abstraction is a word, symbol, picture, a feeling, etc. The identity of that abstraction can be expressed as an explicit title with defined lines, or a fuzzy feeling that is vague and challenging to identify.

As you focus on an abstraction, observe your feelings; like how you observe a room. Move attention from one spot to another. Flow, zoom in & out. Let the abstractions flow in & out of focus.

Feel the abstractions around you. Perhaps you can even touch an abstraction. Don't worry about not being able to name the abstractions or even knowing exactly what is there. Our visual & spatial awareness is a flowing interaction with the environment. Nothing needs to be name when observing.

And yet, naming something creates a new abstraction. This allows new analogies & systems to be created. New rooms to explore. New things to feel.
`.trim())
// @formatter:on
