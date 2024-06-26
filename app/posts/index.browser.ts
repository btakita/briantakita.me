import * as layout__hyops from '@btakita/ui--browser--briantakita/layout/hyop'
import * as blog_footnote__hyops from '@rappstack/ui--browser--blog/footnote/hyop'
import * as blog_header__hyops from '@rappstack/ui--browser--blog/header/hyop'
import * as blog_post__hyops from '@rappstack/ui--browser--blog/post/hyop'
import { hyop } from 'relementjs/browser'
window.addEventListener('load', ()=>{
	hyop(document, {
		...layout__hyops,
		...blog_footnote__hyops,
		...blog_header__hyops,
		...blog_post__hyops,
	})
})
