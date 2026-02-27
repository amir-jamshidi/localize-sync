import fetch from 'node-fetch';

const LANG_MAP = {
  en: 'en-US',
  de: 'de-DE',
  fr: 'fr-FR',
  ar: 'ar-SA',
  es: 'es-ES',
  it: 'it-IT',
  tr: 'tr-TR'
};

export async function translateText(text, fromLang, toLang) {
  const langPair = `${LANG_MAP[fromLang] || fromLang}|${LANG_MAP[toLang] || toLang}`;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.responseStatus === 200) {
      return data.responseData.translatedText;
    }
    return null;
  } catch (err) {
    console.error(`❌ Error translating "${text}":`, err.message);
    return null;
  }
}
