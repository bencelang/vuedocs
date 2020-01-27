/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module vuedocs.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import {Hook, Trigger} from "./hooks";
import {Config} from "./configuration/config";
import {Tag} from "./tags";



export class Markdown {

}

export class Vuedocs {
  private config: Config;
  private hooks: Hook[] = [];
  private tags: Tag[] = [];

  constructor(configPath?: string) {
    this.fillHooks();
    this.resolveConfig(configPath);
    this.loadTags();
  }

  public get Config() {
    return this.config;
  }

  public get Hooks() {
    return this.hooks;
  }

  public get Tags() {
    return this.tags;
  }

  private fillHooks() {
    // TODO: Fill hooks
  }

  private resolveConfig(filepath?: string): Config {
    if (!filepath) {
      filepath = Config.locateConfigFile(process.cwd());
      if (filepath === null) {
        this.config = Config.DefaultConfig;
        return;
      }
    }

    this.config = Config.resolveConfigFile(filepath);
  }

  private loadTags() {
    // TODO: Load default tags
  }

  public getHook(trigger: Trigger): Hook {
    const h = this.hooks.filter(hook => hook.trigger === trigger);
    return h[0];
  }

  public registerHooks(input: Hook | Hook[]): void {
    if (Array.isArray(input)) {
      input.forEach(hook => {
        if (this.hooks.filter(h=>h.trigger !== hook.trigger)) {
          this.hooks.push(hook);
        }
      });
    } else {
      this.hooks.push(input);
    }
  }

  public registerTags(input: Tag | Tag[]): void {
    if (Array.isArray(input)) {
      input.forEach(tag => this.tags.push(tag));
    } else {
      this.tags.push(input);
    }
  }
}
