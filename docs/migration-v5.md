# Migration from V3

V5 reshapes the runtime-specific presets to make their target environment explicit in the name, and adds new presets for Cloudflare Workers, Alchemy, and isomorphic libraries.

The base, library, shared-library, react-library, shared-react-library, and nextjs presets are unchanged — only the entry points named after runtimes have moved.

::: info Why v5 and not v4?
V4 was skipped due to a publishing-workflow accident — `package.json` was bumped to `4.0.0` on the branch before merge, and the workflow then ran its own `major` bump on top, producing `5.0.0`. The published `5.0.0` is the release that was intended to be `4.0.0`; there is no `4.x` line.
:::

## Renames

| V3 entry point | V5 entry point |
| --- | --- |
| `@codecompose/typescript-config/service` | `@codecompose/typescript-config/service-node` |
| `@codecompose/typescript-config/infra` | `@codecompose/typescript-config/infra-pulumi` |

The contents of these presets are unchanged. Only the import path moved. There are no fallback aliases — the old names are removed.

```json
{
  "extends": "@codecompose/typescript-config/service-node"
}
```

```json
{
  "extends": "@codecompose/typescript-config/infra-pulumi"
}
```

## New presets

- **`service-worker`** — backend service on the Cloudflare Workers runtime. Same shape as `service-node`, but with `types: ["@cloudflare/workers-types"]` instead of `["node"]`.
- **`infra-alchemy`** — [Alchemy](https://alchemy.run/) projects. Files at the project root (no `src` directory), `allowImportingTsExtensions` enabled, `@types/node` included.
- **`library-isomorphic`** — standalone libraries that target multiple Web-standards runtimes (browser, React Native, Cloudflare Workers, Deno, Bun, modern Node). Adds the DOM lib so global `fetch`/`Response`/`Headers` types are available without leaking runtime-specific bindings like `@cloudflare/workers-types` or `@types/node` would.

See [Configurations](/configurations) for the full list.

## Why the rename

V3 introduced explicit `types: ["node"]` on `service` and `infra`, baking a Node.js assumption into their names. With Cloudflare Workers and Alchemy added in V5, the unqualified names became misleading — a `service` that hard-codes Node types is friction for Worker services, and an `infra` named after Pulumi specifically isn't a good home for Alchemy.

The `{category}-{runtime}` shape (`service-node`, `service-worker`, `infra-pulumi`, `infra-alchemy`) groups related presets in alphabetical listings and leaves room for future runtimes (`service-bun`, `service-deno`, `infra-terraform`, etc.) without further renames.
