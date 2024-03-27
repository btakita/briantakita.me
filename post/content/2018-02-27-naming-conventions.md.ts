import { post_meta__validate } from '@rappstack/domain--any--blog/post'
import { site__author_, site__author_img_url_ } from '@rappstack/domain--server/site'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { md__raw_ } from '@rappstack/ui--any/md'
import { blog_post__top_note__p_ } from '@rappstack/ui--server--blog/post'
import type { request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate({
	author: site__author_(ctx)!,
	author_img_url: site__author_img_url_(ctx)!,
	pub_date: '2018-02-27T20:30:00Z',
	title: `Naming Conventions`,
	slug: 'naming-conventions',
	tag_a1: [
		'tag vector',
		'name convention',
	],
	description: `Naming Conventions to encode the meaning & context of abstractions`
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
${blog_post__top_note__p_(`Note: The naming convention described in this article is named `, tb_a_({ href: '/posts/tag-vector-0-introduction' }, 'Tag Vector'), `:`)}

---

An Abstraction name encodes the meaning & context of the abstraction. The name consists of tags that are joined together to create a name. ${tb_a_({ href: 'https://en.wikipedia.org/wiki/Naming_convention_(programming)', nofollow: true }, 'Naming Convention (programming) (Wikipedia)')}

## Discoverability: Unique vs Ambiguous Names

A name & tags in the name also acts identifiers to locate the usages of the abstraction in the codebase. This attribute is also known as discoverability.

${tb_a_({ href: 'https://en.wikipedia.org/wiki/Discoverability', nofollow: true }, 'Discoverability (Wikipedia)')}

Unique & Accurate names for abstractions help discoverability. Ambiguous names hurt discoverability.

Advantages for discoverable abstractions include:

* easy searching for an abstraction used across the codebase
* easier refactoring (e.g. a rename refactoring is a search/replace)
* provides a more comprehensive & accurate model of the system in one's head

### Ambiguous name Example — \`id\`

\`id\` fields with context are a good candidate to combine into a single tag.

Note that it's advantageous to name a field \`user.user_id\` instead of \`user.id\` because the abstraction \`user_id\` can be located though a search wherever it is used. The convention held by \`ActiveRecord\` in \`Ruby on Rails\` makesit difficult to find usages of the \`user_id\` abstraction, particularly when it is used in objects. In the \`user\` object, \`user_id\` is named \`id\`, which is ambiguous with all the other \`*_id\` fields used in all the other relations. For reason of unambiguous distinction, it is advantageous to always use the same form for \`user_id\`.

## Top-down & Bottom-up Design

${tb_a_({ href: 'https://en.wikipedia.org/wiki/Top-down_and_bottom-up_design', nofollow: true }, 'Top-down and bottom-up design (Wikipedia)')}

One can communicate & gain design feedback on a system design by thinking in terms of top-down & bottom-up design. The typical naming convention in software systems is to have a top-down convention where the leftmost part of the name is the most global, becoming more local when moving rightward.

One can also think bottom-up by moving from the right to the left in a name. Thinking both top-down & bottom-up is often a useful exercise in understanding & discerning the naming of an abstraction.

## Underscore_casing

Underscore casing separates each word in a tag with an underscore \`_\`. Underscores are also used to separate tags when multiple tags are combined to form a name.

## CamelCasing

Camel casing is often used for variable & class names. While that works to identify a name tag, there are ambiguities when composing multiple tags together to form a name.

For example, the casing may be changed.

\`\`\`js
const btoaEncodeURIComponentUserJson = btoa(encodeURIComponent(JSON.stringify(user)))
\`\`\`\`

Composing a camelCased tag with underscores removes this ambiguity:

\`\`\`js
const btoa_encodeURIComponent_user_json = btoa(encodeURIComponent(JSON.stringify(user)))
\`\`\`\`

## Double__Underscore__Casing (\`__\`)

Double Underscores are used to aggregate a new chain of tags.

### Bottom-up naming

If the typical use case is top-down naming (\`global_context_mid_context_local\`), to achieve bottom-up naming, one could use \`__\` to join each tag (\`local__mid_context__global_context\`).

### Event Handler Names - \`__click\` as shorthand for \`onclick\`

A name that begins with \`__\` can be though of as an unassigned local tag followed by contextual tags. This technique can be used to name event handlers.

### Context Object Names - \`__user\` as shorthand for \`ctx__user\`

At times, it may be useful to have a ctx object representing a group of abstractions related to a certain tag.

\`\`\`js
const __user = {
	user_name: 'Joe',
	user_id: 44,
	user: {user_id: 44, user_name: 'Joe'},
	user_orders_transactions: [{
		order_transaction_id: 99,
		order_id: 54
	}]}
\`\`\`

### Alternate names - \`user__\`

If a name is already used within a scope, it may be useful to define an alternate name. This is useful when a function takes an abstraction, clones it, & returns a new version of the abstraction.

\`\`\`js
async function refresh_user(user) {
	const {user_id} = user
	const response = await fetch_user(user_id)
	const user__ = await response.json()
	return user__
}
\`\`\`

## Factory Functions \`_sales_report\`

Factory functions are prefixed with a single \`_\`, with the name of the created abstraction following.

\`\`\`js
const sales_report = _sales_report()
\`\`\`

One can visualize the \`sales_report\` flowing from the factory \`_\`.

This technique may be useful in breaking down a function into component parts using scoping. In the following example, these queries are run in parallel using \`async/await\` & \`Promise.all\`.

Note that in this example, bottom-up naming is used to highlight that \`results\` is the type of the abstraction, with the rest of the name being context named top-down.

\`\`\`js
async function _sales_report() {
	const [
		results__sales_aggregate_query,
		results__sales_regions_query,
		results__sales_forecast_query
	] = await Promise.all([
		_results__sales_aggregate_query(),
		_results__sales_regions_query(),
		_results__sales_forecast_query()
	])
	return {
		results__sales_aggregate_query,
		results__sales_regions_query,
		results__sales_forecast_query
	}
	async function _results__sales_aggregate_query() {
		// ...
	}
	async function _results__sales_regions_query() {
		// ...
	}
	async function _results__sales_forecast_query() {
		// ...
	}
}
\`\`\`
`.trim())
// @formatter:on
