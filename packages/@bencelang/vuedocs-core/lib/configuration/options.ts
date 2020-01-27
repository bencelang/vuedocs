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

import {HandlerOptions} from "../hooks";

export class Options {
  public dest?: string;
  public source?: string;
  public apiDir?: string = "/api";
  public extensions?: string[] = [".{j|t}s", ".vue"];
  public copy?: string[] = ["./README.md",
                           "./LICEN{C|S}ES?.md",
                           "./NOTICES.md"];
  public include?: string[] = ["./vue.config.js"];
  public exclude?: string[] = ["node_modules", "tests", "__tests__"];
  public hooks?: HandlerOptions[];
  public pluginOptions?: any;
}
