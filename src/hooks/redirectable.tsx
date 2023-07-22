const whiteList: string[] = (import.meta.env.VITE_REDIRECT_HOSTS as string).split(',')

export const isRedirectable = (url: string): boolean => {
  const toUrl = new URL(url)
  return whiteList.some((host) => toUrl.hostname.endsWith(host))
}
