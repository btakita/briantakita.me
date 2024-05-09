import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import { blog_post__top_note__p_ } from '@rappstack/ui--server--blog/post'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2010-03-08T12:00Z',
	title: `Javascript Design Idiom – Build Wide Not Deep`,
	slug: 'javascript-design-idiom-build-wide-not-deep',
	tag_a1: ['software architecture'],
	description:
		`Providing a rich user experience calls for good client side software. Javascript is a powerful language to provide the needed functionality. Like any other tool it has it’s strengths and weaknesses. Successful design in Javascript favors composition, loose coupling, and separation of concerns more so than in most other languages. To see why, let’s look at some properties of Javascript.`
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_({ ctx }, `
${blog_post__top_note__p_('Originally posted on ', tb_a_({ href: 'https://web.archive.org/web/20120611125513/http://blog.honk.com/javascript-design-idiom-%e2%80%93-build-wide-not-deep/', nofollow: true }, 'blog.honk.com'))}

Providing a rich user experience calls for good client side software. Javascript is a powerful language to provide the needed functionality. Like any other tool it has it’s strengths and weaknesses. Successful design in Javascript favors composition, loose coupling, and separation of concerns more so than in most other languages. To see why, let’s look at some properties of Javascript.

Javascript is a prototype language with loose and dynamic typing. It is a flexible language. You have anonymous functions. You can alter objects at any time. You can aggregate functions from many sources. It provides closures and dynamic invocation. Also, each web page can be treated as a separate “application”, so you often do not need to have too many interacting pieces.

Javascript can also be a challenging language to use. Javascript does not give you a dependable stack trace. The debuggers often leave much to be desired. The weak type system makes it difficult to discern objects from each other. Inheritance is challenging.

These characteristics make it beneficial to build via composition. It makes sense to have loosely coupled objects. It also makes sense to unit test your Javascript software. It makes sense to craft the code to be scannable.

That being said, I really enjoy developing in Javascript because it encourages (or forces) me to better design my code. Working with a good testing framework leads to a quick, red/green/refactor cycle.

## The Maintenance Costs of Complex Objects

Unfortunately, it is challengin to build an example because complexity in Javascript requires complex code. So I’m not really going to show code examples, but talk at a higher level.

Since Javascript does not provide good stack traces it becomes very time-consuming to debug complex functions. To combat this problem, you should take advantage of Javascript’s flexibility and make loosely coupled functions that are composable. Good abstractions are important.

A good example of this is jQuery.

\`\`\`js
$(“.person”).click(function() {$(this).toggleClass(“active”);});
\`\`\`

When a  element with the ‘person’ class is clicked, the ‘active’ is toggled. Now imagine doing this with the old imperative style of Javascript. I could write the example, but it hurts to write and read, so I will spare you of it.

The more you can express in one line or one thought, the better.

Now these concepts are do not need to be constrained to DOM manipulation and hooking up events. You can add client/server concepts to the mix. Need to handle the case where the user can click on filters, each of which creates an Ajax request to update the search results? Don’t inline the code, create a function to do this. Give it a memorable name, like \`lastAjaxWins\` (not that that is the best name ever, but it is a memorable phrase).

The idea is to have consistent levels of abstraction. It may be expedient to have a function that has inconsistent levels of abstraction, but Javascript will not be very forgiving when you need to maintain and debug your code.

Fortunately, if you unit test and have loosely coupled objects and functions, your code will be easier to think about and you will not need to debug as much.

## Heuristics to Measuring Complexity

Javascript makes complexity especially bad. When developing Javascript software, it helps to have some heuristics to keep the complexity down.

## Talk About It

Whenever I complete a piece of functionality, I try to recreate the mental model of where this piece fits in on the web page. It should be clear, distinct, and easy to talk about. Talk about it with somebody. Is it easy to summarize?

If not, it is probably too complex. Break it apart. Create functions and objects which you can name. Compose these names to describe dependent objects.

## Use Your Test Framework

A good javascript test framework (a couple of examples are Screw Unit and Jasmine) allows for nested ‘describe’ blocks and ‘it’ blocks (nested SUT’s, contexts, and test cases). When writing the name of the ‘describe’ block and ‘it’ block, try to capture the system under test, the situation of the test, and what happens. Be descriptive and precise. Don’t be vague. Being vague is cheating.

This is important because the length and complexity of your statements are a good indication of the complexity of the functionality you are testing.

Are the tests very painful to write? Are there repetitive patterns? If yes, then that may be an indication that you need to extract something.

## Refer to your Mental Model

Think about the client/server interaction. Whenever you add functionality, think about how it fits into the overall picture. Unless you are doing really heavy client side development, it should be easy to think about how that object and/or function fits into the picture. If you are doing heavy client side development, use good abstractions. Talk in the language of your abstractions. Let the concepts permeate through your consciousness. Having an intuitive grasp on your past, present, and future problems and solutions.
`.trim())
// @formatter:on
