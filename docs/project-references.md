# Project References

The `shared-library` and `shared-react-library` configurations have `composite` set to `true`. This is required for TypeScript project references to work in a monorepo.

## Why Project References?

Project references provide IDE go-to-definition without having to emit the module output. In practice, this means that if you alter code in a shared package, the consuming app or library will pick up the changes without requiring a watch task on the shared package to trigger a rebuild on every change.

Without project references, the consuming code would only see the `dist` output of the shared package.

## Without Project References

If you prefer to work without project references, you should set your bundler to also [output declaration maps](https://tsdown.dev/options/dts#declaration-map), but not all bundlers support this.
