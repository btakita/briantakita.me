import {
	flexmockrb__tb_a_,
	mocharb__tb_a_,
	rr__tb_a_,
	rspec_mocks__tb_a_
} from '@btakita/ui--server--briantakita/anchor'
import { sticky_h2__dl_tree_props_ } from '@btakita/ui--server--briantakita/sticky'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { tb_a_ } from '@rappstack/ui--any/anchor'
import { dl_tree_ } from '@rappstack/ui--any/dl'
import { md__raw_ } from '@rappstack/ui--any/md'
import { nl } from '@rappstack/ui--any/string'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2008-01-01T05:30Z',
	title: `Introducing RR`,
	slug: 'introducing-rr',
	tag_a1: [
		'ruby',
		'open-source',
		'test',
		'pivotal-labs',
	],
	description:
		`Introducing RR (Double Ruby) library for testing`,
	canonical_url: 'https://tanzu.vmware.com/content/blog/introducing-rr'
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>''
+ md__raw_({ ctx }, `
I'm pleased to introduce a new Test Double (or mock) framework named ${rr__tb_a_()}, which is short for Double	Ruby. Why a Double framework and not a Mock framework?

A mock is a type of test double. Since RR supports mocks, stubs, and proxies, it makes sense to refer to RR as a double framework. The proxy is a new usage pattern that I will introduce later in this article, and in more detail in future articles.

Unfortunately, the terminology over doubles has been contradictory depending on the framework. RR's terminology tries to be as faithful as possible to Gerald Meszaros' definition of test doubles. You can read more about test doubles in ${tb_a_({ href: 'http://xunitpatterns.com/Test%20Double%20Patterns.html', nofollow: true })} and Martin Fowler's article, ${tb_a_({ href: 'http://martinfowler.com/articles/mocksArentStubs.html', nofollow: true })}. Regretfully, this does mean that RR will have slightly different terminology than other double frameworks. How does RR compare to other Mock frameworks?  

Most double frameworks focus mainly on mocks (hence the categorization "mock framework"). RR's focus is on enabling more double test patterns in a terse and readable syntax.

RR also does not have dedicated mock objects. It primarily uses the technique called 'double injection'. Names that other frameworks use are 'stub injection', 'mock object injection', 'partial mocking', or 'stubbing'. The term I'll use for this is a double injection, since one or many doubles are being injected into an object's method.

I'll use trivial Rails examples to highlight the syntactical differences between RR, ${mocharb__tb_a_()}, ${rspec_mocks__tb_a_()}, ${flexmockrb__tb_a_()}. They may or may not be appropriate situations for mocks. The right situations for mocks is an entirely different discussion.

If there is better way to do any of the examples, please post a comment and I will gladly replace it.
`.trim())
+ dl_tree_({ ctx, _: sticky_h2__dl_tree_props_ }, ()=>[
	[`# Mocks`, [
		`Here are the ways to mock the User.find method. The expectation is the User class object will receive a call to \`#find\` with the argument \`99\` once and will return the object represented by the variable user.`,
		()=>[
			[`## RR`, [
				'```rb',
				`mock(User).find('99') { user }`,
				'```',]],
			[`## Mocha`, [
				'```rb',
				`User.expects(:find).with('99').returns(user)`,
				'```',]],
			[`## spec/mocks`, [
				'```rb',
				`User.should_receive(:find).with('99').and_return(user)`,
				'```',]],
			[`## Flexmock`, [
				'```rb',
				`flexstub(User).should_receive(:find).with('99').and_return(user).once`,
				'```',]],],]],
	[`# Stubs`, [
		`Here are the ways to stub the User.find method. When the User class object receives a call to find with the argument '99' it will return user1. When User receives find with any other arg, it returns user2.`,
		()=>[
			[`## RR`, [
				'```rb',
				`stub(User).find('99') { user1 }`,
				`stub(User).find { user2 }`,
				'```',]],
			[`## Mocha`, [
				'```rb',
				`User.stubs(:find).with(anything).returns(2)`,
				`User.stubs(:find).with('99').returns(1)`,
				'```',]],
			[`## spec/mocks`, [
				'```rb',
				`users = {`,
				`  '99' => user1,`,
				`  'default' => user2`,
				`}`,
				`User.stub!(:find).and_return do |id|`,
				`  users[id] || users['default']`,
				`end`,
				'```',]],
			[`## Flexmock`, [
				'```rb',
				`users = {`,
				`  '99' => user1,`,
				`  'default' => user2`,
				`}`,
				`flexstub(User).should_receive(:find).and_return do |id|`,
				`  users[id] || users['default']`,
				`end`,
				'```',]],],
		[`# Proxy`, [
			`A proxy used with a mock or stub causes the real method to be called. Expectations can be placed on the invocation and the return value can be intercepted. The main rationales are test clarity and you can ensure that the methods are being called correctly, even after you refactor your code. I will delve more into proxies and their usage patterns in my next article.`,
			()=>[
				[`## Mock Proxy`, [
					`The following examples set an expectation that \`User.find('99')\` will be called once. The actual user is returned.`,
					()=>[
						[`### RR`, [
							'```rb',
							`mock.proxy(User).find('99')`,
							'```',]],
						[`### Mocha`, [
							`You cannot implement this in Mocha. You can do an approximation in this situation however. This technique is not always the solution you need, though.`,
							nl,
							'```rb',
							`user = User.find('99')`,
							`User.expects(:find).with('99').returns(user)`,
							'```',]],
						[`### spec/mocks`, [
							'```rb',
							`user = User.find('99')`,
							`User.expects(:find).with('99').returns(user)`,
							'```',]],
						[`### Flexmock`, [
							'```rb',
							`find_method = User.method(:find)`,
							`User.should_receive(:find).with('99').and_return(&find_method)`,
							'```',]],],]],
				[`## Stub Proxy`, [
					`The following examples intercept the return value of User.find('99') and stub out valid? to return false.`,
					()=>[
						[`### RR`, [
							'```rb',
							`stub.proxy(User).find('99') do |user|`,
							`  stub(user).valid? {false}`,
							`  user`,
							`end`,
							'```',]],
						[`### Mocha`, [
							`Again, this is an approximation, since you cannot use proxies in Mocha.`,
							nl,
							'```rb',
							`user = User.find('99')`,
							`user.stubs(:valid?).returns(false)`,
							`User.stubs(:find).with('99').returns(user)`,
							'```',]],
						[`### spec/mocks`, [
							'```rb',
							`find_method = User.method(:find)`,
							`  User.stub!(:find).with('99').and_return do |id|`,
							`  user = find_method.call(id)`,
							`  user.stub!(:valid?).and_return(false)`,
							`  user`,
							`end`,
							'```',]],
						[`### Flexmock`, [
							'```rb',
							`find_method = User.method(:find)`,
							`  flexstub(User).should_receive(:find).with('99').and_return do |id|`,
							`  user = find_method.call(id)`,
							`  flexstub(user).should_receive(:valid?).and_return(false)`,
							`  user`,
							`end`,
							'```',]],],
				]],
				[`## instance_of`, [
					`\`instance_of\` is method sugar than allows you to mock or stub instances of a particular class. The following examples mock instances of User to expect valid? with no arguments to be called once and return false.`,
					()=>[
						[`### RR`, [
							'```rb',
							`mock.instance_of(User).valid? {false}`,
							'```',]],
						[`### Mocha`, [
							'```rb',
							`User.any_instance.expects(:valid?).returns(false)`,
							'```',]],
						[`### spec/mocks`, [
							'```rb',
							`new_method = User.method(:new)`,
							`  User.stub!(:new).and_return do |*args|`,
							`  user = new_method.call(*args)`,
							`  user.should_receive(:valid?).and_return(false)`,
							`  user`,
							`end`,
							'```',]],
						[`### Flexmock`, [
							'```rb',
							`new_method = User.method(:new)`,
							`  flexstub(User).should_receive(:new).and_return do |*args|`,
							`  user = new_method.call(*args)`,
							`  flexmock(user).should_receive(:valid?).and_return(false)`,
							`  user`,
							`end`,
							'```']],],
				]],],]],
		[`# More to come`, [
			`This concludes the introduction to RR. RR enables some techniques, like proxying, that will make your tests clearer and less brittle. In the next article, I will describe into patterns and techniques that will make mocks a more feasible tool for more situations.`,]],]],
])
// @formatter:on
