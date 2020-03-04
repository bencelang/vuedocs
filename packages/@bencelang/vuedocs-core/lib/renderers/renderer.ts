/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module renderer.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import { Meta } from "../document";
import { Output } from "../output";

export abstract class Renderer {
  protected outputs: Output[] = [];

  public feedIn(...outputs: Output[]): void {
    outputs.forEach(output => this.outputs.push(output));
  }

  public get Meta(): Meta {
    return {} as Meta;
  }

  public abstract build(): string | Uint8Array;
}
