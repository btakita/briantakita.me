import * as blog_header__hyops from '@rappstack/ui--browser--blog/header/hyop'
import * as blog_post__hyops from '@rappstack/ui--browser--blog/post/hyop'
import * as blog_theme__hyops from '@rappstack/ui--browser--blog/theme/hyop'
import { hyop } from 'relementjs/browser'
window.addEventListener('load', ()=>{
	hyop(document, {
		...blog_header__hyops,
		...blog_post__hyops,
		...blog_theme__hyops,
	})
})
