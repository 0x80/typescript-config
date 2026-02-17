# typescript-config

Opinionated and reusable Typescript configurations, geared towards modern build tooling in both monorepos and single repositories.

- Only use the Typescript compiler for type-checking (*) 
- Use your bundler to output code, sourcemaps, and type declarations where needed.
- Requires TypeScript 6.0 or later
- Builds on TS6 strict defaults with additional strictness: `noUncheckedIndexedAccess`, `noImplicitOverride`, and `erasableSyntaxOnly`
- Assume `src` and `dist` directories
- Use of `~/` or `@/` as path alias for `src`
- Uses `${configDir}` to remove all client configuration

(*) Project references / shared monorepo packages also emit code.

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

- `base` -  Anything non-specific
- `library` - Standalone libraries (not part of a monorepo)
- `shared-library` - Shared libraries in a monorepo
- `react-library` - Standalone React component libraries (not part of a monorepo)
- `shared-react-library` - Shared React component libraries in a monorepo
- `nextjs` - Next.js applications
- `service` - A backend service like an API server or cloud function


For other project types, like a CLI or E2E app, you can use the `base` configuration.

## Assuming Bundler Output

Outputs like sourcemaps and type declarations are disabled because it is assumed that your bundler will handle that.


## Incremental Builds

All configurations have `incremental` set to `true`. In my experience, it can
happen that builds get stuck in limbo, and you need to delete the
`tsconfig.tsbuildinfo` file to get things going again. For this reason, I
recommend adding the following script to your manifest based on `del-cli`:

`"clean": "del-cli dist tsconfig.tsbuildinfo"`

## Project References

The shared-library and shared-react-library configurations have `composite` set to `true`. This is required for Typescript "project references" to work in a monorepo. They provide IDE go-to-definition, without having to emit the module output.

In practice, this means that if you alter code in a shared package, the consuming app or library will pick up the changes, without requiring a watch task on the shared package to trigger a rebuild on every change.

Without project references, the consuming code would only see the `dist` output of the shared package.

If you prefer to work without project references, you should set your bundler to also [output declaration maps](https://tsdown.dev/options/dts#declaration-map), but not all bundlers can do this.

## Publishing to NPM

If you publish your package, it is recommended to include the Typescript source and type declaration maps. This allows the consumer to jump straight to the source code, which is great for overall readability and learning.

To export source files next to your dist output, you define the `files` field in your package.json as `["src", "dist"]`.

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

## Caveats

Next.js v15 requires you to explicitly configure "includes". If you give it just "src" it will inject its own types on startup. I assume this will improve in the future.

