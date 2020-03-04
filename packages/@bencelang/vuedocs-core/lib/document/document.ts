/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module document.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import { Output } from "../output";
import { Renderer } from "../renderers";
import { Meta } from "./meta";

export class Document {
  private readonly renderer: Renderer;
  private content: string | Uint8Array;

  /**
   *
   * @param renderer
   * @param outputs
   */
  constructor(renderer: Renderer, ...outputs: Output[]) {
    this.renderer = renderer;
    this.renderer.feedIn(...outputs);
  }
  public get Content(): string | Uint8Array {
    if (!this.content) {
      this.render();
    }
    return this.content;
  }

  public get Meta(): Meta {
    return this.renderer.Meta;
  }

  public render() {
    this.content = this.renderer.build();
  }
}
