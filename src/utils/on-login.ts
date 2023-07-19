const defaultHost: string = import.meta.env.VITE_REDIRECT_DEFAULT_HOST

export const openRedirectUrl = (redirectable: boolean, redirectUrl: string | null) => {
  const cb = redirectable && !!redirectUrl ? redirectUrl : defaultHost
  window.open(cb, '_self')
}
