import * as blog_header__hyops from '@rappstack/ui--browser--blog/header/hyop'
import * as blog_search__hyops from '@rappstack/ui--browser--blog/search/hyop'
import * as blog_theme__hyops from '@rappstack/ui--browser--blog/theme/hyop'
import { relement__use } from 'relementjs'
import { browser__relement, hyop } from 'relementjs/browser'
window.addEventListener('load', ()=>{
	relement__use(browser__relement)
	hyop(document, {
		...blog_header__hyops,
		...blog_search__hyops,
		...blog_theme__hyops,
	})
})
