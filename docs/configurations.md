# Configurations

## base

The foundation for all other configurations. Use this for anything non-specific, like a CLI tool or E2E test suite.

```json
{
  "extends": "@codecompose/typescript-config/base"
}
```

Key options:
- `target`: `esnext`
- `module`: `preserve`
- `verbatimModuleSyntax`: `true`
- `noUncheckedIndexedAccess`: `true`
- `noImplicitOverride`: `true`
- `erasableSyntaxOnly`: `true`
- `incremental`: `true`
- Path aliases `~/`, `@/`, and `#/` for `src`

## library

For standalone libraries that are not part of a monorepo. Extends `base` with `noEmit: true`, since your bundler handles all output.

```json
{
  "extends": "@codecompose/typescript-config/library"
}
```

## library-isomorphic

For standalone libraries that target multiple Web-standards runtimes — browser, React Native, Cloudflare Workers, Deno, Bun, or modern Node. Extends `library` with the DOM lib added so global WHATWG types (`fetch`, `Response`, `Headers`, etc.) are available without leaking runtime-specific bindings.

```json
{
  "extends": "@codecompose/typescript-config/library-isomorphic"
}
```

## library-react

For standalone React component libraries. Extends `base` with DOM libs, JSX support (`react-jsx`), and `noEmit: true`.

```json
{
  "extends": "@codecompose/typescript-config/library-react"
}
```

## shared-library

For shared libraries in a monorepo. Extends `base` with `composite`, `declaration`, and `declarationMap` enabled to support [project references](/project-references).

```json
{
  "extends": "@codecompose/typescript-config/shared-library"
}
```

## shared-library-react

For shared React component libraries in a monorepo. Combines React support with the composite settings needed for [project references](/project-references).

```json
{
  "extends": "@codecompose/typescript-config/shared-library-react"
}
```

## nextjs

For Next.js applications. Extends `base` with `jsx: preserve`, DOM libs, the Next.js plugin, and adjusted `rootDir`/`include` paths to match Next.js conventions.

```json
{
  "extends": "@codecompose/typescript-config/nextjs"
}
```

## service-node

For backend services running on Node.js — API servers, cloud functions, long-running daemons. Extends `base` with `noEmit: true` and `types: ["node"]`.

```json
{
  "extends": "@codecompose/typescript-config/service-node"
}
```

## service-worker

For backend services running on the Cloudflare Workers runtime. Extends `base` with `noEmit: true` and `types: ["@cloudflare/workers-types"]`. Add `@cloudflare/workers-types` as a dev dependency in your service.

```json
{
  "extends": "@codecompose/typescript-config/service-worker"
}
```

## infra-pulumi

For [Pulumi](https://www.pulumi.com/) projects. Does not extend `base` because Pulumi has its own constraints (target `ES2022`, `experimentalDecorators`, single `index.ts` entry, no `src` directory). Includes `@types/node`.

```json
{
  "extends": "@codecompose/typescript-config/infra-pulumi"
}
```

## infra-alchemy

For [Alchemy](https://alchemy.run/) projects. Does not extend `base` because Alchemy projects have files at the project root rather than in `src`. Enables `allowImportingTsExtensions` (Alchemy reads `.ts` directly via its runtime) and includes `@types/node`.

```json
{
  "extends": "@codecompose/typescript-config/infra-alchemy"
}
```
