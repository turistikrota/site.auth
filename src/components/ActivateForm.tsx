import { Config } from '@/config/config'
import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { getStaticRoute } from '@/static/page'
import { isVerifyFailResponse } from '@/types/auth'
import Button from '@turistikrota/ui/button'
import { useIsSmallMobile } from '@turistikrota/ui/hooks/dom'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Spin from 'sspin'
import TurnstileInput from 'turnstile-next'
import { checkWidgetRender, refreshTurnstile } from 'turnstile-next/utils'

export default function ActivateForm() {
  const { t, i18n } = useTranslation(['auth', 'validation'])
  const isSmallMobile = useIsSmallMobile()
  const params = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const navigate = useNavigate()
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  useEffect(() => {
    checkWidgetRender()
  }, [])

  const onError = () => {
    setTurnstileToken('')
  }

  const onVerify = (token: string) => {
    setTurnstileToken(token)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!params.code) return toast.error(t('auth:activate.codeNotFound'))
    setIsLoading(true)
    httpClient
      .post(
        apiUrl(Services.Auth, `/${params.code}`),
        {},
        {
          [Config.headers.TurnstileToken]: turnstileToken,
        },
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(t('auth:activate.success'))
          navigate('/')
        }
      })
      .catch((error) => {
        const data = error?.response?.data
        if (isVerifyFailResponse(data) && data.reSendable) {
          return navigate(`${getStaticRoute(i18n.language).auth.reSend}?email=${data.email}`)
        }
        refreshTurnstile()
        parseApiError({
          error: error?.response?.data,
          toast,
          form: {
            setFieldError: (key: string, msg: string) => toast.error(key + ' : ' + msg),
            setSubmitting: () => {},
          },
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Spin loading={isLoading}>
      <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          {t('auth:activate.title')}
        </h1>
        <div>
          <form className='space-y-4 md:space-y-6 ease-in' onSubmit={onSubmit}>
            <TurnstileInput
              siteKey={Config.turnstile.siteKey}
              locale={i18n.language}
              onError={onError}
              onVerify={onVerify}
              size={isSmallMobile ? 'compact' : 'normal'}
            />
            <Button htmlType='submit'>{t('auth:activate.button')}</Button>
          </form>
          <p className='mt-7 text-sm text-center text-gray-600'>
            {t('auth:activate.reSend.notHave')} <br />{' '}
            <Link
              to={getStaticRoute(i18n.language).auth.reSend}
              className='text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-500'
            >
              {t('auth:activate.reSend.send')}
            </Link>
          </p>
        </div>
      </div>
    </Spin>
  )
}
