import type {
	AboutPage,
	ContactPage,
	DefinedTerm,
	ImageObject,
	Occupation,
	Organization,
	Person,
	Thing,
	WebSite
} from '@btakita/schema-dts'
import { app_jsonld__add } from '@rappstack/domain--server/jsonld'
import { ns_id_be_ } from 'ctx-core/rmemo'
import { url__join } from 'ctx-core/uri'
import logo_svg from '../public/assets/images/logo.svg'
import { blog_site } from './blog.js'
import { social_a1 } from './social.js'
const { author, title, website } = blog_site
export const jsonld_WebSite_ = ns_id_be_('app', 'jsonld_WebSite', ctx=>{
	return app_jsonld__add(ctx, <WebSite>{
		'@type': 'WebSite',
		'@id': url__join(website, '#WebSite'),
		url: website,
		name: title,
		publisher: jsonld_Person_(ctx),
	})
})
export const jsonld_Organization_ = ns_id_be_('app', 'jsonld_Organization', ctx=>{
	return app_jsonld__add(ctx, <Organization>{
		'@type': 'Organization',
		'@id': url__join(website, '#Organization'),
		url: website,
		name: title,
		logo: logo_jsonld_ImageObject_(ctx)
	})
})
export const logo_jsonld_ImageObject_ = ns_id_be_('app', 'logo_jsonld_ImageObject', ctx=>{
	return app_jsonld__add(ctx, <ImageObject>{
		'@type': 'ImageObject',
		'@id': url__join(website, '#logo'),
		url: url__join(website, logo_svg),
		width: '256px',
		height: '256px',
	})
})
export const jsonld_AboutPage_ = ns_id_be_('app', 'jsonld_AboutPage', ctx=>{
	return app_jsonld__add(ctx, <AboutPage>{
		'@type': 'AboutPage',
		'@id': url__join(website, 'about', '#AboutPage'),
		url: url__join(website, 'about'),
		name: author + ' Summary',
		about: jsonld_Person_(ctx),
		inLanguage: 'en-us',
		isPartOf: jsonld_WebSite_(ctx)
	})
})
export const jsonld_ContactPage_ = ns_id_be_('app', 'jsonld_ContactPage', ctx=>{
	const jsonld_ContactPage_id = url__join(website, '#ContactPage')
	return app_jsonld__add(ctx, <ContactPage>{
			'@type': 'ContactPage',
			'@id': jsonld_ContactPage_id,
			url: jsonld_ContactPage_id,
			name: 'Contact ' + author,
			inLanguage: 'en-us',
			isPartOf: jsonld_WebSite_(ctx),
			about: jsonld_Person_(ctx),
			mainEntity: jsonld_Person_(ctx)
		}
	)
})
export const jsonld_Person_ = ns_id_be_('app', 'jsonld_Person', ctx=>{
	return app_jsonld__add(ctx, <Person>{
		'@type': 'Person',
		'@id': url__join(website, '#Person'),
		url: website,
		name: author,
		image: 'https://gravatar.com/avatar/a0599814ceddc2e283792f4e47c57f5e',
		alumniOf: uop_jsonld_Organization_(ctx),
		jobTitle: full_stack_engineer_jsonld_DefinedTerm_(ctx),
		knowsAbout: [
			typescript_jsonld_Thing_(ctx),
			javascript_jsonld_Thing_(ctx),
		],
		hasOccupation: [
			sr_full_stack_engineer_jsonld_Occupation_(ctx),
			digital_marketer_jsonld_Occupation_(ctx),
		],
		sameAs: [
			...social_a1.filter(social=>social.active).map(social=>social.href),
			'https://linktr.ee/briantakita',
			'https://www.youtube.com/channel/UC3gg23rxm1sM43sQWRGKEqQ',
			'https://twitter.com/BrianTakita/',
			'https://www.instagram.com/briantakita/',
			'https://www.facebook.com/brian.takita',
			'https://www.crunchbase.com/person/brian-takita',
			'https://angel.co/brian-takita',
			'https://authory.com/BrianTakita',
			'https://dev.to/btakita',
			'https://www.npmjs.com/~btakita',
			'https://en.wikipedia.org/wiki/User:Btakita',
			'https://www.wikidata.org/wiki/User:Briantakita',
			'https://en.wiktionary.org/wiki/User:Btakita',
			'https://briantakita.tumblr.com/',
			'https://stackoverflow.com/users/142571/brian-takita3',
			'https://security.stackexchange.com/users/294675/brian-takita',
			'https://ossrank.com/c/70584-brian-takita',
			'https://www.slideshare.net/brian_takita',
			'https://www.pinterest.com/briantakita/',
			'https://www.quora.com/profile/Brian-Takita',
			'https://substack.com/@btak',
			'https://www.tiktok.com/@briantakita',
			'https://about.me/brian_takita',
			'https://www.reddit.com/user/briantakita/',
			'https://soundcloud.com/brian-takita',
			'https://www.behance.net/briantakita',
			'https://gravatar.com/btakita',
			'https://disqus.com/by/brian_takita/',
			'https://briantakita.weebly.com/',
			'https://brian-takita.blogspot.com/',
			'https://intellij-support.jetbrains.com/hc/en-us/profiles/1379237172-Brian-Takita',
			'https://medium.com/@briantakita',
			'https://mix.com/briantakita',
			'https://www.meetup.com/Los-Angeles-Gophers/members/109554982',
			'https://foursquare.com/briant9631966',
			'https://www.diigo.com/profile/briantakita',
			'https://www.slideshare.net/BrianTakita',
			'https://deep-cut.fm/profile/65e7579ec4c0c5001eddebb0',
			'https://www.last.fm/user/briantakita',
			'https://huggingface.co/btak/',
			'https://briantakita.wordpress.com/',
			'https://hashnode.com/@btakita',
			'https://www.flickr.com/photos/27218486%40N02',
			'https://community.cloudflare.com/badges/29/hot-link?username=brian.takita',
			'https://stocktwits.com/briantakita',
			'https://briantakita.brandyourself.com/',
		],
	})
})
export const typescript_jsonld_Thing_ = ns_id_be_('app', 'typescript_jsonld_Thing', ctx=>{
	return app_jsonld__add(ctx, <Thing>{
		'@type': 'Thing',
		'name': 'Typescript',
		alternateName: 'ts',
		sameAs: 'https://www.typescriptlang.org/'
	})
})
export const javascript_jsonld_Thing_ = ns_id_be_('app', 'javascript_jsonld_Thing', ctx=>{
	return app_jsonld__add(ctx, <Thing>{
		'@type': 'Thing',
		'name': 'Javascript',
		alternateName: 'js',
		sameAs: 'https://developer.mozilla.org/en-US/docs/Web/javascript/'
	})
})
export const sr_full_stack_engineer_jsonld_Occupation_ = ns_id_be_('app', 'sr_full_stack_engineer_jsonld_Occupation',
	ctx=>{
		const full_stack_engineer_description = 'Develops many interoperable apps + open source libraries that are simple & small in size. Creates flat architectures that scale large & small. These libraries & apps build on each other. Reactive programming with general purpose contexts. Precise & scalable domain ontology. These techniques remove incidental complexity & bloat that come with other programming paradigms.'
		return app_jsonld__add(ctx, <Occupation>{
			'@type': 'Occupation',
			name: 'Sr. Full Stack Engineer',
			description: full_stack_engineer_description,
			qualifications: full_stack_engineer_description,
		})
	})
