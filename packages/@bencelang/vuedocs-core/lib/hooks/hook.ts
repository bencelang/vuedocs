/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module hook.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import {Context} from "./context";
import {Handler} from "./handler";
import {Trigger} from "./trigger";
import {Vuedocs} from "../vuedocs";

export class Hook {
  public readonly trigger: Trigger;
  public readonly vuedocs: Vuedocs;
  private handlers: Handler[] = [];

  constructor(vuedocs: Vuedocs, trigger: Trigger, handlers?: Handler | Handler[]) {
    this.trigger = trigger;
    this.vuedocs = vuedocs;
    if (handlers) {
      if (Array.isArray(handlers)) {
        handlers.forEach(handler => this.registerHandler(handler));
      } else {
        this.registerHandler(handlers);
      }
    }
  }

  public get Handlers() {
    return this.handlers;
  }

  public fire(context: Context): void {
    this.handlers.forEach(callback => callback(context));
  }
  public clear(): void {
    this.handlers = [];
  }
  public registerHandler(cb: Handler, prepend: boolean = false): void {
    // TODO: Callback validation
    if (prepend) {
      this.handlers.unshift(cb);
    } else {
      this.handlers.push(cb);
    }
  }
}
