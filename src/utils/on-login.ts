import { isRedirectable } from '@/hooks/redirectable'

const defaultHost: string = import.meta.env.VITE_REDIRECT_DEFAULT_HOST

export const openRedirectUrl = (redirectUrl: string | null) => {
  const cb = !!redirectUrl && isRedirectable(redirectUrl) ? redirectUrl : defaultHost
  window.open(cb, '_self')
}
