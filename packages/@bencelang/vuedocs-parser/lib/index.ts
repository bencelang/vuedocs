/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module index.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import {Vuedocs, Source, Tag, Markdown, Rule} from "@bencelang/vuedocs-core";



export class VuedocsParser {
  private rules: Rule[];
  private vuedocs: Vuedocs;

  constructor(vuedocs: Vuedocs) {
    this.vuedocs = vuedocs;

    this.vuedocs.Tags.forEach(tag => {
      const rule = new Rule({
        pattern: VuedocsParser.generateRegex(tag)
      });
      this.rules.push(rule);
    });
  }

  public static generateRegex(tag: Tag): RegExp {
    if (typeof tag.identifier === "string") {
      return new RegExp(`@(${tag.identifier}) ${tag.allowMultiline ? "(.*)^@" : "(.*)$"}/`, "mig");
    } else {
      return new RegExp(tag.identifier);
    }
  }

  public static extractComments(source: Source): Source {
    // TODO: Process comments
    return source;
  }

  public parse(source: Source): Markdown {
    source = VuedocsParser.extractComments(source);

    this.rules.forEach(rule => {
      source = rule.apply(source);
    });

    return source as Markdown;
  }
}
