#!/usr/bin/env node

import { program } from 'commander';
import { loadConfig } from '../src/utils/loadconfig.js';
import { check } from '../src/commands/check.js';
import { report } from '../src/commands/report.js';
import { translate } from '../src/commands/translate.js';

program
  .name('localize-sync')
  .description('Auto detect and translate missing i18n JSON keys')
  .version('1.0.0');

const sharedOptions = (cmd) => {
  return cmd
    .option('-d, --dir <path>', 'Path to locales directory')
    .option('-s, --source <lang>', 'Source language file (without .json)');
};

sharedOptions(
  program.command('check').description('Check missing and extra keys across all locale files')
).action(async (options) => {
  const config = await loadConfig(options);
  await check(config);
});

sharedOptions(
  program.command('report').description('Generate a JSON report of translation coverage')
).action(async (options) => {
  const config = await loadConfig(options);
  const results = await check(config);
  await report(results, config);
});

sharedOptions(
  program.command('translate').description('Auto translate missing keys using MyMemory API')
).action(async (options) => {
  const config = await loadConfig(options);
  const results = await check(config);
  await translate(results, config);
});

sharedOptions(
  program.command('all').description('Run check, translate and report together')
).action(async (options) => {
  const config = await loadConfig(options);
  const results = await check(config);
  await translate(results, config);
  const updatedResults = await check(config);
  await report(updatedResults, config);
});

program.parse();
