# Contributing

## Development

1. Install dependencies with `npm install`.
2. Run `npm run watch`.
3. Press F5 to open an Extension Development Host.
4. Open a `.par` file to activate the extension.
5. Reload the development host with Ctrl+R or Cmd+R after making changes.

The extension looks for `par` on `PATH`. If it is not available there, set `par.path` to the executable's path in the development host's settings.

## Validation

Run `npm test`, `npm run compile`, and `npm run vsce:verify`.

## Packaging

Run `npm run vsce:package`, then install the generated `.vsix` file in VS Code.
