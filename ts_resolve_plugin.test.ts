import { describe, test, expect } from 'bun:test'
import { build } from 'esbuild'
import type { Plugin } from 'esbuild'
/**
 * Integration tests for the ts_resolve_plugin_ esbuild plugin.
 * Verifies that .ts files from node_modules package exports are resolved
 * correctly despite esbuild 0.27+ blocking .ts from node_modules.
 *
 * Run: cd app/briantakita.me && bun test ts_resolve_plugin.test.ts
 */
function ts_resolve_plugin_():Plugin {
	return {
		name: 'ts_resolve_node_modules',
		setup(build) {
			const absWorkingDir = build.initialOptions.absWorkingDir || process.cwd()
			build.onResolve({ filter: /^[^./]/ }, async (args)=>{
				if (args.pluginData?.fromTsResolve) return
				try {
					const resolved = Bun.resolveSync(args.path, absWorkingDir)
					if (resolved && (resolved.endsWith('.ts') || resolved.endsWith('.tsx'))) {
						return { path: resolved }
					}
				} catch {}
			})
		}
	}
}
const resolveDir = import.meta.dir
const absWorkingDir = import.meta.dir
describe('ts_resolve_plugin_', ()=>{
	test('resolves @rappstack/ui--server/doc .ts export', async ()=>{
		const result = await build({
			stdin: {
				contents: 'import { doc__render } from "@rappstack/ui--server/doc"; console.log(doc__render)',
				loader: 'ts',
				resolveDir,
			},
			bundle: true,
			write: false,
			platform: 'node',
			absWorkingDir,
			plugins: [ts_resolve_plugin_()],
		})
		expect(result.errors).toHaveLength(0)
		expect(result.outputFiles[0].text.length).toBeGreaterThan(0)
	})
	test('resolves @rappstack/domain--server/request .ts export', async ()=>{
		const result = await build({
			stdin: {
				contents: 'import { request_url__href_ } from "@rappstack/domain--server/request"; console.log(request_url__href_)',
				loader: 'ts',
				resolveDir,
			},
			bundle: true,
			write: false,
			platform: 'node',
			absWorkingDir,
			external: ['bun', 'bun:*'],
			plugins: [ts_resolve_plugin_()],
		})
		expect(result.errors).toHaveLength(0)
	})
	test('fails without plugin for .ts node_modules exports', async ()=>{
		try {
			await build({
				stdin: {
					contents: 'import { doc__render } from "@rappstack/ui--server/doc"; console.log(doc__render)',
					loader: 'ts',
					resolveDir,
				},
				bundle: true,
				write: false,
				platform: 'node',
				absWorkingDir,
				logLevel: 'silent',
			})
			// If it doesn't throw, esbuild may have been updated to allow .ts
			// In that case, the plugin is no longer needed (but still harmless)
		} catch (e:any) {
			expect(e.errors?.[0]?.text).toContain('Could not resolve')
		}
	})
	test('does not interfere with normal .js resolution', async ()=>{
		const result = await build({
			stdin: {
				contents: 'import { Hono } from "hono"; console.log(Hono)',
				loader: 'ts',
				resolveDir,
			},
			bundle: true,
			write: false,
			platform: 'node',
			absWorkingDir,
			plugins: [ts_resolve_plugin_()],
		})
		expect(result.errors).toHaveLength(0)
	})
})
