import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from './translationEN.json';
import translationUA from './translationUA.json';

const resources = {
  ua: {
    translation: translationUA,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    whitelist: ['ua', 'en'],
    debug: true,
    detection: {
      order: ['localStorage', 'cookie'],
      cache: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
