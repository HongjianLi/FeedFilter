#!/usr/bin/env node
import fs from 'fs/promises';
import lib from './lib.js';
const feed = await lib.fetchFilter();
await fs.writeFile('mydrivers.rss', feed);
