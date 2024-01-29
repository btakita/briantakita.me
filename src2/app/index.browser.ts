import { theme__toggle_button_c__bind } from '@btakita/domain--browser--blog/theme'
import { relement__use } from 'relementjs'
import { browser__relement, hy__bind } from 'relementjs/browser'
relement__use(browser__relement)
hy__bind(
	document, {
		theme__toggle_button_c: theme__toggle_button_c__bind
	})
