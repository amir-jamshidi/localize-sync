import fs from 'fs';
import path from 'path';
import { translateText } from '../utils/translateText.js';

export async function translate(results, config) {
  for (const result of results) {
    const { lang, missingKeys, sourceKeys } = result;
    const filePath = path.join(config.dir, `${lang}.json`);
    const targetData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (missingKeys.length === 0) {
      console.log(`✅ ${lang}.json - Nothing to translate`);
      continue;
    }

    console.log(`\n🌍 ${lang}.json - Translating ${missingKeys.length} keys...\n`);

    for (const flatKey of missingKeys) {
      const originalText = sourceKeys[flatKey];
      process.stdout.write(`   🔄 ${flatKey}: "${originalText}" → `);
      const translated = await translateText(originalText, config.source, lang);

      const parts = flatKey.split('.');
      let current = targetData;
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = translated ?? `⚠️ MISSING: ${originalText}`;
        } else {
          if (!current[part]) current[part] = {};
          current = current[part];
        }
      });
      console.log(translated ? `"${translated}"` : `⚠️ Translation failed, placeholder inserted`);
      await new Promise((r) => setTimeout(r, 300));
    }

    fs.writeFileSync(filePath, JSON.stringify(targetData, null, 2), 'utf-8');
    console.log(`\n💾 ${lang}.json saved`);
  }
}
