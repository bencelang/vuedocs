/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module options.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import { TagHandler } from "./handler";

export type TagOptions = {
  name: string;
  identifier: string | RegExp;
  handler: TagHandler;
  multiline?: boolean;
  aggregate?: boolean;
  constraint?: {
    applyBefore?: string[];
    applyAfter?: string[];
  };
};
