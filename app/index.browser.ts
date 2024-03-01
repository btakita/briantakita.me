import * as blog__header__hyops from '@rappstack/ui--browser--blog/header/hyop'
import * as theme__toggle_button__hyops from '@rappstack/ui--browser--blog/theme/hyop'
import { hyop } from 'relementjs/browser/hy'
window.addEventListener('load', ()=>{
	hyop(document, {
		...blog__header__hyops,
		...theme__toggle_button__hyops,
	})
})
