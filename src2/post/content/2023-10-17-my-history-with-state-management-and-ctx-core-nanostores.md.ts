import { post_meta__validate } from '@btakita/domain--any--blog'
import { md__raw_ } from '@btakita/ui--any--blog/md'
import { tb_a_ } from '@btakita/ui--server--blog/anchor'
import { footnote__sup_, footnote_list__div_ } from '@btakita/ui--server--blog/footnote'
import {
	asp__tb_a_,
	astrojs__tb_a_,
	backbonejs__tb_a_,
	c_sharp__tb_a_,
	caltrans__tb_a_,
	cassandra__tb_a_,
	censible__tb_a_,
	communitywalk__tb_a_,
	context__tb_a_,
	craigslist__tb_a_,
	ctx_core__tb_a_,
	definition__tb_a_,
	desertrb__tb_a_,
	domain_driven_design__tb_a_,
	dot_net__tb_a_,
	entity__tb_a_,
	esg__tb_a_,
	existence__tb_a_,
	expressjs__tb_a_,
	flextronics__tb_a_,
	grockit__tb_a_,
	honk__tb_a_,
	ie6__tb_a_,
	jquery__tb_a_,
	linux__tb_a_,
	literate_programming__tb_a_,
	marko__tb_a_,
	martin_investments__tb_a_,
	menu__tb_a_,
	microsoft__tb_a_,
	microstation__tb_a_,
	milyoni__tb_a_,
	monorepo__tb_a_,
	msaccess__tb_a_,
	msoffice__tb_a_,
	myspace__tb_a_,
	nanostores__tb_a_,
	naspp__tb_a_,
	neo__tb_a_,
	news_corp__tb_a_,
	nextjs__tb_a_,
	ontology__tb_a_,
	philosophy__tb_a_,
	php__tb_a_,
	pivotal_labs__tb_a_,
	reactjs__tb_a_,
	redis__tb_a_,
	riotjs__tb_a_,
	rspec__tb_a_,
	ruby__tb_a_,
	ruby_on_rails__tb_a_,
	rundavoo__tb_a_,
	sapper__tb_a_,
	scope__tb_a_,
	signals_react__tb_a_,
	solid_start__tb_a_,
	solidjs__tb_a_,
	sql_server__tb_a_,
	svelte_stores__tb_a_,
	sveltejs__tb_a_,
	tenfore_holdings__tb_a_,
	truecar__tb_a_,
	unison__tb_a_,
	usaa__tb_a_,
	vanjs__tb_a_,
	vite__tb_a_,
	worldview__tb_a_,
	wsj__tb_a_,
	yammer__tb_a_
} from '@btakita/ui--server--briantakita/anchor'
import { type request_ctx_T } from 'rebuildjs/server'
export const meta = post_meta__validate({
	author: `Brian Takita`,
	pub_date: '2023-10-17T15:35:28.259Z',
	title: `My history with reactive state management & how I ended up using ctx-core & nanostores`,
	slug: 'my-history-with-state-management-and-ctx-core-nanostores',
	tag_a1: [
		'ctx-core',
		'nanostores',
		'backbone.js',
		'signals',
		'reactive',
	],
	description:
		`A brief account of my history with state management & the road to building ctx-core & adopting nanostores`
})
// @formatter:off
// language=md
export default (ctx:request_ctx_T)=>md__raw_(`
*This post got long & is a work in progress. I will break it up into smaller posts soon.*

My professional career started during the .com bust in May 2002. I was fresh out of school with a BS in Engineer Physics which included 1 year of paid internships learning about ${msoffice__tb_a_()} & ${microstation__tb_a_()} automation at ${caltrans__tb_a_()} & working on the corporate intranet, which included a CRM system with ${asp__tb_a_()} at ${flextronics__tb_a_()}. I gained an appreciation of automating work & am still strongly driven to automate.

It was a tough time to be an entry-level programmer, as there were layoffs, outsourcing to other countries, job freezes, imploding companies everywhere. I picked up any freelance work that I could find${footnote__sup_({ ctx, id: 'early-freelance-projects' }, [`Some of my favorite projects include a ringtone generator using `, php__tb_a_(), ` & a CRM using using `, c_sharp__tb_a_(), ` `, dot_net__tb_a_(), ` & `, sql_server__tb_a_(), `.`])}. I learned resiliency in uncertain times where money was scarce & using my free time to work on the craft; adopting ${linux__tb_a_()} & exploring ${literate_programming__tb_a_()}. Literate programming is an important early influence as it promotes software code embedded in prose & formatted text. I continue my work on tooling to	support Literate programming with low-code solutions. I was fascinated with this programming language from Japan called ${ruby__tb_a_()} & grew even more excited with this cool alpha web framework called ${ruby_on_rails__tb_a_()}.

I got my first full time job at ${naspp__tb_a_()}. The job consisted of office automation software & maintaining a long-used ${tb_a_({ href: 'https://en.wikipedia.org/wiki/Customer_relationship_management' }, 'CRM')} & order system to manage print & web subscriptions along with events & conference attendee management. It was written in as an old & bogged down due to size ${msaccess__tb_a_()} app, that worked for years. I rewrote the MS Access app in C#, .NET, Sql Server. I managed to sneak in a bit of Ruby as well, writing automated tests in Ruby using the Ruby/.NET bridge to speed up writing & maintaining the tests. 

## Web 2.0, Ruby on Rails, startups

### Pivotal Labs

I was excited to get break into startups & responded to an ad in ${craigslist__tb_a_()} by Jared Cosulich to collaborate on his startup ${communitywalk__tb_a_}. I helped with some features & bug fixes. He was working on funding & worked as a resident entrepreneur at ${pivotal_labs__tb_a_()}. I was introduced to Rob Mee, Sherry Erskine, the team with a brand new Ruby on Rails practice.

I joined Pivotal Labs (it was Pivotal Computing Systems back then). Pivotal Labs had many talented engineers. Nathan Wilmes, Nathan Sobo, Nick Kallen, in particular, pushed me to become a better more innovative developer.

I started working with reactive programming since collaborating with Nathan Sobo on a ruby project called ${unison__tb_a_()} at ${grockit__tb_a_}. ${tb_a_({ href: 'https://en.wikipedia.org/wiki/Reactive_programming' }, 'Reactive')} ${tb_a_({ href: 'https://en.wikipedia.org/wiki/State_management' }, 'state management')} clicked for me, as the paradigm allows state to be composed of functions with reactive inputs & a single output.

I was a core contributor to the Behavior Driven Development library ${rspec__tb_a_()} & championed/developed the first (that I know of) implementation of nested \`describe\` statements${
	footnote__sup_({ ctx, id: 'nested-describe-statements' }, md__raw_(
	// language=md
	`This pattern is still used in some testing libraries today. It was a practical solution paired along with describing nested context along with \`beforeEach\` & \`afterEach\`. Given my inclination to flatten architecture, helper functions, the development of ${tb_a_({ href: '/posts/tag-vector-0-introduction' }, 'Tag Vectors')}, I now prefer to keep the test structure flat.
	`.trim()))
}. I also worked on various open source projects focused on terse apis & Domain Driven Design

