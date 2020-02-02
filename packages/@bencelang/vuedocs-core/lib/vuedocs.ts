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

import { Config, Options } from "./configuration";
import { Document } from "./document";
import { Manager } from "./hooks";
import { MarkdownRenderer, Renderer } from "./renderers";
import { Source } from "./source";
import { Tag } from "./tags";

export class VueDocs {
  private readonly config: Config;
  private readonly manager: Manager;
  private tags: Tag[] = [];
  private sources: Source[] = [];

  constructor(options?: Options) {
    this.manager = new Manager(this);
    this.config = new Config(this, options);
  }

  public get Config(): Config {
    return this.config;
  }

  public get Manager(): Manager {
    return this.manager;
  }

  public get Tags(): Tag[] {
    return this.tags;
  }

  public addSource(source: Source): void {
    this.sources.push(source);
  }

  public generate(renderer: Renderer = new MarkdownRenderer()): Document[] {
    const docs = [];
    this.sources.forEach(source => {
      docs.push(new Document(renderer, source.buildOutput(this.tags)));
    });
    return docs;
  }

  public translate(
    source: Source,
    renderer: Renderer = new MarkdownRenderer()
  ): string | Uint8Array {
    return new Document(renderer, source.buildOutput(this.tags)).Content;
  }

  public registerTags(input: Tag | Tag[]): void {
    if (Array.isArray(input)) {
      input.forEach(tag => this.tags.push(tag));
    } else {
      this.tags.push(input);
    }
  }
}
