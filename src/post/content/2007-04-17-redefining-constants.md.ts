import { post_meta__validate } from '@btakita/domain--any--blog'
import { md__raw_ } from '@btakita/ui--any--blog/md'
export const meta = post_meta__validate({
	author: `Brian Takita`,
	pub_date: '2007-04-17T12:54Z',
	title: `Redefining Constants`,
	slug: 'redefining-constants',
	tag_a1: [
		'ruby',
		'pivotal labs'
	],
	description: `Redefining constants in Ruby`,
	canonical_url: 'https://tanzu.vmware.com/content/blog/redefining-constants'
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
We all like a good oxymoron, like redefining constants. There are times when we need to redefine a constant to test an edge case in the application code. Before I go into this example, please note that redefining constants is generally not a good way to have maintainable software. If you find yourself needing to redefine a constant, it may be an indication that refactoring is needed.

Given that, let's get into an example where you may need to redefine a constant. Lets say an app has does file uploads to Amazon's S3 service. A common practice to upload to a real S3 account made for the production, development, or demo environment.

When in the test environment, a fake S3 service would be used instead. The fake service is useful to keep your tests fast and running predictably.

To get a different File Upload service object in each of your environments, one can have the S3 configuration in the environment files:

**test.rb**

\`\`\`rb
STORAGE_SERVICE = FakeStorageService.new
\`\`\`

**development.rb**

\`\`\`rb
STORAGE_SERVICE = S3StorageService.new("development_service", "access_key", "secret_access_key")
\`\`\`

**production.rb**

\`\`\`rb
STORAGE_SERVICE = S3StorageService.new("production_service", "access_key", "secret_access_key")
\`\`\`

The File Upload service objects can be set to constants in the environment file. This works great when testing the logic of the objects that use the File Upload service. However it is a good idea to run an integration test that does a real upload.

Since the tests are running in the test environment, a fake File Upload service is being used. Well now we want to use a real service that points to a test S3 account. An easy trick is to redefine the constant to the S3 service in setup and then redefine the constant back to the fake service on teardown.

There are a few ways of doing this...

### Just Reset the Constant

\`\`\`rb
context "A real S3 call" do
	setup do
		STORAGE_SERVICE = S3StorageService.new("test_service", "access_key", "secret_access_key")
	end
	teardown do
		STORAGE_SERVICE = FakeStorageService.new
	end
end
\`\`\`

This is the simplest approach, but it produces an error:

\`\`\`sh
warning: already initialized constant STORAGE_SERVICE
\`\`\`

### Use silence_warnings

\`\`\`rb
context "A real S3 call" do
	setup do
		silence_warnings do
			STORAGE_SERVICE = S3StorageService.new("test_service", "access_key", "secret_access_key")
		end
	end
	teardown do
		silence_warnings do
		STORAGE_SERVICE = FakeStorageService.new
	end
end
\`\`\`

This solution removes the warning, but now a certain section of your code will not have warning at all. Also, one could argue that you lose semantic meaning. It also feels like a hack. Redefine the Constant

\`\`\`rb
class Module
	def redefine_const(name, value)
		__send__(:remove_const, name) if const_defined?(name)
		const_set(name, value)
	end
end
\`\`\`

\`\`\`rb
context "A real S3 call" do
	setup do
		Object.redefine_const(
			:STORAGE_SERVICE,
			S3StorageService.new("test_service", "access_key", "secret_access_key")
		)
	end
	teardown do
		Object.redefine_const(
			:STORAGE_SERVICE,
			STORAGE_SERVICE = FakeStorageService.new
		)
	end
end
\`\`\`

Calling redefining the constant does not generate a warning. Also it does provide semantic value because you are actively declaring that you are redefining the constant. If there are other warnings, you will also see them.

### Its all Dirty

Redefining constants is a non-standard tactic, especially for those new to Ruby. Since this is unconventional and is often contrary to assumptions, it may lead to unpredictable behavior.

Maybe the storage service can be an attribute that can be changed for individual tests.
`.trim())
// @formatter:on
