import fs from 'fs';
import path from 'path';

export async function report(results, config) {
  const output = {};

  results.forEach(({ lang, sourceKeys, targetKeys, missingKeys, extraKeys }) => {
    output[lang] = {
      total: Object.keys(sourceKeys).length,
      translated: Object.keys(targetKeys).length,
      coverage: `${Math.round((Object.keys(targetKeys).length / Object.keys(sourceKeys).length) * 100)}%`,
      missingKeys,
      extraKeys
    };
  });

  const reportPath = path.resolve(process.cwd(), 'i18n-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`\n📄 Report saved: ${reportPath}\n`);
}
