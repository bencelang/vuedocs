/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module output.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import { SectionMap, Section } from "./sections";

export class Output {
  private readonly sections: Section[];
  constructor(sections: Section[]) {
    this.sections = sections;
  }

  public get Content(): SectionMap[] {
    return this.sections
      .map(section => [section.Map])
      .reduce((previousValue, currentValue) =>
        previousValue.concat(currentValue[0])
      );
  }

  public get Footer(): string {}

  public get Header(): string {}

  public get Name(): string {}

  public get Title(): string {}
}
