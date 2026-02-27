# localize-sync

Auto-detect and translate missing i18n JSON keys using the MyMemory API.

## Install

```bash
npm install -g localize-sync
```

Or use without installing:

```bash
npx localize-sync <command>
```

---

## How it works

`localize-sync` treats one JSON file as the **source of truth** (default: `fa.json`) and compares all other JSON files in the same directory against it. Missing keys are automatically translated via the [MyMemory API](https://mymemory.translated.net/).

---

## Commands

| Command | Description |
|---|---|
| `check` | Show missing and extra keys across all locale files |
| `translate` | Auto-translate missing keys |
| `report` | Generate a `i18n-report.json` coverage report |
| `all` | Run check → translate → report in sequence |

---

## Options

| Flag | Alias | Default | Description |
|---|---|---|---|
| `--dir <path>` | `-d` | `./locales` | Path to your locales directory |
| `--source <lang>` | `-s` | `fa` | Source language filename (without `.json`) |

---

## Usage

```bash
# Check missing keys (source: fa.json, dir: ./locales)
localize-sync check

# Translate missing keys in a custom directory
localize-sync translate --dir ./src/translations

# Use a different source language
localize-sync all --source en

# Combine both options
localize-sync all --dir ./src/i18n --source en
```

---

## Config file (optional)

Instead of passing flags every time, create an `i18n.config.js` in your project root:

```js
// i18n.config.js
export default {
  dir: './src/locales',
  source: 'fa',
}
```

Priority order: `CLI flags` > `i18n.config.js` > `defaults`

---

## Example

Given this structure:

```
locales/
  fa.json   ← source of truth
  en.json   ← partially translated
  de.json   ← empty
```

Running `localize-sync all` will:

1. Detect missing keys in `en.json` and `de.json`
2. Translate them automatically from Persian
3. Save a coverage report to `i18n-report.json`

---

## Report output

```json
{
  "en": {
    "total": 9,
    "translated": 9,
    "coverage": "100%",
    "missingKeys": [],
    "extraKeys": []
  }
}
```

---

## Notes

- Translation is powered by [MyMemory](https://mymemory.translated.net/) — free, no API key required
- A 300ms delay is applied between requests to avoid rate limiting
- If a translation fails, a `⚠️ MISSING: <original>` placeholder is inserted

---