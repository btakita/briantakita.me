# briantakita.me
briantakita.me website

## Development

### Download assets

```sh
bun -b assets--download
```

### Upload assets

```sh
bun -b assets--upload
```

### Regenerate post index

After adding, removing, or renaming post files in `post/content/`:

```sh
bun post/index.generate.ts
```

This scans `post/content/` for date-prefixed files and writes `post/index.ts` with `post_mod_a1` imports.

**Note:** Do not use `generate-index-js` for `post/content/` — barrel `export *` causes `meta_` name collisions since all posts export the same names.
