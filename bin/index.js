#!/usr/bin/env node

'use strict';

import path from 'path';
import { program } from 'commander';
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';  // Make sure both functions are imported

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

// Resolve __dirname using import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const params = program
  .name('openapi-ng')
  .usage('[options]')
  .requiredOption('-i, --input <value>', 'OpenAPI specification, can be a path, url or string content (required)')
  .requiredOption('-o, --output <value>', 'Output directory (required)')
  .option('--useOptions', 'Use options instead of arguments')
  .option('--useUnionTypes', 'Use union types instead of enums')
  .option('--withInterceptor', 'Adds an angular http interceptor')
  .parse(process.argv)
  .opts();

// Use pathToFileURL to convert the path to a URL
import(pathToFileURL(path.resolve(__dirname, '../dist/index.js')).href).then(OpenAPI => {
  if (OpenAPI) {
    OpenAPI.generate({
      input: params.input,
      output: params.output,
      useOptions: params.useOptions,
      useUnionTypes: params.useUnionTypes,
      withInterceptor: params.withInterceptor
    })
    .then(() => {
      console.log(`${colors.green}Files successfully generated at: ${colors.cyan}${params.output}${colors.reset}`);
      process.exit(0);
    })
      .catch(error => {
        console.error(`${colors.red}Error generating files: ${colors.reset}`, error);
        process.exit(1);
      });
  }
}).catch(error => {
  console.error('Error importing OpenAPI:', error);
  process.exit(1);
});