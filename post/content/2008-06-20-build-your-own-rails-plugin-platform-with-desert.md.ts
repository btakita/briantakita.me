import { post_meta__validate } from '@rappstack/domain--any--blog/post'
import { md__raw_ } from '@rappstack/ui--any/md'
import { tb_a_ } from '@rappstack/ui--any/anchor'
export const meta_ = ()=>post_meta__validate({
	author: `Brian Takita`,
	pub_date: '2008-01-01T05:30Z',
	title: `Build Your Own Rails Plugin Platform with Desert`,
	slug: 'build-your-own-rails-plugin-platform-with-desert',
	tag_a1: [
		'ruby',
		'rails',
		'open source',
		'pivotal labs',
	],
	description:
		`Create plugins-based platforms for Rails using Desert`,
	canonical_url: 'https://tanzu.vmware.com/content/blog/build-your-own-rails-plugin-platform-with-desert',
})
// @formatter:off
// language=md
export default ()=>md__raw_(`
While it is easy to include plugins in your Rails projects, it isn't easy to extend and customize the plugin for your own application. Desert solves that limitation/complication by making it just as easy to extend or modify a plugin class as it would be with any other class. In this post we will go over how Desert provides an easy way to manage and extend your plugins.

At Pivotal, we offer an integrated platform of Rails plugins named Socialitis.

Socialitis is an internal project that grew out of the observation that many of our start-up clients needed to build the same non-differentiating features; user management, friends/contacts, activity feeds, on-site messaging, etc.

The Socialitis platform is broken up into number of plugins that extend the Rails app in specific ways. These plugins may have dependencies on other plugins.

One of the major design goals of Socialitis is easy, drop-in, integration into existing Rails apps. This means using convention over configuration and removing as much integration responsibility from the user of the plugin as possible.

Another design goal was to provide sensible defaults and make each plugin easy to customize for your app.

We used Desert to achieve these goals, and so can you for your own platform.

The major features that Desert provides are:

- Defining a Rail's like directory structure into your plugin (models, views, controllers, helpers)
- Plugin dependencies
- Seamless overriding of classes and modules defined by parent plugins
- Plugin migrations
- Plugin routing

Desert provides a similar feature set to the Radient plugin system and the now defunct Appable Plugins framework.

For a simple example, lets say you have two plugins, name User and Messaging. The User plugin provides basic authentication and login features, and the Messaging plugin allows Users to send Messages to each other. The Message plugin depends on the User plugin.

The directory structure of the full Rails app looks like:

\`\`\`
|-- app
|   |-- controllers
|   |   |-- application.rb
|   |   \`-- blogs_controller.rb
|   |-- helpers
|   |   |-- application_helper.rb
|   |   \`-- blogs_helper.rb
|   |-- models
|   |   \`-- user.rb
|   \`-- views
|       |-- blogs
|       |-- layouts
|       |   \`-- users.html.erb
|       \`-- users
|           |-- index.html.erb
|           \`-- show.html.erb
|-- db
|   \`-- migrate
|       \`-- 001_migrate_users_to_001.rb
|-- lib
|   \`-- current_user.rb
|-- spec
|   |-- controllers
|   |   \`-- blogs_controller_spec.rb
|   |-- fixtures
|   |-- models
|   |-- spec_helper.rb
|   \`-- views
|       \`-- blogs
\`-- vendor
\`-- plugins
\`-- user
|-- app
|   |-- controllers
|   |   |-- logins_controller.rb
|   |   \`-- users_controller.rb
|   |-- helpers
|   |   |-- logins_helper.rb
|   |   \`-- users_helper.rb
|   |-- models
|   |   |-- login.rb
|   |   \`-- user.rb
|   \`-- views
|       |-- logins
|       |   |-- edit.html.erb
|       |   |-- index.html.erb
|       |   |-- new.html.erb
|       |   \`-- show.html.erb
|       \`-- users
|           |-- edit.html.erb
|           |-- index.html.erb
|           |-- new.html.erb
|           \`-- show.html.erb
|-- config
|   \`-- routes.rb
|-- db
|   \`-- migrate
|       \`-- 001_create_users.rb
|-- init.rb
|-- lib
|   \`-- current_user.rb
|-- spec
|   |-- controllers
|   |   \`-- user_controller_spec.rb
|   |-- fixtures
|   |   \`-- users.yml
|   |-- models
|   |   \`-- user.rb
|   |-- spec_helper.rb
|   \`-- views
|       \`-- users
\`-- tasks
\`-- message
|-- app
|   |-- controllers
|   |   \`-- message_controller.rb
|   |-- helpers
|   |   |-- message_helper.rb
|   |   \`-- user_helper.rb
|   |-- models
|   |   |-- message.rb
|   |   \`-- user.rb
|   \`-- views
|       \`-- messages
|           |-- edit.html.erb
|           |-- index.html.erb
|           |-- new.html.erb
|           \`-- show.html.erb
|-- config
|   \`-- routes.rb
|-- db
|   \`-- migrate
|       \`-- 001_create_messages.rb
|-- init.rb
|-- spec
|   |-- controllers
|   |   |-- message_controller_spec.rb
|   |   \`-- user_controller_spec.rb
|   |-- fixtures
|   |   |-- messages.yml
|   |   \`-- users.yml
|   |-- models
|   |   |-- message_spec.rb
|   |   \`-- user_spec.rb
|   |-- spec_helper.rb
|   \`-- views
|       \`-- messages
\`-- tasks
\`\`\`

The User plugin introduces the various User and Login Rails objects. The Message plugin introduces its respective Message objects. Notice that the Message plugin also reopens some of the User objects to insert functionality.

For example, vendor/plugins/users/app/models/user.rb looks something like:

\`\`\`rb
class User < ActiveRecord::Base
	has_many :logins
end
\`\`\`

The Message plugin would then reopen User in vendor/plugins/message/app/models/user.rb:

\`\`\`rb
class User < ActiveRecord::Base
	has_many :messages_received
	has_many :messages_sent
end
\`\`\`

Meanwhile, the main application can also reopen User in app/models/user.rb

\`\`\`rb
class User < ActiveRecord::Base
	def custom_app_method
		# custom app logic #
	end
end
\`\`\`

Desert allows you to utilize Ruby's ability to repoen classes to layer on functionality in your plugins and application. At Pivotal, we have had success in sharing code across multiple client applications using this technique.

Another thing to note is normally the Message plugin would be loaded before the User plugin. Desert allows you to create plugin dependencies. So in vendor/plugins/message/init.rb:

\`\`\`js
require_plugin 'user'
require_plugin 'will_paginate'
\`\`\`

This means you no longer need to define plugin load order inside of environment.rb. Your plugins can take care of that. Desert works with practically all plugins. That means you can have a plugin dependency on any existing Rails plugin.

To see more examples & documentation, take a look at the Desert project at ${tb_a_({ href: 'https://github.com/pivotalexperimental/desert' })}.
`.trim())
// @formatter:on
