import { blog__ctx__new } from '@btakita/domain--all--blog'
import { globalThis__prop__ensure } from '@ctx-core/object'
export const browser__ctx__ensure = globalThis__prop__ensure(
	'browser__ctx__ensure',
	()=>()=>globalThis__prop__ensure(
		'browser__ctx', ()=>browser__ctx__new()))
function browser__ctx__new() {
	return blog__ctx__new()
}