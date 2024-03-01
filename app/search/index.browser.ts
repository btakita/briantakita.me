import * as blog__header__hyops from '@rappstack/ui--browser--blog/header/hyop'
import * as blog_search__main__hyops from '@rappstack/ui--browser--blog/search/hyop'
import * as theme__toggle_button__hyops from '@rappstack/ui--browser--blog/theme/hyop'
import { relement__use } from 'relementjs'
import { browser__relement, hyop } from 'relementjs/browser'
window.addEventListener('load', ()=>{
	relement__use(browser__relement)
	hyop(document, {
		...blog__header__hyops,
		...blog_search__main__hyops,
		...theme__toggle_button__hyops,
	})
})
