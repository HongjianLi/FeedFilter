#!/usr/bin/env node
import fs from 'fs/promises';
import lib from './lib.js';
const feed = await lib.fetchFilter();
if (feed) {
	await fs.writeFile('mydrivers.xml', feed);
}
