# Migration from V2

V3 is a major release that requires TypeScript 6.0 or later.

TypeScript 6 aligns its defaults with the strict-by-default philosophy that this package has always followed. As a result, the base config is now leaner — options that are now TS6 defaults have been removed, and `isolatedModules` was dropped since it is implied by `verbatimModuleSyntax`.

## Changes

- **TypeScript 6 is required** — there is no backward compatibility with TS5
- **Removed `strict: true`** — now a TS6 default
- **Removed `esModuleInterop: true`** — safe interop behavior is always on in TS6
- **Removed `isolatedModules: true`** — implied by `verbatimModuleSyntax`
- **Removed commented-out `baseUrl`** — deprecated in TS6

## Ambient Types

TS6 defaults `types` to `[]`, meaning `@types/*` packages are no longer auto-included. If your project depends on ambient type packages, you need to explicitly add them to your tsconfig:

```json
{
  "extends": "@codecompose/typescript-config/base",
  "compilerOptions": {
    "types": ["node"]
  }
}
```

This aligns with the strict-by-default philosophy — type dependencies should be explicit.
