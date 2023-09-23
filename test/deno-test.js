globalThis.global = globalThis

globalThis.process = {}

delete globalThis.Deno

import('./node-test.js')
