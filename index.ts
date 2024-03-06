import { build } from './build.js'
import { config__init } from './config.js'
await config__init()
await build()
