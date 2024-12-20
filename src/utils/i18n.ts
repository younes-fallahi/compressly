import Polyglot from 'node-polyglot';
import fs from 'fs';
import path from 'path';

const localesDir = path.join(__dirname, '../locales');
console.log(localesDir);

// Helper function to load translations
function loadTranslations(locale: string): object {
  const file = path.join(localesDir, `${locale}.json`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

let polyglot;
const language = 'en'; // Default language

function initPolyglot(lang: string = language) {
  polyglot = new Polyglot({
    phrases: loadTranslations(lang),
    locale: lang,
  });
  return polyglot;
}

export default initPolyglot;