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
      terms: '/sozlesmeler/kullanim-kosullari',
      privacyNotify: '/sozlesmeler/gizlilik-bildirimi',
      privacy: '/sozlesmeler/kisisel-verilerin-korunmasi-ve-gizlilik-politikasi',
    },
  },
  en: {
    auth: {
      reSend: '/activate/re-send-code',
    },
    contracts: {
      terms: '/contracts/terms-of-use',
      privacyNotify: '/contracts/privacy-notice',
      privacy: '/contracts/privacy-and-protection-of-personal-data',
    },
  },
}

export const getStaticRoute = (locale: string) => {
  return Routes[locale as Locales]
}

export const mergeUrlWithLocale = (locale: string, url: string) => `/${locale}${url}`
