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

export class Source {
  private buffer: string;

  constructor(source: string) {
    this.buffer = source;
    this.resolve();
  }

  protected get source() {
    return this.buffer;
  }

  protected set source(value: string) {
    this.buffer = value;
    this.resolve();
  }

  protected resolve() {
    // TODO: Resolve source
  }

  public toString(): string {
    return this.source;
  }
}
