# typescript-config

Opinionated reusable Typescript configurations, assuming:

- A monorepo setup (\*)
- Transpile using a bundler
- Strict rules
- Use of `src` and `dist` directories
- Use of `~/` as path alias for `src`

(\*) Use the `single-*.json` variants if you do **not** use a monorepo setup.

## Warning

At the time of writing, not all tooling correctly interprets the extended
config.

- Next.js will require you to explicitly defined "includes". Give it "src" and
  it will inject its types on startup.
- TSUP will not understand the tsconfig if you ask it to generate type
  definitions. I use tsc to generate the types, as demonstrated in
  [mono-ts](https://github.com/0x80/mono-ts).

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

- base
- library
- react-library
- service
- nextjs
- single-library
- single-react-library

For something else, like a CLI or E2E app you can probably just use the
`base.json` configuration.

## Assumptions and Recommendations

Source maps are not enabled, because we assume that your bundler will handle
that.

All configurations have `incremental` set to `true`. In my experience, it can
happen that builds get stuck in limbo and you need to delete the `tsbuildinfo`
file to get things going again. For this reason I recommend adding the following
script to your manifest based on `del-cli`:

`"clean": "del dist tsconfig.tsbuildinfo"`
