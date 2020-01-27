/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module context.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import { Globals } from "./globals";

export class ScopeContext {
  file?: {
    name: string;
    path: string;
    ext: string;
    lastMod: string;
    checkSum: string;
  };
  globals: Globals;
}
