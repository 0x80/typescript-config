# TypeScript Config

Opinionated and reusable TypeScript configurations, geared towards modern build tooling in both monorepos and single repositories.

- Uses the TypeScript compiler for type-checking only
- Assumes your bundler outputs code, sourcemaps, and type declarations
- Requires TypeScript 6.0 or later
- Builds on TS6 strict defaults with additional strictness
- Assumes `src` and `dist` directories
- Provides `~/` and `@/` path aliases for `src`
- Uses `${configDir}` for zero per-project configuration

::: info Shared configs are an exception
The `shared-library` and `shared-react-library` configs enable `composite`, `declaration`, and `declarationMap` because project references require TypeScript to emit declarations. Your bundler still handles the JavaScript output.
:::

To use this successfully, you need a modern bundler like [tsdown](https://tsdown.dev/). You can check out the [typescript-monorepo](https://github.com/0x80/typescript-monorepo) boilerplate for a working example of a modern monorepo setup with tsdown.

These configurations are also compatible with [TSGo](https://github.com/nicksrandall/tsgo), the native Go port of the TypeScript compiler.
