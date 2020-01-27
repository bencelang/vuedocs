# `@bencelang/vue-cli-plugin-docs`

> A `@vue/cli` 3.0+ plugin for @bencelang/vuedocs

[![NPM Version][npm-image]][npm-url]
[![Build Status](https://github.com/bencelang/vuedocs/workflows/ci/badge.svg)](https://github.com/bencelang/vuedocs/actions)
[![Downloads Stats][npm-downloads]][npm-url]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Automatically generate markdown documentation from your `@vue/cli` 3+ project sources using `@bencelang/vuedocs
`. Supports js, SFCs and typescript. 

## Usage
About documenting your source please see the [vuedocs](https://github.com/bencelang/vuedocs#readme) readme.
### Installation
**Note:** This project is for `@vue/cli` 3+ generated projects. The documentation of the
universal vue docs generation tool is located [here](https://github.com/bencelang/vuedocs#readme).

To install inside an existing project run:
```sh
vue add docs
```

Install the package globally to integrate with `vue create`:
```sh
yarn global add @bencelang/vue-cli-plugin-docs
# or
npm install -g @bencelang/vue-cli-plugin-docs
```

If you specified script generation during installation now you can run
```sh
yarn docs
# or
npm run docs
```
to automatically generate documentation for your project.

If you specified 

## Configuration
Configuration can be done via `vue.config.js` or a separate config file ([see vuedocs readme](https://github.com/bencelang/vuedocs)).

```js
/* vue.config.js */
const path = require("path"); 
// ...

module.exports = {
  // ...
  pluginOptions: {
    // ...
    // All settings are optional, the defauls listed below 
    docs: {
      extractOnSave: process.env.NODE_ENV === "development",
      extensions: [
        ".js",
        ".ts",
        ".vue"
      ],
      dest: path.resolve(__dirname, "docs"),
      source: path.resolve(__dirname, "src"),
      apiDir: "/api",
      copy: [
        "./README.md",
        "./LICEN{C|S}ES?.md",      
        "./NOTICES.md"      
       ],
      include: [
        "./vue.config.js"
      ],
      exclude: [
        "node_modules",
        "tests",
        "__tests__"
      ],
      hooks: [],
      pluginOptions: {},
      watch: true
    }
  }
};
```

### Options
| Name | Description | Default |
| ---- | ----------- | ------- |
| extractOnSave | Wether to extract documentation from source files | `true` in development mode, otherwise `false` |
| extensions | Array of file extensions *(as globs)* to filter includes through | `[".{j,t}s",".vue"]` |
| dest | Destination directory for generated markdown files | `path.resolve(__dirname, "docs")` |
| source | Source directory of your application | `path.resolve(__dirname, "src")` |
| apiDir | Directory to nest generated API documentation under | `"/api"`, set `""` to disable |
| copy | Array of globs to **always** copy and **overwrite** from the project root to the destination folder | README, LICENSE and NOTICE files |
| include | Array of globs to include in the generation, in addition to the source directory | `["./vue.config.js"]` |
| exclude | Array of globs to exclude from the generation | `node_modules` and `tests` directories |
| hooks | Object of callback functions in arrays to call upon certain events, keyed by hook. See available hooks below. | `[]`, example: `[{}]` |
| pluginOptions | Object of custom options for vuedocs plugins, see [vuedocs readme](https://github.com/bencelang/vuedocs#readme). | `{}` |
| watch | Enable regeneration of documentation when a module changes during development mode | `true` |

### Hooks
| Name | Description                       | Usage                        |
| ---- | --------------------------------- | ---------------------------- |
| start | Fires before compilation starts  | `(in, options) => { /* ... */ return { in, options }; }`<br /><br />**`in:`** Array of files about to be processed<br />**`options:`** resolved options|
| done | Fires when the output has changed | `(out, options) => { /* ... */ return { out, options }; }`<br /><br />**`out:`** Array of filenames created, changed or deleted<br/>**`options:`** resolved options |
| pre  | Fires before compiling a file | `(in, options) => { /* ... */ return { in, options }; }`<br /><br />**`in:`** input filename<br/>**`options:`** resolved options |
| post | Fires after compiling a file | `(out, options) => { /* ... */ return { out, options }; }`<br /><br />**`out:`** markdown output filename<br/>**`options:`** resolved options |
| pretransform | Fires before the built-in compilation | `(in, options) => { /* ... */ return { in, options }; }`<br /><br />**`in:`** input source as a string<br/>**`options:`** resolved options | 
| posttransform | Fires after the built-in compilation | `(out, options) => { /* ... */ return { out, options }; }`<br /><br />**`out:`** output markdown as a string<br/>**`options:`** resolved options |
| tags | Callback to register custom jsdoc tags | `() => {`<br />&nbsp;&nbsp;`return [`<br />&nbsp;&nbsp;&nbsp;&nbsp;`{`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`identifier: "example", // result: @example`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`allowMultiline: true, // Optional`<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`handler: (content, options) => {`<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`/* ... */`<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`return { out, options };`<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`<br />&nbsp;&nbsp;&nbsp;&nbsp;`}`<br />&nbsp;&nbsp;`];`<br />`}`<br /><br />Returns an array of tag registrations:<br />**`identifier:`** a string or a *regular expression* to match tags<br />**`allowMultiline:`** *(Optional)* when set to a boolean, forces to allow or disallow multiline content<br/>**`handler(content, options):`** A function to process matched tags<br/>**`content:`** An object describing the source.<br />Example: `{ source: /* as a string */, matches: [{pos: 10, content: /* matched content as string */}]}`<br />**`options:`** resolved options<br />**`out:`** Array of filenames created, changed or deleted<br/>resolved options 

**Usage**:
```js
/** docs/index.js **/
function my_hook_handler(/* params */) {
  // Do something
  // Do not forget to return params in an object
  return { ...params };
}

exports.my_hook_handler = my_hook_handler;
```

```js
/** vue.config.js **/
const { my_hook_handler } = require("./docs/index.js");
module.exports = {
  // ...
  pluginOptions: {
    // ...
    docs: {
      hooks: {
        name: my_hook_handler  
      }
    }
  }
  // ...
}
```

### Issues and feature requests
Be sure to follow the issue template.

[Github Issues](https://github.com/bencelang/vuedocs/issues)

### Contribution
[Github Repository](https://github.com/bencelang/vuedocs)

PRs are always welcome! Please see the [contribution guidelines](https://github.com/bencelang/vuedocs/wiki) first in
 the Github Wiki.


### Licence
[MIT](https://github.com/bencelang/vuedocs/blob/develop/LICENSE)

Copyright © 2020 - Bence Láng
