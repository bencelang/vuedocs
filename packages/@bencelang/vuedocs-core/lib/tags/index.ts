/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module tags.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

export type TagHandler = Function;

export type Tag = {
  identifier: string | RegExp;
  multiline?: boolean;
  aggregate?: boolean;
  handler: TagHandler;
  parserOptions?: {
    parseBefore?: string[] | Tag[],
    parseAfter?: string[] | Tag[],
  }
};

