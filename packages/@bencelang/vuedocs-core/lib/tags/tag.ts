/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module tag.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import {Section} from "../sections";
import {TagHandler} from "./handler";
import {TagOptions} from "./options";

export class Tag {
  public readonly name: string;
  public readonly identifier: string | RegExp;
  public readonly isAggregate: boolean;
  public readonly isMultiline: boolean;
  public readonly applyAfter: string[];
  public readonly applyBefore: string[];

  private readonly handler: TagHandler;

  constructor(options: TagOptions) {
    this.name = options.name;
    this.identifier = options.identifier;
    this.handler = options.handler;
    this.isAggregate = options.aggregate || false;
    this.isMultiline = options.multiline || false;
    this.applyAfter = options.constraint ? options.constraint.applyAfter || [] : [];
    this.applyBefore = options.constraint ? options.constraint.applyBefore || [] : [];
  }

  public apply(source: Section): void {
    source.addToMap(this.name, this.handler(source));
  }
}
