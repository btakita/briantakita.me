import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { md__raw_ } from '@rappstack/ui--any/md'
import { nl } from '@rappstack/ui--any/string'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2008-10-13T12:00Z',
	title: `RR 0.6.0 Released`,
	slug: 'rr-0-6-0-released',
	tag_a1: [
		'ruby',
		'open-source',
		'test',
		'pivotal-labs',
	],
	description: `RR version 0.6.0 is released`,
	canonical_url: 'https://tanzu.vmware.com/content/blog/rr-0-6-0-released',
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>''
+ md__raw_({ ctx }, `
I’m pleased to announce the 0.6.0 version of RR. The changes include:

- Declaring Double subject objects without having to pass it in via the \`mock!\`, \`stub!\`, \`dont_allow!\`, \`instance_of!\`, and \`proxy!\` methods
- Revised Double chaining API
- \`satisfy\` matcher
- \`hash_including\` matcher
`.trim())
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	[`# Declaring Double Subjects (The bang methods)`, [
		`In previous versions of RR, you always needed to pass in the subject of the double. For example:`,
		nl,
		'```rb',
		`subject = Object.new`,
		`mock(subject).does_something {:and_returns_me}`,
		`subject.does_something # :and_returns_me`,
		'```',
		nl,
		`Now you can have RR automatically create the subject object for you by using the ! method:`,
		nl,
		'```rb',
		`subject = mock!.does_something {:and_returns_me}.subject`,
		`subject.does_something # :and_returns_me`,
		'```',
		nl,
		`Now the bang methods by themselves don’t really add a whole lot, but when used in the context of Double chaining, they become a powerful addition.`,]],
	[`# Double Chaining`, [
		`Nick Kallen presented the use case for Double chaining and contributed a patch for the 0.5.0 release of RR. It has proved useful and is now more fully incorporated into RR. Now you can pass in your subject or use the subject provided by RR by using the \`!\` method. Here are some examples of Double Chaining:`,
		nl,
		'```rb',
		`mock(subject).first(1) {mock(Object.new).second(2) {mock(Object.new).third(3) {4}}}`,
		`subject.first(1).second(2).third(3) # 4`,
		``,
		`mock(subject).first(1) {mock!.second(2) {mock!.third(3) {4}}}`,
		`subject.first(1).second(2).third(3) # 4`,
		``,
		`mock(subject).first(1).mock!.second(2).mock!.third(3) {4}`,
		`subject.first(1).second(2).third(3) # 4`,
		'```',
		nl,
		`Of course you have access to the proxy facilities:`,
		nl,
		'```rb',
		`mock.proxy(User).find('1').mock.proxy!.children.mock.proxy!.find_all_by_group_id(10)`,
		`User.find('1').children.find_all_by_group_id(10) # Makes verifications pass and returns the actual children`,
		'```',
		nl,
		`You can also do branched Double chaining:`,
		nl,
		'```rb',
		`mock(subject).first do`,
		`  mock! do |expect|`,
		`    expect.branch1.mock!.branch11 {11} # or expect.branch1 {mock!.branch11 {11}}`,
		`    expect.branch2.mock!.branch22 {22} # or expect.branch2 {mock!.branch22 {22}}`,
		`  end`,
		`end`,
		`o = subject.first`,
		`o.branch1.branch11 # 11`,
		`o.branch2.branch22 # 22`,
		'```',
		()=>[
			[`## Satisfy Matcher`, [
				`Matthew O’Conner submitted a patch that added the satisfy matcher. This adds the ability to add arbitrary argument expectation matchers.`,
				nl,
				'```rb',
				`mock(object).foobar(satisfy {|arg| arg.length == 2})`,
				`object.foobar("xy")`,
				'```',]],
			[`## Hash Including Matcher`, [
				`Matthew O’Conner also submitted a patch that added the hash_including matcher. This adds a convenient way to assert that the passed-in hash includes certain key/value pairs.`,
				nl,
				'```rb',
				`mock(object).foobar(hash_including(:red => "#FF0000", :blue => "#0000FF"))`,
				`object.foobar({:red => "#FF0000", :blue => "#0000FF", :green => "#00FF00"})`,
				'```',]],],]],
	[`# Mailing list`, [
		`RR has a mailing lists at:`,
		nl,
		`- ~~double-ruby-users@rubyforge.org~~`,
    `- ~~double-ruby-devel@rubyforge.org~~`,
		nl,
		`Also, RR’s rubyforge page is at ${
			tb_a_({ href: 'http://rubyforge.org/projects/double-ruby', nofollow: true, style: 'text-decoration: line-through;' })
		} and of course the github page is at ${
			tb_a_({ href: 'http://github.com/btakita/rr' })
		}. Yes, and there is more to come`,
		nl,
		`There are many interesting ideas floating around. Joseph Wilk has been playing around with adding Spies into RR. I’m also thinking about adding Double validation scoping into RR. Also, I’m impressed by Mocha’s warning of unused stubs. Josh Susser also proposed having a mode where a warning would occur if a mocked method is not implemented on the subject being mocked.`,
		nl,
		`If you have any feature requests, please send an email to the mailing list or add it to the rubyforge tracker.`,]],
])
// @formatter:on
