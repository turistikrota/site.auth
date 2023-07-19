export const openRedirectUrl = (redirectable: boolean, redirectUrl: string | null) => {
  const cb = redirectable && !!redirectUrl ? redirectUrl : 'https://turistikrota.com'
  window.open(cb, '_self')
}
