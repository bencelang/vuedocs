/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module markdown.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import { Renderer } from "./renderer";

export class MarkdownRenderer extends Renderer {
  build(): string | Uint8Array {
    let buffer = `# ${this.Meta.title}\n`;
    buffer += this.Meta.subtitle ? `> ${this.Meta.subtitle}\n` : "\n";

    this.outputs.forEach(output => {
      buffer += `## ${output.Title}\n`;
      buffer += `${output.Header}\n`;

      output.Content.forEach(section => {
        if (section.has("title")) {
          buffer += `\n### ${section.get("title")}`
        }
        if (section.has("subtitle")) {
          buffer += `\n> ${section.get("subtitle")}`
        }

        for (let tag of section.keys()) {
          if (["title", "subtitle"].indexOf(tag) > -1) {
            continue;
          }
          buffer += `\n${section.get(tag)}\n`;
        }
      });
    });

    return buffer;
  }
}
