/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module .eslintrc.js
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: [
    "prettier"
  ],
  ignorePatterns: ["node_modules", "dist"],
  rules: {
    "prettier/prettier": "error"
  }
};
