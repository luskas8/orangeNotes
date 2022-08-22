import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from "./en/translation.json";
import translationPT from "./pt/translation.json";
import translationES from "./es/translation.json";

export const resources = {
  en: {
    translationEN,
  },
  pt: {
    translationPT,
  },
  es: {
    translationES,
  },
} as const;

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    fallbackLng: 'en',
    ns: ['translationEN', 'translationPT', 'translationES'],
    debug: import.meta.env.DEV,
    resources,
  });


export default i18n;