/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module manager.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import { Hook } from "./hook";
import { Trigger } from "./trigger";
import { HandlerOptions } from "./options";
import { VueDocs } from "../vuedocs";
import { Handler } from "./handler";

export class Manager {
  private readonly owner: VueDocs;
  private hooks: Hook[] = [];
  private triggers: Trigger[] = [];

  constructor(owner: any) {
    this.owner = owner;
  }

  public get Hooks() {
    return this.hooks;
  }

  public get Triggers() {
    return this.triggers;
  }

  public createTrigger(name: string): Trigger {
    if (this.triggers.filter(t => t.name === name).length === 0) {
      const t = new Trigger(name, this.owner);
      this.triggers.push(t);
      return t;
    }
  }

  public createHook(name: string, handler: Handler, ...triggers: Trigger[]): Hook {
    const hook = new Hook(name, null, handler);
    if (triggers.length < 1) {
      triggers = [
        new Trigger(`${name}-Trigger${Math.random() * 100}`, this.owner, hook)
      ];
    }
    this.hooks.push(hook);
    triggers.forEach(trigger => this.triggers.push(trigger));
    return hook;
  }

  public invoke(triggers: string | string[], invoker?: any, args?: any) {
    if (Array.isArray(triggers)) {
      if (triggers.length < 1) {
        throw new Error("No trigger specified");
      }
      triggers.forEach(trigger => {
        const _ = this.triggers.filter(t => t.name === (trigger as string));
        if (_.length) {
          _[0].invoke(invoker || this.owner, args);
        }
      });
    } else {
      const _ = this.triggers.filter(t => t.name === (triggers as string));
      if (_.length) {
        _[0].invoke(invoker || this.owner, args);
      }
    }
  }

  public resolve(options: HandlerOptions): void {
    // TODO: Resolve hook settings
    //this.hooks.push(new Hook(this.owner, new Trigger()));
  }

  public registerHooks(input: Hook | Hook[]): void {
    if (Array.isArray(input)) {
      input.forEach(hook => {
        this.hooks.push(hook);
      });
    } else {
      this.hooks.push(input);
    }
  }
}
