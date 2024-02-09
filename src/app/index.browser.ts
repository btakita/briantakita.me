import { blog_header__bind } from '@rappstack/ui--browser--blog/header'
import { theme__toggle_button__bind } from '@rappstack/ui--browser--blog/theme'
import { hy__bind } from 'relementjs/browser/hy'
hy__bind(
	document, {
		blog_header: blog_header__bind,
		theme_toggle_button: theme__toggle_button__bind,
	})
