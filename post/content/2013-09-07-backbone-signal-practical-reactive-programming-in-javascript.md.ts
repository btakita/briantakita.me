import {
	backbone_signal__tb_a_,
	browserify__tb_a_,
	nodejs__tb_a_,
	rundavoo__tb_a_
} from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { request_url__origin_ } from '@rappstack/domain--server/request'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import { type request_ctx_T } from 'rebuildjs/server'
import neurons_jpg from '../../public/assets/images/neurons.jpg'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2013-09-07T05:16Z',
	title: `backbone-signal - Practical Reactive Programming in Javascript`,
	slug: 'backbone-signal-practical-reactive-programming-javascript',
	hero_image: new URL(neurons_jpg, request_url__origin_(ctx)).href,
	tag_a1: [
		'javascript',
		'signals',
		'reactive',
		'backbonejs',
	],
	description:
		`Introducing backbone-signal, which adds Signals to Backbonejs.`,
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_({ ctx }, `
I have recently released ${backbone_signal__tb_a_()}, which is a ${tb_a_({ href: 'https://en.wikipedia.org/wiki/Reactive_programming', nofollow: true }, 'reactive programming (Wikipedia)')} library with a practical & javascripty model api.

\`\`\`js
// backbone-signal extends Backbone.Model
var app = new Backbone.Model();

var userSignal = app.signal("user");
userSignal.getTruthy(app, function(app, user) {
  console.info("Hello " + user.name);
});

console.info("Let's see some friends");
userSignal.set({
  name: "Jane"
});

userSignal.getTruthy(app, function(app, user) {
  console.info("Nice to see you");
});

userSignal.set({
  name: "Joe"
});

userSignal.unset();
\`\`\`

The console ouput is:

\`\`\`sh
    Let's see some friends
    Hello Jane
    Nice to see you
    Hello Joe
    Nice to see you
\`\`\`

We are calling \`getTruthy\` on the \`userSignal\` two times, one for \`"Hello " + user.name\` and one for \`"Nice to see you"\`. The callback is invoked when the	value is ${tb_a_({ href: 'http://www.sitepoint.com/javascript-truthy-falsy/', nofollow: true }, 'Truthy')}. So when \`userSignal.unset\` is called, the callbacks are not invoked.

What is nice about having a dedicated signal object is that you can bind to it even when it's value is undefined, thereby avoiding order dependencies and simplifying your logic.

backbone-signal also utilizes Backbone's \`listenTo\` and \`listenToOnce\` methods, which make it easy to clean up by calling \`stopListening\` on the listener.

backbone-signal is being used in ${rundavoo__tb_a_()} and has been fun to use, especially with ${nodejs__tb_a_()} & ${browserify__tb_a_()}. It's been a pleasure using a lightweight unframework to freely structure the dataflow logic of the site.

The api includes:

## Loading/Unloading

- \`load\` - Invokes the loader when the value is not defined
- \`forceLoad\` - Invokes the loader (regardless if the value is defined)
- \`reload\` - Unsets the value then invokes the loader
- \`unload\` - Invokes the unloader
- \`setLoader\` - Sets the Loader callback
- \`unsetLoader\` - Unsets the Loader callback
- \`setUnloader\` - Sets the Unloader callback
- \`unsetUnloader\` - Unsets the Unloader callback

## Setters

- \`set\` - Sets the value with the argument
- \`unset\` - Unets the value
- \`value\` - Returns the value

## Getters/Listeners

- \`get\` - Invoke the callback immediately and on any additional changes to the value
- \`listen\` - Listen to any additional changes to the value (does not invoke the callback immediately)
- \`getOnce\` - Invoke the callback immediately one time
- \`listenOnce\` - Listen to any additional changes to the value one time
- \`getTruthy\` - Invoke the callback immediately and on any additional changes to the value if the value is truthy
- \`listenTruthy\` - Listen to any additional changes to the value if the value is truthy
- \`getTruthyOnce\` - Invoke the callback immediately or on any additional changes to the value if the value is truthy
one time only
- \`listenTruthyOnce\` - Listen to any additional changes to the value if the value is truthy one time only
- getFalsy- Invoke the callback immediately and on any additional changes to the value if the value is falsy
- \`listenFalsy\` - Listen to any additional changes to the value if the value is falsy
- \`getFalsyOnce\` - Invoke the callback immediately or on any additional changes to the value if the value is falsy one
time only
- \`listenFalsyOnce\` - Listen to any additional changes to the value if the value is falsy one time only
- getDefined- Invoke the callback immediately and on any additional changes to the value if the value is defined
- \`listenDefined\` - Listen to any additional changes to the value if the value is defined
- \`getDefinedOnce\` - Invoke the callback immediately or on any additional changes to the value if the value is defined
one time only
- \`listenDefinedOnce\` - Listen to any additional changes to the value if the value is defined one time only
- \`unbind\` - Unbinds the given object from the callback
- \`loading\`
- \`isLoading\`
`.trim())
// @formatter:on
