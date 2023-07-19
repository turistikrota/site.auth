import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type CheckResult = [boolean, string | null]

const whiteList = '.turistikrota.com'

export const useRedirectable = (): CheckResult => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const redirect = searchParams.get('redirect')
    if (redirect) {
      const url = new URL(redirect)
      if (url.hostname.endsWith(whiteList)) {
        setUrl(redirect)
        searchParams.delete('redirect')
        setSearchParams(searchParams)
      }
    }
  }, [searchParams])
  return [!!url, url]
}
