import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type CheckResult = [boolean, string | null]

const whiteList: string[] = import.meta.env.VITE_REDIRECT_HOSTS.split(',')

export const useRedirectable = (): CheckResult => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const redirect = searchParams.get('redirect')
    if (redirect) {
      const url = new URL(redirect)
      if (whiteList.some((host) => url.hostname.endsWith(host))) {
        setUrl(redirect)
      } else {
        setUrl(null)
      }
      searchParams.delete('redirect')
      setSearchParams(searchParams)
    }
  }, [searchParams])
  return [!!url, url]
}
