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

import { Trigger } from "./trigger";
import { VueDocs } from "../vuedocs";

export class Context {
  constructor(invoker: any, params: any, trigger: Trigger, vuedocs: VueDocs) {
    this.invoker = invoker;
    this.params = params;
    this.trigger = trigger;
    this.vuedocs = vuedocs;
  }

  public readonly invoker: any;
  public readonly params: any;
  public readonly trigger: Trigger;
  public readonly vuedocs: VueDocs;
}
