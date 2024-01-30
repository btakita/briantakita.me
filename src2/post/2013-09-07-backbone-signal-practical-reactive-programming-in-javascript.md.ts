import { md_c_ } from '@btakita/ui--any--blog/md'
import { tb_a_ } from '@btakita/ui--server--blog/anchor'
import {
	atb_backbone_signal_,
	atb_browserify_,
	atb_nodejs_,
	atb_rundavoo_
} from '@btakita/ui--server--briantakita/anchor'
import { asset_path_a_ } from 'rebuildjs'
const [
	neurons_jpg,
] = await asset_path_a_(
	import('../../public/assets/images/neurons.jpg'),
)
export const meta = {
	author: `Brian Takita`,
	pubDate: '2013-09-07T05:16Z',
	title: `backbone-signal - Practical Reactive Programming in Javascript`,
	slug: 'backbone-signal-practical-reactive-programming-javascript',
	hero_image: 'https://www.briantakita.me' + neurons_jpg,
	tags: [
		'javascript',
		'signals',
		'reactive',
		'backbonejs',
	],
	description:
		`Introducing backbone-signal, which adds Signals to Backbonejs.`,
}
// @formatter:off
// language=md
export default ()=>md_c_(`
I have recently released ${atb_backbone_signal_()}, which is a ${tb_a_({ href: 'https://en.wikipedia.org/wiki/Reactive_programming' }, 'reactive programming (Wikipedia)')} library with a practical & javascripty model api.

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

\`\`\`shell
    Let's see some friends
    Hello Jane
    Nice to see you
    Hello Joe
    Nice to see you
\`\`\`

We are calling \`getTruthy\` on the \`userSignal\` two times, one for \`"Hello " + user.name\` and one for \`"Nice to see you"\`. The callback is invoked when the	value is ${tb_a_({ href: 'http://www.sitepoint.com/javascript-truthy-falsy/' }, 'Truthy')}. So when \`userSignal.unset\` is called, the callbacks are not invoked.

What is nice about having a dedicated signal object is that you can bind to it even when it's value is undefined, thereby avoiding order dependencies and simplifying your logic.

backbone-signal also utilizes Backbone's \`listenTo\` and \`listenToOnce\` methods, which make it easy to clean up by calling \`stopListening\` on the listener.

backbone-signal is being used in ${atb_rundavoo_()} and has been fun to use, especially with ${atb_nodejs_()} & ${atb_browserify_()}. It's been a pleasure using a lightweight unframework to freely structure the dataflow logic of the site.

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
