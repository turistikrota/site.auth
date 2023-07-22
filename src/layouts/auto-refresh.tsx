import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { openRedirectUrl } from '@/utils/on-login'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Spinner } from 'sspin'

const AutoRefreshAccessLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchParams] = useSearchParams()
  useEffect(() => {
    httpClient
      .get(apiUrl(Services.Auth, '/'), {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          openRedirectUrl(searchParams.get('redirect'))
        }
      })
      .catch((err) => {
        if (err?.response?.data?.isExpire) {
          httpClient
            .put(apiUrl(Services.Auth, '/refresh'), {}, { withCredentials: true })
            .then((res) => {
              if (res.status === 200) {
                openRedirectUrl(searchParams.get('redirect'))
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
