import { Config } from '@/config/config'
import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { useReSendVerifySchema } from '@/schemas/re-send-verify.schema'
import Button from '@turistikrota/ui/button'
import Input from '@turistikrota/ui/form/input'
import { useIsSmallMobile } from '@turistikrota/ui/hooks/dom'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Spin from 'sspin'
import Turnstile from 'turnstile-next'
import { checkWidgetRender, refreshTurnstile } from 'turnstile-next/utils'

export default function ReSendVerifyForm() {
  const { t, i18n } = useTranslation(['auth', 'validation'])
  const isSmallMobile = useIsSmallMobile()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchParams] = useSearchParams()
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const schema = useReSendVerifySchema()
  const navigate = useNavigate()
  const email = searchParams.get('email') || ''
  const form = useFormik({
    initialValues: {
      email: email,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: schema,
    onSubmit: (values) => {
      setIsLoading(true)
      httpClient
        .post(
          apiUrl(Services.Auth, '/re-verify'),
          {
            email: values.email,
          },
          {
            [Config.headers.TurnstileToken]: turnstileToken,
          },
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success(t('auth:reSend.success'))
            navigate('/')
          }
        })
        .catch((error) => {
          refreshTurnstile()
          parseApiError({
            error: error?.response?.data,
            toast,
            form,
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
  })

  useEffect(() => {
    form.setFieldValue('email', email)
  }, [email])

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
    form.handleSubmit()
  }

  return (
    <Spin loading={isLoading}>
      <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          {t('auth:reSend.title')}
        </h1>
        <div>
          <form className='space-y-4 md:space-y-6 ease-in' autoComplete='on' onSubmit={onSubmit}>
            <Input
              label={t('auth:reSend.email')}
              name='email'
              id='email'
              type='email'
              required
              autoFocus
              autoComplete='on'
              onChange={form.handleChange}
              value={form.values.email}
              onBlur={form.handleBlur}
              error={form.errors.email}
              ariaLabel={t('auth:reSend.email')}
            />
            <Turnstile
              siteKey={Config.turnstile.siteKey}
              locale={i18n.language}
              onError={onError}
              onVerify={onVerify}
              size={isSmallMobile ? 'compact' : 'normal'}
            />
            <Button htmlType='submit'>{t('auth:reSend.button')}</Button>
          </form>
        </div>
      </div>
    </Spin>
  )
}
