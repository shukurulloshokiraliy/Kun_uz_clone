import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uzTranslation from './locales/uz.json';
import ruTranslation from './locales/ru.json';
import enTranslation from './locales/en.json';

// localStorage'dan tilni o'qish
const savedLanguage = localStorage.getItem('language') || 'uz';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uzTranslation },
      ru: { translation: ruTranslation },
      en: { translation: enTranslation }
    },
    lng: savedLanguage, // localStorage'dan olingan til
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false
    }
  });

// Til o'zgarganda localStorage'ga saqlash
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;