I worked with creating composable plugins while working on ${desertrb__tb_a_()}, which was the core of Pivotal's set of composable "social software" plugins. I got exposure to coherently managing multiple libraries in a single domain; some of these led to ${monorepo__tb_a_('monorepo')} patterns that	I use today.

There were many projects that I had the fortune to be a part of at Pivotal, so it deserves it's own post. While I got exposure to some of the best in the industry, many early stage start up projects, innovative open source projects, was well respected, had some great friendships. After 4 years with Pivotal, I wanted to be with a company & maintain a code base for the long run. I wanted to go deeper with maintaining single codebase to grow in my practice.

My final project @ Pivotal was with ${honk__tb_a_()}. I liked working with the founders, Tom Taira, Stephanie Lacrosse, Bruce Krysiak. It was a smooth transition to be the Lead Product Developer on the product.

### Honk

Honk was an automotive social information & sales startup. Honk built in social reviews, market price comparison, vehicle information, preference matching to autos tools.

While working with ${backbonejs__tb_a_()} at Honk, I found that state management was effective in maintaining complex apps.

Tom & Stephanie have a long track record & deep connections in the automotive & automotive web industry. A partnership with ${atb_news_corp_()}, building auto buying components, even providing an office in the ${atb_myspace_()} building. Honk also created the auto buying portal through a partnership with ${atb_wsj_()} & ${atb_usaa_()}.

