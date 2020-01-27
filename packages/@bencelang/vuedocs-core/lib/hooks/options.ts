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

import {Trigger} from "./trigger";
import {Handler} from "./handler";

export interface HandlerOptions {
  name: string;
  trigger: Trigger;
  handler: Handler;
}
