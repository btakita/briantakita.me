import { blog_header__bind } from '@btakita/ui--browser--blog/header'
import { theme__toggle_button__bind } from '@btakita/ui--browser--blog/theme'
import { relement__use } from 'relementjs'
import { browser__relement, hy__bind } from 'relementjs/browser'
relement__use(browser__relement)
hy__bind(
	document, {
		blog_header: blog_header__bind,
		theme_toggle_button: theme__toggle_button__bind,
	})
