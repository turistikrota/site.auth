export type RouteType = {
  auth: {
    reSend: string
  }
  contracts: {
    terms: string
    privacyNotify: string
    privacy: string
  }
}

export type Locales = 'en' | 'tr'

const Routes: Record<Locales, RouteType> = {
  tr: {
    auth: {
      reSend: '/etkinlestir/tekrar-gonder',
    },
    contracts: {
      terms: 'https://turistikrota.com/tr/sozlesmeler/kullanim-kosullari',
      privacyNotify: 'https://turistikrota.com/tr/sozlesmeler/gizlilik-bildirimi',
      privacy: 'https://turistikrota.com/tr/sozlesmeler/kisisel-verilerin-korunmasi-ve-gizlilik-politikasi',
    },
  },
  en: {
    auth: {
      reSend: '/activate/re-send-code',
    },
    contracts: {
      terms: 'https://turistikrota.com/en/contracts/terms-of-use',
      privacyNotify: 'https://turistikrota.com/en/contracts/privacy-notice',
      privacy: 'https://turistikrota.com/en/contracts/privacy-and-protection-of-personal-data',
    },
  },
}

export const getStaticRoute = (locale: string) => {
  return Routes[locale as Locales]
}

export const mergeUrlWithLocale = (locale: string, url: string) => `/${locale}${url}`
