export function slug__new(str:string) {
	return str
		.replaceAll(' ', '-')
		.replaceAll(/[^a-zA-Z0-9_-]/g, '')
}
