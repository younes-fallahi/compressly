import Polyglot from "node-polyglot";
import en from "../locales/en.json";
import fa from "../locales/fa.json";

// Supported languages
const translations: Record<string, Record<string, string>> = {
  en,
  fa,
};

export function initPolyglot(language: string = "en"): Polyglot {
  const phrases = translations[language] || translations.en; // Default to English if language not supported
  return new Polyglot({ phrases, locale: language });
}
