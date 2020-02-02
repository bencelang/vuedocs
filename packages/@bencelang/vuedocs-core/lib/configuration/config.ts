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
import { Options } from "./options";
import { VueDocs } from "../vuedocs";

const CONFIG_OPTIONS = [
  "vuedocs.config.js",
  ".vuedocsrc.js",
  ".vuedocsrc",
  "vuedocs.json"
];

class InvalidConfigError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class Config {
  private readonly owner: VueDocs;
  public dest: string;
  public source: string;
  public apiDir: string;
  public extensions: string[];
  public copy: string[];
  public include: string[];
  public exclude: string[];
  public pluginOptions: any;

  constructor(owner: VueDocs, options?: Options) {
    this.owner = owner;
    if (options) {
      this.resolveOptions(options);
    } else {
      this.detectConfig();
    }
  }

  private detectConfig() {
    const file = Config.locateConfigFile(process.cwd());
    if (file) {
      this.resolveOptions(Config.resolveConfigFile(file));
    }
  }

  private resolveOptions(options: Options) {
    this.dest = options.dest;
    this.source = options.source;
    this.apiDir = options.apiDir;
    this.extensions = options.extensions;
    this.copy = options.copy;
    this.include = options.include;
    this.exclude = options.exclude;
    this.pluginOptions = options.pluginOptions;

    if (options.hooks) {
      options.hooks.forEach(hook => this.owner.Manager.resolve(hook));
    }
  }

  private update(cfg: {
    dest?: string;
    source?: string;
    apiDir?: string;
    extensions?: string[];
    copy?: string[];
    include?: string[];
    exclude?: string[];
    pluginOptions?: any;
  }) {

    // Basic options
    if (cfg.dest) {
      this.dest = cfg.dest;
    }
    if (cfg.source) {
      this.source = cfg.source;
    }
    if (cfg.apiDir) {
      this.apiDir = cfg.apiDir;
    }

    // Extensions
    if (cfg.extensions !== undefined) {
      // Allow the user to clear existing settings
      if (cfg.extensions === null) {
        this.extensions = [];
      } else if (cfg.extensions.length) {
        // Allow clearing this way, to be able to instantly specify new elements
        if (cfg.extensions[0] === null) {
          this.extensions = [];
        }

        cfg.extensions.forEach(ext => {
          if (this.extensions.indexOf(ext) < 0) {
            this.extensions.push(ext);
          }
        });
      }

      // Copy
      if (cfg.copy !== undefined) {
        if (cfg.copy === null) {
          this.copy = [];
        } else if (cfg.copy.length) {
          // Allow clearing this way, to be able to instantly specify new elements
          if (cfg.copy[0] === null) {
            this.copy = [];
          }

          cfg.copy.forEach(glob => {
            if (this.copy.indexOf(glob) < 0) {
              this.copy.push(glob);
            }
          });
        }
      }

      // Include
      if (cfg.include !== undefined) {
        if (cfg.include === null) {
          this.include = [];
        } else if (cfg.include.length) {
          // Allow clearing this way, to be able to instantly specify new elements
          if (cfg.include[0] === null) {
            this.include = [];
          }

          cfg.include.forEach(glob => {
            if (this.include.indexOf(glob) < 0) {
              this.include.push(glob);
            }
          });
        }
      }

      // Exclude
      if (cfg.exclude !== undefined) {
        if (cfg.exclude === null) {
          this.exclude = [];
        } else if (cfg.exclude.length) {
          // Allow clearing this way, to be able to instantly specify new elements
          if (cfg.exclude[0] === null) {
            this.exclude = [];
          }

          cfg.exclude.forEach(glob => {
            if (this.exclude.indexOf(glob) < 0) {
              this.exclude.push(glob);
            }
          });
        }
      }

      // PluginOptions
      if (cfg.pluginOptions !== undefined) {
        this.pluginOptions = Object.assign(this.pluginOptions, cfg.pluginOptions);
      }
    }
  }

  public static locateConfigFile(cwd: string): string | null {
    let configFile: string = null;
    const ls = fs.readdirSync(cwd, { withFileTypes: true });

    ls.forEach(file => {
      if (file.isFile() && CONFIG_OPTIONS.indexOf(file.name) > -1) {
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

  public static resolveConfigFile(filepath: string): Options {
    const ext = filepath.split(".").pop();
    switch (ext) {
      case "js":
      case "json":
      case "vuedocsrc":
        return require(filepath) as Options;
      default:
        throw new InvalidConfigError(`Unknown file format: "${ext}"`);
    }
  }
}