export const digital_marketer_jsonld_Occupation_ = ns_id_be_('app', 'digital_marketer_jsonld_Occupation', ctx=>{
	const digital_marketer_description = 'Performs full-featured Digital Marketing Services. Excels at creating engaging websites/apps, technical SEO, & automating systems.'
	return app_jsonld__add(ctx, <Occupation>{
		'@type': 'Occupation',
		name: 'Digital Marketer',
		description: digital_marketer_description,
		qualifications: digital_marketer_description,
	})
})
export const uop_jsonld_Organization_ = ns_id_be_('app', 'uop_jsonld_Organization', ctx=>{
	return app_jsonld__add(ctx, <Organization>{
		'@type': 'Organization',
		name: 'University of the Pacific',
		'@id': 'https://www.wikidata.org/wiki/Q630226'
	})
})
export const full_stack_engineer_jsonld_DefinedTerm_ = ns_id_be_('app', 'full_stack_engineer_jsonld_DefinedTerm', ctx=>{
	return app_jsonld__add(ctx, <DefinedTerm>{
		'@type': 'DefinedTerm',
		'name': 'Full Stack Engineer',
		'alternateName': 'Full Stack Web Developer',
		'sameAs': 'https://www.coursera.org/articles/full-stack-engineer'
	})
})
