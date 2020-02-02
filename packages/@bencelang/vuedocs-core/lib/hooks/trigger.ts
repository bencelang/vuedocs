/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module trigger.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import { Hook } from "./hook";
import { Context } from "./context";
import { VueDocs } from "../vuedocs";

export class Trigger {
  public readonly name: string;
  private readonly owner: VueDocs;
  private hooks: Hook[];

  constructor(name: string, owner: VueDocs, ...hooks: Hook[]) {
    this.name = name;
    this.owner = owner;

    if (hooks) {
      hooks.forEach(hook => {
        this.hooks.push(hook);
      });
    }
  }

  public invoke(invoker?: any, params?: any) {
    this.hooks.forEach(hook =>
      hook.fire(new Context(invoker || this.owner, params, this, this.owner))
    );
  }

  public associateHooks(...hooks: Hook[]) {
    hooks.forEach(hook => {
      if (this.hooks.indexOf(hook) < 0) {
        this.hooks.push(hook);
      }
    });
  }
}
