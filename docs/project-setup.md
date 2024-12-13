# Project Setup

## Installation

Make sure that you have the right version of Node.js installed in nvm.

```bash
nvm use
```

Make sure you have pnpm installed globally.

```bash
#Linux & macOS
curl -fsSL https://get.pnpm.io/install.sh | sh -

#Windows
npm install -g pnpm
```

I'm suggesting to install
[@antfu/ni](https://www.npmjs.com/package/@antfu/ni/v/0.13.1) globally:

```bash
pnpm add  -g @antfu/ni
```

Don't forget to install the dependencies:

```bash
ni
```

## Running the app

Run command:

```bash
nr dev
```

Or with turbo enabled:

```bash
nr dev:turbo
```

## Linting the app

Running eslint:

```bash
nr lint
```

And with fix option enabled:

```bash
nr lint:fix
```

## Testing the app

Running unit tests:

```bash
nr test
```

In watch mode:

```bash
nr test:watch
```

And with collecting coverage:

```bash
nr test:coverage
```

## Storybook

Running storybook:

```bash
nr storybook
```

And with building storybook:

```bash
nr storybook:build
```

## Generating a new component

To generate a new component, run the following command:

```bash
nr shadcn-ui generate <component-name>
```

This will create a new component in the `components/ui` directory.
