import { Config } from '@/config/config'
import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { useLoginSchema } from '@/schemas/login.schema'
import { getStaticRoute } from '@/static/page'
import { isVerifyRequiredForLoginResponse } from '@/types/auth'
import Button from '@turistikrota/ui/button'
import Input from '@turistikrota/ui/form/input'
import { useIsSmallMobile } from '@turistikrota/ui/hooks/dom'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { SpinContext } from 'sspin'
import Turnstile from 'turnstile-next'
import { refreshTurnstile } from 'turnstile-next/utils'

type Props = {
  email: string
  onLogin: () => void
}

export default function LoginForm({ email, onLogin }: Props) {
  const { t, i18n } = useTranslation(['auth', 'validation'])
  const isSmallMobile = useIsSmallMobile()
  const toast = useToast()
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const { setSpin } = useContext(SpinContext)
  const schema = useLoginSchema()
  const navigate = useNavigate()
  const form = useFormik({
    initialValues: {
      email: email,
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: schema,
    onSubmit: (values) => {
      httpClient
        .post(
          apiUrl(Services.Auth, '/login'),
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              [Config.headers.TurnstileToken]: turnstileToken,
            },
          },
        )
        .then(() => {
          // check 2fa
          onLogin()
        })
        .catch((error) => {
          refreshTurnstile()
          if (isVerifyRequiredForLoginResponse(error)) {
            return navigate(`${getStaticRoute(i18n.language).auth.reSend}?email=${form.values.email}`)
          }
          parseApiError({
            error: error.response.data,
            toast,
            form,
          })
        })
        .finally(() => {
          setSpin(false)
        })
    },
  })

  useEffect(() => {
    refreshTurnstile()
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
    <div>
      <form className='space-y-4 md:space-y-6 ease-in' autoComplete='on' onSubmit={onSubmit}>
        <Input
          label={t('auth:login.email')}
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
          ariaLabel={t('auth:login.email')}
        />
        <Input
          label={t('auth:login.password')}
          name='password'
          type='password'
          id='password'
          autoComplete='on'
          required
          value={form.values.password}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.errors.password}
          ariaLabel={t('auth:login.password')}
          showHide
          hideText={t('auth:utils.hide')}
          showText={t('auth:utils.show')}
        />
        <Turnstile
          siteKey={Config.turnstile.siteKey}
          locale={i18n.language}
          onError={onError}
          onVerify={onVerify}
          size={isSmallMobile ? 'compact' : 'normal'}
        />
        <Button htmlType='submit'>{t('auth:login.button')}</Button>
      </form>
    </div>
  )
}
