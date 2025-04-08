# typescript-config

Opinionated reusable Typescript configurations. Out-of-the-box we assume:

- You transpile using a bundler
- You want strict rules
- Use of `src` and `dist` directories
- Use of `~/` as path alias for `src`

Of course, you can still choose to override any of the defaults in your own
config.

## Structure

Configurations are organized based on their intended use:

- **Root configurations**: For stand-alone projects or general use
- **Monorepo configurations**: Under the `/monorepo` path for monorepo-specific
  setups

## Install

`npm i @codecompose/typescript-config -D`

## Usage

```json
{
  "extends": "@codecompose/typescript-config/base"
}
```

## Available Configurations

### Base Configuration

- `base` - Base configuration with common settings

### Stand-alone Configurations

- `base` - For anything non-specific
- `library` - For general libraries
- `react-library` - For React component libraries
- `nextjs` - For Next.js applications
- `service` - For a backend service like and API server or cloud function

### Monorepo Configurations

When using a monorepo, the packages that other packages depend on should use the
"shared" variant.

- `shared-library` - For shared libraries in a monorepo
- `shared-react-library` - For shared React component libraries in a monorepo

The `nextjs` and `service` configs are compatible with both monorepo and
non-monorepo.

For other project types, like a CLI or E2E app, you can use the `base`
configuration.

## Assumptions and Recommendations

Source maps are not enabled, because we assume that your bundler will handle
that.

All configurations have `incremental` set to `true`. In my experience, it can
happen that builds get stuck in limbo and you need to delete the
`tsconfig.tsbuildinfo` file to get things going again. For this reason I
recommend adding the following script to your manifest based on `del-cli`:

`"clean": "del-cli dist tsconfig.tsbuildinfo"`

## Known Issues

At the time of writing, not all tooling correctly interprets the use of
`${configDir}` introduced in TS v5.5 that this package depends on.

- Next.js will require you to explicitly defined "includes". Give it "src" and
  it will inject its types on startup.
- TSUP will not understand the tsconfig if you ask it to generate type
  definitions. I use tsc to generate the types, as demonstrated in
  [mono-ts](https://github.com/0x80/mono-ts).
