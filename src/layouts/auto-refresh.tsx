import { Services, apiUrl } from '@/config/services'
import { useRedirectableContext } from '@/hooks/redirectable'
import { httpClient } from '@/http/client'
import { openRedirectUrl } from '@/utils/on-login'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'sspin'

const AutoRefreshAccessLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [redirectable, redirectUrl] = useRedirectableContext()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    httpClient
      .get(apiUrl(Services.Auth, '/'), {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          openRedirectUrl(redirectable, redirectUrl)
        }
      })
      .catch((err) => {
        if (err?.response?.data?.isExpire) {
          httpClient
            .put(apiUrl(Services.Auth, '/refresh'), {}, { withCredentials: true })
            .then((res) => {
              if (res.status === 200) {
                openRedirectUrl(redirectable, redirectUrl)
              }
            })
            .catch(() => {
              setIsLoading(false)
            })
        } else {
          setIsLoading(false)
        }
      })
  }, [])
  if (isLoading)
    return (
      <div className='ease-out w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  return <>{children}</>
}

export default AutoRefreshAccessLayout
