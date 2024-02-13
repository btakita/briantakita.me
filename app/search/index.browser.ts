import { blog__header__hyop } from '@rappstack/ui--browser--blog/header'
import { blog_search__main__hyop } from '@rappstack/ui--browser--blog/search'
import { theme__toggle_button__hyop } from '@rappstack/ui--browser--blog/theme'
import { relement__use } from 'relementjs'
import { browser__relement, single_hyop } from 'relementjs/browser'
relement__use(browser__relement)
single_hyop(
	document,
	{
		blog__header__hyop,
		blog_search__main__hyop,
		theme__toggle_button__hyop,
	})
