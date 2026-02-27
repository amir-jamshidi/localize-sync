import fs from 'fs';
import path from 'path';
import { flattenKeys } from '../utils/flattenKeys.js';

export async function check(config) {
  const files = fs.readdirSync(config.dir).filter((f) => f.endsWith('.json'));

  if (files.length === 0) {
    console.error('❌ No JSON files found in:', config.dir);
    process.exit(1);
  }

  const sourceFile = `${config.source}.json`;

  if (!files.includes(sourceFile)) {
    console.error(`❌ Source file "${sourceFile}" not found in ${config.dir}`);
    process.exit(1);
  }

  const sourceData = JSON.parse(fs.readFileSync(path.join(config.dir, sourceFile), 'utf-8'));
  const sourceKeys = flattenKeys(sourceData);

  console.log(`\n📋 Source: ${sourceFile} — ${Object.keys(sourceKeys).length} keys\n`);

  const results = [];

  files
    .filter((f) => f !== sourceFile)
    .forEach((file) => {
      const lang = file.replace('.json', '');
      const targetData = JSON.parse(fs.readFileSync(path.join(config.dir, file)));
      const targetKeys = flattenKeys(targetData);

      const missingKeys = Object.keys(sourceKeys).filter((k) => !(k in targetKeys));
      const extraKeys = Object.keys(targetKeys).filter((k) => !(k in sourceKeys));

      console.log(`🌍 ${file}`);
      console.log(
        `   ✅ Translated: ${Object.keys(targetKeys).length} / ${Object.keys(sourceKeys).length}`
      );

      if (missingKeys.length > 0) {
        console.log(`   ❌ Missing keys (${missingKeys.length}):`);
      } else {
        console.log(`   🎉 All keys are translated!`);
      }

      if (extraKeys.length > 0) {
        console.log(`   ⚠️  Extra keys (${extraKeys.length}):`);
        extraKeys.forEach((k) => console.log(`      - ${k}`));
      }

      results.push({ lang, sourceKeys, targetKeys, missingKeys, extraKeys });
    });

  return results;
}
