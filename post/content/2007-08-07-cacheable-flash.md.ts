import {
	josh_susser__tb_a_,
	peertopatent_org__tb_a_,
	rubyforge_org_pivotalrb__tb_a_
} from '@btakita/ui--server--briantakita/anchor'
import { post_meta__validate } from '@rappstack/domain--server--blog/post'
import { md__raw_ } from '@rappstack/ui--any/md'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta_ = (ctx:request_ctx_T)=>post_meta__validate(ctx, {
	pub_date: '2007-10-08T04:45Z',
	title: `Cacheable Flash`,
	slug: 'cacheable-flash',
	tag_a1: [
		'cache',
		'open-source',
		'page-cache',
		'pivotal-labs',
		'rails',
		'ruby',
		'test',
	],
	description: `Introducing Cacheable Flash. Send dynamic data over the Rails Flash cookie. Works with Page Caching.`,
	canonical_url: 'https://tanzu.vmware.com/content/blog/cacheable-flash',
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_(ctx, `
Page caching is an easy way to get massive performance and scalability increases with little up front effort.

Of course, when page caching, a number of design changes are necessary. For example, server side session data cannot be used to render data on cached pages.

Rails provides the flash hash to easily render alert messages and errors. In the controller you can write to the flash hash:

\`\`\`ruby
flash[:error] = "You cannot go there"

# or

flash[:notice] = "Welcome to eternity"
\`\`\`

and render the flash hash in the view. Typically the rendering happens on a layout:

\`\`\`html
<div id="error_div_id" class="flash flash_error"><%= flash[:error] %></div>

<div id="notice_div_id" class="flash flash_notice"><%= flash[:notice] %></div>
\`\`\`

There are some strange quirks with using flash such as needing to use FlashHash#now when rendering the response without redirecting.

Everything works great until you need to page cache the landing page.

For example, lets say you page cache your home page. After logging in, you are redirected to the home page with the flash notice “Logged in successfully”. When page caching, this solution does not work because the request is responded to by the Web Server (i.e. Apache) and does not reach the Rails App server (i.e. Mongrel).

This means the view does not get a chance to render the flash error and notice.

There are a couple of solutions to this problem.

- Do an AJAX request back to the server to render the flash error and notice (i.e. using RJS)
- Send the flash error and notice from the server with cookies and render it during page load

## Introducing Cacheable Flash

To solve the problem using cookies on ${peertopatent_org__tb_a_()}, we wrote the Cacheable Flash plugin. The plugin allows you to set the flash hash as normal on the controller. It handles converting the flash hash into cookies. All you need to do is include the CacheableFlash module into your controller.

\`\`\`ruby
class ApplicationController < ActionController::Base

  include CacheableFlash

  # ...

end
\`\`\`

On the view side, you will need to add some javascript.

\`\`\`html
<div id="error_div_id" class="flash flash_error"></div>

<div id="notice_div_id" class="flash flash_notice"></div>

<script type="text/javascript">

  Flash.transferFromCookies();

  Flash.writeDataTo('error', $('error_div_id'));

  Flash.writeDataTo('notice', $('notice_div_id'));

</script>
\`\`\`

The Flash.transferFromCookies method:

- Grabs the flash data from the cookies and saves it to Flash.data
- Deserializes the flash hash from JSON to Javascript
- Erases the flash data from the cookies

The Flash.writeDataTo method:

- Writes data from the passed in key in Flash.data to the passed in element or element id

Here is how the life cycle of the login works:

1. The user enters the correct login information
2. Rails handles the web request. In the Login controller, flash[:notice] is written to
\`\`\`ruby
  if current_user

    flash[:notice] = "Welcome to Eternity"

  end
\`\`\`
3. An after filter serializes contents of the Flash Hash as JSON into cookies
4. The after filter clears the flash hash
5. The cached page is rendered
6. The client side receives and clears the flash cookie data
7. The client side javascript renders the flash messages

There is also a side benefit — you don’t have to use FlashHash#now because storing the flash in cookies to be rendered and erased by the client makes this unnecessary.

The Cacheable Flash plugin is on the Pivotal RB project page (${rubyforge_org_pivotalrb__tb_a_()}). You can install it by running:

\`\`\`sh
ruby script/plugin install svn://rubyforge.org/var/svn/pivotalrb/cacheable_flash/trunk
\`\`\`


It will copy flash.js, cookie.js, and json.js if you do not already have these files.

Happy Page Caching!!

Thanks to ${josh_susser__tb_a_()} for pairing with me on this.
`.trim())
// @formatter:on
