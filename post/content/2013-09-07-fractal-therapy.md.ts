import { existence__tb_a_ } from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--any--blog/post'
import { md__raw_ } from '@rappstack/ui--any/md'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { type request_ctx_T } from 'rebuildjs/server'
import { request_url_ } from 'relysjs/server'
import fractal_therapy_jpg from '../../public/assets/images/fractal-therapy.jpg'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate({
	author: `Brian Takita`,
	pub_date: '2013-09-07T10:13Z',
	title: `Fractal Therapy`,
	slug: 'fractal-therapy',
	hero_image: request_url_(ctx).origin + fractal_therapy_jpg,
	tag_a1: [
		'fractals',
		'therapy',
	],
	description:
		`Who knew that Fractal Zoom videos can be therapeutic?`
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
${existence__tb_a_()} over time and space. If you aren't familiar, here's a 55 minute documentary. It's worth watching.

<iframe title="Fractals - Hunting the Hidden Dimension — PBS Nova" width="560" height="315" src="https://www.youtube.com/embed/4BGpU0dvYHw" frameborder="0" allowfullscreen></iframe>

Being in nature, listening to the ocean, listening to a heartbeat. All of these activities are soothing and reduce stress. Existence is full of fractals.

Even watching a fractal zoom is soothing. Watch this in full screen!

<iframe title="Mandelbrot Fractal deep zoom 21 2^1116 HD" width="420" height="315" src="https://www.youtube.com/embed/PbwaFQ2r2c4" frameborder="0" allowfullscreen></iframe>

It turns out there are some ${tb_a_({ href: 'https://www.google.com/search?q=fractal+therapy' }, 'therapies')} that utilize Fractals. An ${tb_a_({ href: 'http://www.psychologytoday.com/blog/codes-joy/201209/fun-fractals' }, 'article in Psychology Today')} suggests spending 20 minutes a day for a week being exposed to fractals. This could mean being in nature, blowing bubbles, looking at artwork with Fractals… With the success of other techniques like ${tb_a_({ href: 'https://en.wikipedia.org/wiki/Binaural_beats' }, `Binaural Beats (Wikipedia)`)} and advances in consumer video devices, like the ${tb_a_({ href: 'http://www.oculusvr.com' }, `Oculus Rift`)}, therapy is about to become more immersive and available to everyone. Many of these therapies are available free on Youtube.

The genre of healing audio/video has been around the last few decades and will continue to gain in prevalence as the established medical profession begins to accept these forms of therapy.

That smells like the opportunity to heal people and to have a positive impact on humanity.
`.trim())
// @formatter:on
