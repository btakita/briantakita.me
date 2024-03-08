import { build } from './build.js'
import { config__init } from './config/index.js'
config__init()
await build()
