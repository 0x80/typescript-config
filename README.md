# typescript-config

Opinionated reusable Typescript configurations, assuming:

- A monorepo setup (\*)
- Transpile with a bundler
- Strict rules
- Use of `src` and `dist` directories
- Use of `~/` as path alias for `src`

(\*) Use the `single-*.json` variants if you do **not** use a monorepo setup.

All configurations have `incremental` set to `true`. For this reason I recommend
adding the following script to your manifest based on `del-cli`:

`"clean": "del dist tsconfig.tsbuildinfo"`

In my experience, it can happen that builds get stuck in limbo and you need to
delete the `tsbuildinfo` file to get things going again.

Source maps are not enabled, because we assume that your bundler will handle
that.

## Install

`pnpm i @codecompose/typescript-config -D`

...or the equivalent for your package manager.

## Usage

```json
{
  "extends": "@codecompose/typescript-config/single-react-library.json"
}
```

## Available Configurations

- library
- react-library
- service
- nextjs
- single-library
- single-react-library
