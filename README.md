# typescript-config

Opinionated and reusable Typescript configurations, geared towards modern build tooling in both monorepos and single repositories.

- Only use Typescript for type-checking and incremental builds (but no emit).
- Use your bundler to output code, source-maps and type declarations where needed.
- Use strict settings, incl `noUncheckedIndexedAccess` and `erasableSyntaxOnly`.
- Assume `src` and `dist` directories
- Use of `~/` or `@/` as path alias for `src`
- Leverages TS 5.5 feature `${configDir}` to remove all client configuration.


To use this successfully, you would need a modern bundler like [tsdown](https://tsdown.dev/). You can check out the [mono-ts](https://github.com/0x80/mono-ts) boilerplate for a working example of a modern monorepo setup with tsdown.


## Install

`npm i @codecompose/typescript-config -D`

## Usage

```json
{
  "extends": "@codecompose/typescript-config/base"
}
```

Often no other configuration is needed besides extends.

## Available Configurations

- `base` -  Anything non-specific
- `library` - Standalone libraries (not part of a monorepo)
- `shared-library` - Shared libraries in a monorepo
- `react-library` - Standalone React component libraries (not part of a monorepo)
- `shared-react-library` - Shared React component libraries in a monorepo
- `nextjs` - Next.js applications
- `service` - A backend service like and API server or cloud function


For other project types, like a CLI or E2E app, you can use the `base` configuration.

## Assuming Bundler Output

Output like source maps, and type declarations is disabled, because it is assumed that your bundler will handle that.


## Incremental Builds

All configurations have `incremental` set to `true`. In my experience, it can
happen that builds get stuck in limbo and you need to delete the
`tsconfig.tsbuildinfo` file to get things going again. For this reason I
recommend adding the following script to your manifest based on `del-cli`:

`"clean": "del-cli dist tsconfig.tsbuildinfo"`

## Project References

The shared-library and shared-react-library configurations have `composite` set to `true`. This is required for Typescript "project references" to work in a monorepo. They provide IDE go-to-definition, without having to emit the module output.

In practice, this means that if you alter code in a shared package, the consuming app or library will pick up the changes, without requiring a watch task on the shared package to trigger a rebuild on every change.

Without project references, the consuming code would only see the `dist` output of the shared package.

If you prefer to work without project references, you should set your bundler to also [output declaration maps](https://tsdown.dev/options/dts#declaration-map), but not all bundlers can do this.

## Publishing to NPM

If you publish your package, it is recommended to include the Typescript source and type declaration maps. This allows the consumer to jump straight to the original source code, which is nice for readability and learning.

To export source files next to your dist output, you define the `files` field in your package.json as `["src", "dist"]`.

## Caveats

Older tooling might not correctly interpret the use of `${configDir}` introduced in TS v5.5 that this package depends on.

Next.js v15 seems to require you to explicitly define "includes". If you give it just "src" it will inject its own types on startup. I assume this will improve in the future.

