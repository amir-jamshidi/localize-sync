import fs from 'fs';
import path from 'path';

const DEFAULTS = {
  dir: './locales',
  source: 'fa'
};

export async function loadConfig(flags = {}) {
  let fileConfig = {};
  const configPath = path.resolve(process.cwd(), 'i18n.config.js');

  if (fs.existsSync(configPath)) {
    try {
      const imported = await import(configPath);
      fileConfig = imported.default || {};
      console.log('⚙️  Config loaded from i18n.config.js');
    } catch (err) {
      console.warn('⚠️  Failed to load i18n.config.js, using defaults');
    }
  }

  const config = {
    dir: flags.dir || fileConfig.dir || DEFAULTS.dir,
    source: flags.source || fileConfig.source || DEFAULTS.source
  };

  const resolvedDir = path.isAbsolute(config.dir)
    ? config.dir
    : path.resolve(process.cwd(), config.dir);
  if (!fs.existsSync(resolvedDir)) {
    console.log(`❌ Directory not found: ${resolvedDir}`);
    process.exit(1);
  }

  const stat = fs.statSync(resolvedDir);
  if (!stat.isDirectory()) {
    console.error(`❌ Path is not a directory: ${resolvedDir}`);
    process.exit(1);
  }

  config.dir = resolvedDir;
  return config;
}
