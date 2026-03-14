# Publishing to NPM

If you publish your package, it is recommended to include the TypeScript source and type declaration maps. This allows the consumer to jump straight to the source code, which is great for overall readability and learning.

To export source files next to your dist output, define the `files` field in your `package.json`:

```json
{
  "files": ["src", "dist"]
}
```
