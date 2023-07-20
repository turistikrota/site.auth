import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const detectLocale = (): string => {
  const host = window.location.host
  const subdomain = host.split('.')[0]
  if (subdomain === 'giris') return 'tr'
  return 'en'
}

console.log('locale::', detectLocale())

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: detectLocale(),
    supportedLngs: ['tr', 'en'],
    interpolation: {
      escapeValue: false,
    },
  })
export default i18n
