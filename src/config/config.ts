type config = {
  turnstile: {
    siteKey: string
  }
  headers: {
    TurnstileToken: string
    Authorization: string
    AcceptLang: string
    Credentials: string
  }
  cdn: {
    notFound: string
  }
}

export const Config: config = {
  turnstile: {
    siteKey: import.meta.env.TURNSTILE_SITE_KEY!,
  },
  headers: {
    TurnstileToken: 'X-Turnstile-Token',
    Authorization: 'Authorization',
    AcceptLang: 'Accept-Language',
    Credentials: 'Access-Control-Allow-Credentials',
  },
  cdn: {
    notFound: 'https://s3.turistikrota.com/ui/404.png',
  },
}
