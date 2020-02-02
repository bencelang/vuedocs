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

export class Hook {
  public readonly name: string;
  private handlers: Handler[] = [];
  private triggers: Trigger[] = [];

  constructor(name: string, triggers?: Trigger | Trigger[], handlers?: Handler | Handler[]) {
    this.name = name;
    if (triggers) {
      if (Array.isArray(triggers)) {
        triggers.forEach(trigger => this.triggers.push(trigger));
      } else {
        this.triggers.push(triggers);
      }
    }
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

  public get Triggers() {
    return this.triggers;
  }

  public clearHandlers(): void {
    this.handlers = [];
  }

  public fire(context: Context): void {
    this.handlers.forEach(callback => callback(context));
  }

  public registerHandler(cb: Handler, prepend: boolean = false): void {
    if (prepend) {
      this.handlers.unshift(cb);
    } else {
      this.handlers.push(cb);
    }
  }

  public registerTriggers(...triggers: Trigger[]) {
    triggers.forEach(trigger => this.triggers.push(trigger));
  }
}
