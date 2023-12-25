import { Locales } from '@turistikrota/ui/types'

const trSubdomain = import.meta.env.VITE_I18N_TR_SUBDOMAIN as string
const enSubdomain = import.meta.env.VITE_I18N_EN_SUBDOMAIN as string

export const getCurrentServeLocale = (): Locales | null => {
  if (import.meta.env.PROD) {
    const hostname = window.location.hostname
    if (hostname.includes(trSubdomain)) {
      return Locales.tr as Locales
    } else if (hostname.includes(enSubdomain)) {
      return Locales.en as Locales
    }
  } else {
    return null
  }
  return null
}
