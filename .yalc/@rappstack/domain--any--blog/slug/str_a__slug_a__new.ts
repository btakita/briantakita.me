import { slug__new } from './slug__new.js'
export function str_a__slug_a__new(str_a:string[]) {
	return str_a.map(str=>slug__new(str))
}
