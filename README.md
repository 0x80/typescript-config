# typescript-config

Opinionated and reusable TypeScript configurations, geared towards modern build tooling in both monorepos and single repositories.

- Uses the TypeScript compiler for type-checking only (*)
- Assumes your bundler outputs code, sourcemaps, and type declarations (*)
- Requires TypeScript 6.0 or later
- Builds on TS6 strict defaults with additional strictness: `noUncheckedIndexedAccess`, `noImplicitOverride`, and `erasableSyntaxOnly`
- Assumes `src` and `dist` directories
- Provides `~/` and `@/` path aliases for `src`
- Uses `${configDir}` for zero per-project configuration

(*) The shared-library and shared-react-library configs are an exception: they enable `composite`, `declaration`, and `declarationMap` because project references require TypeScript to emit declarations. Your bundler still handles the JavaScript output.

To use this successfully, you would need a modern bundler like [tsdown](https://tsdown.dev/). You can check out the [typescript-monorepo](https://github.com/0x80/typescript-monorepo) boilerplate for a working example of a modern monorepo setup with tsdown.

These configurations are also compatible with [TSGo](https://github.com/nicksrandall/tsgo), the native Go port of the TypeScript compiler.


## Install

`npm i @codecompose/typescript-config -D`

## Usage

```json
{
  "extends": "@codecompose/typescript-config/base"
}
```

Often, no configuration is needed apart from `extends`.

## Available Configurations

- `base` - Anything non-specific
- `library` - Standalone libraries (not part of a monorepo)
- `shared-library` - Shared libraries in a monorepo
- `react-library` - Standalone React component libraries (not part of a monorepo)
- `shared-react-library` - Shared React component libraries in a monorepo
- `nextjs` - Next.js applications
- `service` - A backend service like an API server or cloud function


For other project types, like a CLI or E2E app, you can use the `base` configuration.

## V3 — TypeScript 6

V3 is a major release that requires TypeScript 6.0 or later.

TypeScript 6 aligns its defaults with the strict-by-default philosophy that this package has always followed. As a result, the base config is now leaner — options that are now TS6 defaults (`strict`, `esModuleInterop`) have been removed, and `isolatedModules` was dropped since it is implied by `verbatimModuleSyntax`.

TS6 also defaults `types` to `[]`, meaning `@types/*` packages are no longer auto-included. If your project depends on ambient type packages, you need to explicitly add them to your tsconfig:

```json
{
  "extends": "@codecompose/typescript-config/base",
  "compilerOptions": {
    "types": ["node"]
  }
}
```

This aligns with the strict-by-default philosophy — type dependencies should be explicit.

For users upgrading from v2, see the migration guide below.

## Migrating from v2

- **TypeScript 6 is required** — there is no backward compatibility with TS5
- **Removed `strict: true`** — now a TS6 default
- **Removed `esModuleInterop: true`** — safe interop behavior is always on in TS6
- **Removed `isolatedModules: true`** — implied by `verbatimModuleSyntax`
- **Removed commented-out `baseUrl`** — deprecated in TS6
- **Action required:** if you relied on auto-included `@types/*` packages, add `"types": ["node"]` (or whatever types you need) to your tsconfig

## Assuming Bundler Output

Outputs like sourcemaps and type declarations are disabled because it is assumed that your bundler will handle that. The shared-library and shared-react-library configs are an exception — they enable `declaration` and `declarationMap` because `composite` mode requires it for project references to work.

## Incremental Builds

All configurations have `incremental` set to `true`. In my experience, it can
happen that builds get stuck in limbo, and you need to delete the
`tsconfig.tsbuildinfo` file to get things going again. For this reason, I
recommend adding the following script to your manifest based on `del-cli`:

`"clean": "del-cli dist tsconfig.tsbuildinfo"`

## Project References

The shared-library and shared-react-library configurations have `composite` set to `true`. This is required for TypeScript "project references" to work in a monorepo. They provide IDE go-to-definition, without having to emit the module output.

In practice, this means that if you alter code in a shared package, the consuming app or library will pick up the changes, without requiring a watch task on the shared package to trigger a rebuild on every change.

Without project references, the consuming code would only see the `dist` output of the shared package.

If you prefer to work without project references, you should set your bundler to also [output declaration maps](https://tsdown.dev/options/dts#declaration-map), but not all bundlers can do this.

## Publishing to NPM

If you publish your package, it is recommended to include the TypeScript source and type declaration maps. This allows the consumer to jump straight to the source code, which is great for overall readability and learning.

To export source files next to your dist output, you define the `files` field in your package.json as `["src", "dist"]`.

## Caveats

Next.js v15 requires you to explicitly configure `include`. If you give it just "src" it will inject its own types on startup. I assume this will improve in the future.

The base configuration includes `"${configDir}/src/**/*.json"` alongside `"${configDir}/src"` because TypeScript's `include` only picks up supported extensions (`.ts`, `.tsx`, etc.) when given a directory path. If you override `include` in your project tsconfig, make sure to keep the JSON glob if you import JSON files.

