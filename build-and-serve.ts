import { build } from './build.ts'
await build({
	rebuildjs: { watch: false },
	relysjs: { app__start: true }
})
