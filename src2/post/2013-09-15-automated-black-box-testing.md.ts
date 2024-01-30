import { md_c_ } from '@btakita/ui--any--blog/md'
export const meta = {
	author: `Brian Takita`,
	pubDate: '2013-09-15T02:31Z',
	title: `Automated Black Box Testing`,
	tags: [
		'tests',
		'automation',
	],
	slug: 'automated-black-box-testing',
	description:
		`My journey to preferring automated black box testing over white box testing.`,
}
// @formatter:off
// language=md
export default ()=>md_c_(`
Automated testing encourages your software to behave a certain way going forward into the future.

When you write tests against your user facing requirements (black box and acceptance tests), verifying how your app acts.

When you use automated tests for white box testing (unit tests), you lock down how your software is designed.

I've worked on products which often has changing requirements, and whenever there were unit tests and I needed to make breaking internal changes, I've found myself having to make a decision to delete the tests, refactor them, or change the software in a different way.

That decision led me to totally eschew white box testing as much as possible in favor of black box testing. It's been working great, since I'm free to improve the design of the software without being hobbled by irrelevant tests and false positives.

I also don't really have any false negatives, because I often don't care about what I would have unit tested, just the external behavior.

I do see value of unit tests as a waypoint to help drive along TDD. However these unit tests are not useful, and are often counter-productive (because they lock down the current design) as regression tests.

Log messages to help isolate where things break and they work in production environments to boot. This help alleviate the need for unit tests to isolate breakages.
`.trim())
// @formatter:on