Work consisted of long hours to push out releases. I enjoyed the work though I was beginning to burn out & my personal life was starting to fray. I sought to work from home & was not permitted to.

Around the time News Corp was going through the sale of My Space among other structural changes to it's Digital Division, the key partnership with News Corp was ending. Honk then pivoted to be acquired by ${atb_truecar_()}.

Around the time News Corp was going through the sale of My Space among other structural changes to it's Digital Division, the key partnership with News Corp was ending. Honk then pivoted to be acquired by ${atb_truecar_()}.	The stagnancy, grind of long hours, releases led me to look elsewhere for work. I got a job offer to work with ${atb_yammer_()} led by Davis Sacks. I decided to stay with Honk, feeling sense of loyalty to stay onboard with	the acquisition to TrueCar. I told David Sacks I will not be signing the offer; he told me "you are making a mistake". Given the early usage of node.js, ${atb_cassandra_()}, the eventual acquisition by ${atb_microsoft_()}, he is correct from the perspective of achieving business success.

### Move to LA

LA appealed to me & I moved south to work @ TrueCar.

### TrueCar

Going from the startup Honk to integrating into the culture at TrueCar was tough. Working within a deep corporate structure, with constrained tech options on fringe projects is not for everyone. After working long hours for partnership accounts. I burn out & we parted ways. Perhaps I should have taken the Yammer job after all, but at least I was in LA.

## Independent contracting & evolution of the practice

### Milyoni

My first independent contract began with the then "social entertainment" startup ${atb_milyoni_()} (pronounced million-eye) located in Pleasanton, CA. Milyoni had a Rails app supporting Video on Demand & Live Online Events	with time-coded chat & components synchronized with the Video on Demand. Live events had real-time chat & components. Ruby, being a relatively slow language, did not scale to support large online events. In light of the	performance issues, I developed a chat & component server built in node.js & ${atb_redis_()}, which handled the traffic well. When I began the project, we made an agreement with one of the founders that I would be working	remotely in LA, where I lived. I agreed to move up to the Bay Area to help build the young team along with my old	employer, Pivotal Labs. This lasted about a year. I had personal matters to take care of back in LA but the manager of the project wanted me on site, so I left.

### Rundavoo

I then joined ${atb_rundavoo_()} & created ${tb_a_({ href: '/posts/backbone-signal-practical-reactive-programming-javascript'}, 'backbone-signal')} as a	library for reactive state management, which I used with ${atb_riotjs_()} to render the front-end. I joined the company fairly late, sadly it was having funding issues. I stayed onboard as everyone else left hoping to help	rescue the company with a lean staff. Sadly, Rundavoo ended up folding & I was owed a sizable outstanding balance.

Out of paying work, I went on a personal journey of sorts, visiting up & down the West Coast. During this journey, my ${atb_worldview_('worldview')} expanded by experimenting with the ${atb_ontology_('ontological')} expression of a ${atb_philosophy_()}. During this exploration, I explored how word ${atb_definition_('definitions')} can be ${atb_scope_('scoped')} with ${atb_context_('context')}${
	footnote__sup_({ ctx, id: 'context-of-entity' },
		// language=md
		md__raw_(`Taking into account that what is spoken & what is heard is defined with the context of the ${atb_entity_('entity')} speaking or hearing.`))
}. I learned about ${atb_existence_()} and in a weird way ${tb_a_({ href: '/posts/everything-exists' }, 'Everything Exists')}.

## ${atb_neo_()}

I then continued consulting & a few years later I consulted with the previous incarnation of ${atb_neo_()}. The client was ${atb_tenfore_holdings_()}. The project was a document editor with inline commands that integrated with the Tenfore Salesforce database. Neo shut down operations as it was going through an acquisition.

### Censible

