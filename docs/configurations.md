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
- Path aliases `~/` and `@/` for `src`

## library

For standalone libraries that are not part of a monorepo. Extends `base` with `noEmit: true`, since your bundler handles all output.

```json
{
  "extends": "@codecompose/typescript-config/library"
}
```

## shared-library

For shared libraries in a monorepo. Extends `base` with `composite`, `declaration`, and `declarationMap` enabled to support [project references](/project-references).

```json
{
  "extends": "@codecompose/typescript-config/shared-library"
}
```

## react-library

For standalone React component libraries. Extends `base` with DOM libs, JSX support (`react-jsx`), and `noEmit: true`.

```json
{
  "extends": "@codecompose/typescript-config/react-library"
}
```

## shared-react-library

For shared React component libraries in a monorepo. Combines React support with the composite settings needed for [project references](/project-references).

```json
{
  "extends": "@codecompose/typescript-config/shared-react-library"
}
```

## nextjs

For Next.js applications. Extends `base` with `jsx: preserve`, DOM libs, the Next.js plugin, and adjusted `rootDir`/`include` paths to match Next.js conventions.

```json
{
  "extends": "@codecompose/typescript-config/nextjs"
}
```

## service

For backend services like API servers or cloud functions. Extends `base` with `noEmit: true`.

```json
{
  "extends": "@codecompose/typescript-config/service"
}
```
