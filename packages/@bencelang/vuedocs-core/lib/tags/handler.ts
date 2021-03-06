/*
 * @copyright
 * Copyright (c) 2020. - Bence Láng.
 * Licensed under the MIT license.
 *
 * @module handler.ts
 * @author Bence Láng
 * @license MIT
 * @repository https://github.com/bencelang/vuedocs
 * @issues https://github.com/bencelang/vuedocs/issues
 */

import {Section, SectionMap} from "../sections";

export type TagHandler = (source: Section) => string;