I then consulted for ${atb_censible_()}, which pivoted from a ${atb_esg_()} Investment platform targeting millennials to apps presenting company ESG information, a stock screener, a portfolio rebalance tool. With the rapid pivoting of products, I created the ${atb_ctx_core_()} project to expand on reactive state management with ${atb_domain_driven_design_()}. I leaned on my explorations with Ontology create the tag vector Convention${
	footnote__sup_({ ctx, id: 'tag-vector-development-continues' },
	`Work on the tag vector Convention continues. Through much iteration, it reached a stable design in 2020. This design has been verified with real-world development since. I will write a formal definition & history soon.`)
} to enable a simple, flat architecture. We also switched from riotjs\`-->\`${atb_sveltejs_()}.

I appreciated the design of ${atb_svelte_stores_()} & for reactive state management. With the introduction of ${atb_sapper_()} the same component code could be run on the browser & the server. Along with ctx-core, svelte stores could also be run on the browser & server. The server side was tricky with svelte stores alone, as requests would be handled concurrently. To solve the issue, a \`ctx\`(context) object would be created when the server request starts. A \`Be\` function would take the \`ctx\` & to store the value returned by the \`Be\`, which would be the svelte store.

The Censible project was off & on for a few years. During this time I picked up some other projects including ${atb_menu_()} & ${tb_a_({ href: 'https://github.com/btakita/iron-henhouse' }, 'an app')} to report voter suppression & info on how to exercise the right to vote for the 2016 Democrat primary election${
	footnote__sup_({ ctx, id: 'suppressthis-org' },
	`The app was launched as suppressthis.org. It is no longer online.`)
}, various other small sites. After Censible, I now collaborate with a related ESG financial advisor ${atb_martin_investments_()}.

ctx-core continued to evolve, from git submodules added to a project to a set of > 100 npm packages. The preferred software stack changed:

* from riotjs with Backbone.js stores on a custom ${atb_expressjs_()} server
* to sveltejs with svelte stores & sapper
* to ${atb_solidjs_()} with ${atb_nanostores_()} & ${atb_solid_start_()}
* to solidjs with Nano Stores & ${atb_astrojs_()}

## Now

I remarried & we have a beautiful daughter.

## Why not use React?

The javascript world in late 2010s & early 2020s had much in it's move away from ${atb_jquery_()} & Backbone. js toward SPA libraries. ${atb_reactjs_()} became the dominant front-end component rendering library.

${tb_a_({ href: 'https://dev.to/this-is-learning/how-react-isn-t-reactive-and-why-you-shouldn-t-care-152m' }, `React is not Reactive`)} by default. There are libraries that can add reactivity to React, like NanoStores & ${atb_signals_react_()}. React works with the virtual dom where I would rather work with the real DOM. Along with a ${tb_a_({ href: 'https://dev.to/joetex/react-why-so-complicated-3dc7' }, 'complicated API')} & a need for many dependencies to extend it's default behavior, I never got into React. I still cannot force myself to use React. It's not a natural fit to my mental model of developing web apps. I have grown to appreciate	contributions made by the React ecosystem.

I prefer small & performant libraries, ideally supporting server-side rendering (SSR), which is why I was interested in riot.js (not SSR), sveltejs, solidjs, vanilla js. ${atb_vanjs_()} looks a promising vanilla js library which supports SSR${
	footnote__sup_({ ctx, id: 'vanjs-tradeoff' },
		`VanJS is great for small component trees such as when embedding javascript components. When reactive state
		changes in VanJS, it re-renders the component by default, allowing custom code to update the existing DOM. For
		large stateful component trees, a component library with declarative state management (SolidJS, Svelte, React,
		etc.) is more practical.`)
}.

## Multi Page Apps (MPA)\`->\`Single Page App (SPA) hybrids\`->\`Multi Page Apps

Ruby on Rails is a MPA with progressive enhancement support. It's Javascript integration has been a work in progress throughout the history of Rails. However, it cannot match the browser/server integrated development	experience of isomorphic Javascript web frameworks. In the earlier days of Javascript component libraries, the Single Page App use case was emphasized. While there were some attempts at lean isomorphic Multi-page App libraries such as ${atb_marko_()}, most of the javascript community focused on front-end Single Page App	development, de-emphasizing Full Stack Development. Libraries such as ${atb_nextjs_()}, ${atb_sapper_()}	(superceded by ${atb_sveltejs_()}), ${atb_solid_start_()} added SSR progressive rendering to a SPA client side router. With the advent of libraries such as ${atb_astrojs_()} isomorphic Javascript MPA development gained prominence. Marko was built almost a decade earlier, but Astro has gained significant popularity. Astro	files are server-side rendered only. Astro's integration with many SSR + CSR component libraries makes it	practical to have a full stack web app project across multiple libraries.

### Hydration

Back during my time at Honk.com, I created a Rails library that provided a rich hydration api the Backbone.js model in the browser. Rails, being a MPA written in Ruby, needed a way to efficiently send data from the server to the browser during the page load. When moving to Javascript/Typescript SPAs, the component libraries were focused on being a SPA library first & would have a separate progressive web app library to render the components on both the server & the browser. They would bundle in a hydration library, which seems great. However, the general purpose hydration libraries would be development intensive, opaque, bloated, slow, unreliable, often hydrates too much of
the component tree.

Astrojs provides ${tb_a_({ href: 'https://docs.astro.build/en/guides/client-side-scripts/#client-side-scripts' }, `client side builds`)}, an independent browser build with the code inside of the \`<script></script>\` tag. The Astrojs team	pointed out techniques such as ${tb_a_({ href: 'https://docs.astro.build/en/reference/directives-reference/#definevars' }, `passing variables`)} into the \`<script></script>\` tags & ${tb_a_({ href: 'https://docs.astro.build/en/guides/client-side-scripts/#pass-frontmatter-variables-to-scripts'}, `hydrating data using Web Components`)}. These tools make it practical to develop targeted custom code that is efficient in payload size & execution,	transparent in it's logic, free of complex dependencies.

### Technological Churn

The Rails/Ruby community & the Javascript community come from different roots. I had inside exposure with the Ruby on Rails community, seeing the ecosystems from different perspectives. During the rise & heyday of Rails, we saw Web 2.0 startups & the \`(a)gile->(A)gile\`${
	footnote__sup_({ ctx, id: 'agile_Agile' },
		md__raw_(
			// language=md
			`\`agile->Agile\` lower-case \`a\` to capital \`A\`. As the agile movement gained success from it's bottom up software practitioner roots, Agile transition to a top down institutional endeavor with the prominence of coaches, guidelines, corporate sponsored conferences, etc.`.trim()))
} transition. Emerging web standards made jQuery more or less redundant. I been through two celebrations to end ${atb_ie6_()} @ Honk then again @ TrueCar in 2010 while many other companies already stopped supporting the old	browser. Specialized development (front end developer, api developer) took prominence in corporations. Full Stack development was delegated to these departments. Even startups divided their development teams into these roles.

> Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the
> organization's communication structure.
> — Melvin E. Conway

As the front-end developers built their tooling & architectures, Single Page Apps gained prominence. The lessons learn with MPAs, such as Rails & Marko did not factor into the early development. Early SPA developers coming from Full Stack backgrounds, yearned to fix the browser/server integration issues with full stack frameworks through the SPA. A clean client/server break.

Of course history often rhymes & some of the same issues that plagued client-server programming in the early 1990s which led to web development \`cgi->server markup languages->web frameworks\`. Large javascript payloads, SEO, chatty apis, caching, hydration, etc. With Astrojs, the trade-off between build tools, ${tb_a_({ href: 'https://cleancommit.io/blog/spa-vs-mpa-which-is-the-king/' }, `MPAs vs SPAs`)}, ${tb_a_({ href: 'https://jamstack.org/' }, `Jamstack`)}, ${tb_a_({ href: 'https://dev.to/this-is-learning/understanding-transitional-javascript-apps-27i2'}, `Transitional Apps`)} came into discussion. All of these innovations improved the ${tb_a_({ href: 'https://github.blog/2023-06-08-developer-experience-what-is-it-and-why-should-you-care/' }, `Development eXperience (DX)`)}. ${atb_vite_()} brought standardized Hot Module Reloading which SPA & Transitional App libraries could use. Astrojs enabled further integration with component libraries & it's own router to support a consistent along different component libraries MPA development. 

### Dependencies & Migrations

As a developer sees many seasons, technologies change, fads emerge, maintaining apps based on old tech, migrating to the latest set of development practices. Migration takes effort as there are differences between the domain of the older & newer tech. A framework may go through large transitions throughout it's lifetime. Techniques to make content & software easier to migrate save effort & time.

I developed ctx-core to be a consistent project to keep patterns & libraries supporting context dependency injection, reactivity, & other tools to remain consistent during migration. Tag Vector enables the domain architecture to remain flat & independent of software architecture. As the tech ecosystem changes & migrations are needed, cohesive libraries under the programmer's control can aid in the transition.

# Next Steps

This post is long & covered more than the original intent. Graphs of detail provide context but add to length & create rabbit-holes. I will end this post for now & extract out posts over the next few weeks.

${footnote_list__div_({ ctx })}
`.trim())
// @formatter:on
