/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module config.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import fs from "fs";
import path from "path";
import {Options} from "./options";

export class Config {
  public readonly dest: string;
  public readonly source: string;
  public readonly apiDir: string;
  public extensions: string[];
  public copy: string[];
  public include: string[];
  public exclude: string[];

  constructor(dest: string, source: string, apiDir: string, extensions: string[], copy: string[], include: string[],
              exclude: string[]) {
    this.dest = dest;
    this.source = source;
    this.apiDir = apiDir;
    this.extensions = extensions;
    this.copy = copy;
    this.include = include;
    this.exclude = exclude;
  }

  public static locateConfigFile(cwd: string): string | null {
    let configFile: string = null;
    const ls = fs.readdirSync(cwd, {withFileTypes: true});
    const options = ["vuedocs.json", "vuedocs.config.js", ".vuedocsrc.js"];

    ls.forEach(file => {
      if (file.isFile() && options.indexOf(file.name) > -1) {
        configFile = path.resolve(cwd, file.name);
      }
    });

    if (configFile) {
      return configFile;
    }

    if (cwd === path.parse(process.cwd()).root) {
      return null;
    }

    return this.locateConfigFile(path.resolve(cwd, "../"));
  }

  public static resolveConfigFile(filepath: string): Config {
    const ext = filepath.split(".").pop();
    switch (ext) {
      case "js":
      case "json":
        const jsval = require(filepath);
        if (jsval.isPrototypeOf(Config)) {
          return jsval as Config;
        }
        return Config.fromOptions(jsval as Options);
    }
  }

  public static fromOptions(options: Options): Config {
    if (!options.dest) {
      options.dest = path.resolve(process.cwd(), "docs");
    }

    if (!options.source) {
      options.source = path.resolve(process.cwd(), "src")
    }

    return new Config(options.dest, options.source, options.apiDir, options.extensions, options.copy, options.include, options.exclude);
  }

  public static readonly DefaultConfig: Config = Config.fromOptions(new Options());
}
