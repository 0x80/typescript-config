# Getting Started

## Install

```sh
npm i @codecompose/typescript-config -D
```

## Usage

Create a `tsconfig.json` in your project and extend one of the available configurations:

```json
{
  "extends": "@codecompose/typescript-config/base"
}
```

Often, no additional configuration is needed apart from `extends`.

## Path Aliases

All configurations provide `~/` and `@/` path aliases that map to `src/`. This means you can import from your source root using either alias:

```ts
import { something } from "~/utils";
import { other } from "@/helpers";
```

Make sure your bundler is also configured to resolve these aliases.

## Incremental Builds

All configurations have `incremental` set to `true`. It can happen that builds get stuck in limbo, and you need to delete the `tsconfig.tsbuildinfo` file to get things going again. For this reason, it is recommended to add the following script to your `package.json`:

```json
{
  "scripts": {
    "clean": "del-cli dist tsconfig.tsbuildinfo"
  }
}
```

## Caveats

### Next.js

Next.js v15 requires you to explicitly configure `include`. If you give it just `src` it will inject its own types on startup. This should improve in the future.

### JSON Imports

The base configuration includes `"${configDir}/src/**/*.json"` alongside `"${configDir}/src"` because TypeScript's `include` only picks up supported extensions (`.ts`, `.tsx`, etc.) when given a directory path. If you override `include` in your project tsconfig, make sure to keep the JSON glob if you import JSON files.
