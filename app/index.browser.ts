import * as layout__hyops from '@btakita/ui--browser--briantakita/layout/hyop'
import * as footnote__hyops from '@rappstack/ui--browser--blog/footnote/hyop'
import * as blog_header__hyops from '@rappstack/ui--browser--blog/header/hyop'
import { hyop } from 'relementjs/browser/hy'
window.addEventListener('load', ()=>{
	hyop(document, {
		...layout__hyops,
		...blog_header__hyops,
		...footnote__hyops,
	})
})
