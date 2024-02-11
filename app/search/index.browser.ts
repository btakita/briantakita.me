import { blog_header__bind } from '@rappstack/ui--browser--blog/header'
import { blog_search__main__bind } from '@rappstack/ui--browser--blog/search'
import { theme__toggle_button__bind } from '@rappstack/ui--browser--blog/theme'
import { relement__use } from 'relementjs'
import { browser__relement, single_hyop } from 'relementjs/browser'
relement__use(browser__relement)
single_hyop(
	document,
	{
		blog_header: blog_header__bind,
		blog_search__main: blog_search__main__bind,
		theme_toggle_button: theme__toggle_button__bind
	})
