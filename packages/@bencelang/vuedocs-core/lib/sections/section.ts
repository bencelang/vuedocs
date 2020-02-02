/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module section.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import { SectionMap } from "./map";

export class Section {
  public readonly source: string;
  private map: SectionMap;

  constructor(source: string) {
    this.source = source;
  }

  public get Map(): SectionMap {
    return this.map ? this.map : undefined;
  }

  public addToMap(identifier: string, content: string) {
    this.map.set(identifier, content);
  }
}
