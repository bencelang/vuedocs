/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module source.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import { Section } from "./sections";
import { Output } from "./output";
import { Tag } from "./tags";

export class Source {
  private sections: Section[];

  constructor(...sections: string[]) {
    sections.forEach(section => this.sections.push(new Section(section)));
  }

  public buildOutput(tags: Tag[]): Output {
    this.sections.forEach(section => tags.forEach(tag => tag.apply(section)));
    return new Output(this.sections);
  }
}
