import * as layout__hyops from '@btakita/ui--browser--briantakita/layout/hyop'
import * as blog_header__hyops from '@rappstack/ui--browser--blog/header/hyop'
import * as blog_search__hyops from '@rappstack/ui--browser--blog/search/hyop'
import { relement__use } from 'relementjs'
import { browser__relement, hyop } from 'relementjs/browser'
window.addEventListener('load', ()=>{
	relement__use(browser__relement)
	hyop(document, {
		...layout__hyops,
		...blog_header__hyops,
		...blog_search__hyops,
	})
})
