import { build } from './build.ts'
await build({
	rebuildjs: { watch: false },
	rhonojs: { app__start: true }
})
