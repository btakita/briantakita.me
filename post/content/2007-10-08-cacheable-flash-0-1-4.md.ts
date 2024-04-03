import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { md__raw_ } from '@rappstack/ui--any/md'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2007-10-08T04:45Z',
	title: `Cacheable Flash 0.1.4 — Test Helpers`,
	slug: 'cacheable-flash-0-1-4-test-helpers',
	tag_a1: [
		'ruby',
		'rails',
		'open source',
		'test',
		'pivotal labs',
	],
	description: `Cacheable Flash testing`,
	canonical_url: 'https://tanzu.vmware.com/content/blog/cacheable-flash-0-1-4-test-helpers',
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
I just released Cacheable Flash 0.1.4. This version includes test helpers so you can easily test your cache messages. It works by allowing you to make assertions on the flash cookie.

Here is a test/unit example:
\`\`\`rb
require "cacheable_flash/test_helpers"

class TestController < ActionController::Base
	def index
		flash["notice"] = "In index"
	end
end

class ControllerTest < Test::Unit::TestCase
	include CacheableFlash::TestHelpers

	def setup
		@controller = TestController.new
		@request = ActionController::TestRequest.new
		@response = ActionController::TestResponse.new
	end

	def test_cacheable_flash_action
		get :index
		asset_equal "In index", flash_cookie["notice"]
	end
end
\`\`\`
Here is a rspec example:
\`\`\`rb
require "cacheable_flash/test_helpers"

class TestController < ActionController::Base
	def index
		flash["notice"] = "In index"
	end
end

describe TestController, "#index" do
	include CacheableFlash::TestHelpers

	it "writes to the flash cookie" do
		get :index
		flash_cookie["notice"].should == "In index"
	end
end
\`\`\`
You can install Cacheable Flash by running:

\`\`\`sh
ruby script/plugin install svn://rubyforge.org/var/svn/pivotalrb/cacheable_flash/trunk
\`\`\`

See the Cacheable Flash blog post, Show Flash Messages on Cached Pages, and the README for more information.
`.trim())
// @formatter:on
