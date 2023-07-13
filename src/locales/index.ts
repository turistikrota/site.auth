type MetaTranslations = {
  title: string
  description: string
  keywords: string
}

type ValidationTranslations = {
  invalidEmail: string
  passwordMin: string
  required: string
}

export type Translations = {
  login: {
    meta: MetaTranslations
    title: string
    email: string
    password: string
    button: string
    success: string
  },
  check: {
    meta: MetaTranslations
    title: string
    email: string
    button: string
  },
  register: {
    meta: MetaTranslations
    title: string
    email: string
    password: string
    button: string
    success: string
    privacy: {
      text: string
      termsOfUse: string
      privacyNotify: string
      privacyPolicy: string
    }
  },
  activate: {
    meta: MetaTranslations
    button: string
    success: string
    codeNotExists: string
    reSend: {
      notHave: string
      send: string
    }
  },
  reSend:  {
    meta: MetaTranslations
    title: string
    email: string
    button: string
    success: string
  },
  validation: ValidationTranslations
}