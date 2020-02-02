# `@bencelang/vuedocs`

> Software documentation re*vue*d for modern developers. \
>Supports JavaScript, TypeScript, Vue SFC-s and custom sources as well. 

[![NPM Version][npm-image]][npm-url]
[![Build Status](https://github.com/bencelang/vuedocs/workflows/ci/badge.svg)](https://github.com/bencelang/vuedocs/actions)
[![Downloads Stats][npm-downloads]][npm-url]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

#### :hammer: This repository is WIP. Everything could break at any time. :wrench:
**Current status:** initial implementation in progress, unpublished. 


`@bencelang/vuedocs` is an automated software documentation tool inspired by [vue](), [vue-cli](),
[vuepress]() and [jsdoc](). Supports JavaScript (ESNext), Typescript ans Vue SFC sources out of the box,
but you can add support for virtually any file format via our plugin system.

VueDocs supports standard jsdoc and tsdoc notation, however we use an extended set of each. For a complete list of
 available tags, please see [this](). You can also create custom tags through the Plugin API.

## Installation
**Tip:** For `@vue/cli` 3+ generated projects, check out [`@bencelang/vue-cli-plugin-docs`](https://github.com/bencelang/vuedocs/tree/develop/packages/%40bencelang/vue-cli-plugin-docs).

You can install the tool globally, so you can leverage the built-in cli in all of your repositories:

```sh
yarn global add @bencelang/vuedocs
# or
npm install -g @bencelang/vuedocs
```

Another options is to include the package in your local `devDependencies`:

```sh
yarn add -D @bencelang/vuedocs
# or
npm install --save-dev @bencelang/vuedocs
```

## Getting started
`@bencelang/vuedocs` allows you to use [jsdoc](https://github.com/jsdoc/jsdoc) style documentation in your source
 files, then extract the docs into various formats.

Take the following sources:
```js
// my-script.js
/**
* This is an example method
* @param {string} firstParam Example parameter of this example method
* @param {string} secondParam Example parameter again 
*/
function exampleMethod(firstParam, secondParam) {
// ...
}
```
```vue
<!-- MyComponent.vue -->
<script>
/**
* This is an example description for the component
*/
export default {
 name: "MyComponent",
 props: ["firstProp", "secondProp"]
}
</script>
```

And generate documentation for them:
```sh
vuedocs my-script.js MyComponent.vue
```

You should see `my-script.md` and `MyComponent.md` files generated in the `docs/api` folder:
```markdown
# my-script.js

### `exampleMethod(firstParam: string, secondParam: string): void`
This is an example method

**Parameters:**
| Name | Type | Description |
| ---- | ---- | ----------- |
| `firstParam` | `string` | Example parameter of this example method |
| `secondParam` | `string` | Example parameter again |

**Returns:** This function does not return anything.
```

```markdown
# MyComponent

This is an example description for the component

## Props
| Name | 
| ---- | 
| `firstProp` |
| `secondProp` |
```

**Tip:** Check out [this]() description on how to document vue files. 

Now you can use something like [vuepress](https://vuepress.vuejs.org/) to convert these markdown files into a static, predendered website which
 has built-in search functionality, a documentation-optimized default theme, and much more:
```sh
vuepress dev docs/api
# After the server starts, visit the url displayed in your terminal 
```

For more advanced vuepress integration, please check out [`@bencelang/vuedocs-plugin-vuepress`](https://github.com/bencelang/vuedocs/tree/develop/packages/@bencelang/vuedocs-plugin-vuepress#readme).
## Usage
```
vuedocs [options] [...files]

# TODO: Demonstrate cli usage
```

### API
```js
import VueDocs from "vuedocs";

// TODO: Demonstrate api
```

## Configuration
Configuration can be done via cli options or a separate config file, named one of the following:
 -  `vuedocs.config.js`
 - `.vuedocsrc.js`
 - `.vuedocsrc`
 - `vuedocs.json`
 
The config files are resolved in order from up to down, recursively upwards from the source directory.
`.vuedocsrc` and `vuedocs.json` formats should be written in pure JSON, whereas files ending with `.js` should expose a
 CommonJS default export object, like so:
```js
module.exports = {
  // Your options
};
```

### Options
| Name | Description | Default |
| ---- | ----------- | ------- |
| source | Source directory of your application | `path.resolve(__dirname, "src")` |
| dest | Destination directory for generated markdown files | `path.resolve(__dirname, "docs")` |
| apiDir | Directory to nest generated API documentation under | `"/api"`, set `""` to disable |
| extensions | Array of file extensions *(as globs)* to filter sources through | `[".{j,t}s",".vue"]` |
| copy | Array of globs to **always** copy and **overwrite** from the project root to the destination folder | README, LICENSE and NOTICE files |
| include | Array of globs to include in the generation, *in addition* to the source directory | `[]` |
| exclude | Array of globs to exclude from the generation | `node_modules`, `tests` and `__tests__` directories |
| hooks | Object of callback functions in arrays to call upon certain events, keyed by hook. See available hooks below. | `[]` |
| pluginOptions | Object of custom options for plugins. | `{}` |


## Contribution
PRs are welcome! :heart: Please check out our [contribution guidelines]().

## License
[MIT](https://github.com/bencelang/vuedocs/blob/develop/LICENSE)

Copyright © 2020 Bence Láng
