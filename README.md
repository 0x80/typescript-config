# typescript-config

Opinionated reusable Typescript configurations.

It assumes:

- A monorepo setup
- You transpile using a bundler
- Strict rules
- src and dist directories
- ~/ as path alias for src

## Install

pnpm i @codecompose/typescript-config

## Usage

```json
{
  "extends": "@codecompose/typescript-config/library.json"
}
```

## Available Configurations

- base
- library
- react-library
- service
- nextjs
