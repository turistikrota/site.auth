import { Config } from '@/config/config'
import { Services, apiUrl } from '@/config/services'
import { httpClient } from '@/http/client'
import { useRegisterSchema } from '@/schemas/register.schema'
import { getStaticRoute } from '@/static/page'
import Button from '@turistikrota/ui/button'
import Checkbox from '@turistikrota/ui/form/checkbox'
import Input from '@turistikrota/ui/form/input'
import { useIsSmallMobile } from '@turistikrota/ui/hooks/dom'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SpinContext } from 'sspin'
import Turnstile from 'turnstile-next'
import { refreshTurnstile } from 'turnstile-next/utils'

type Props = {
  email: string
  onLogin: () => void
}

export default function RegisterForm({ email, onLogin }: Props) {
  const { t, i18n } = useTranslation(['auth', 'validation'])
  const isSmallMobile = useIsSmallMobile()
  const toast = useToast()
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const { setSpin } = useContext(SpinContext)
  const schema = useRegisterSchema()
  const form = useFormik({
    initialValues: {
      email: email,
      password: '',
      privacy: false,
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
            [Config.headers.TurnstileToken]: turnstileToken,
          },
        )
        .then(() => {
          // check 2fa
          onLogin()
        })
        .catch((error) => {
          // isVerifyRequiredForLoginResponse
          parseApiError({
            error: error?.response?.data,
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

  const onCheckboxChange = (val: boolean) => {
    form.setFieldValue('privacy', val)
  }

  const PrivacyNotify = () => (
    <div>
      <Link
        to={getStaticRoute(i18n.language).contracts.privacyNotify}
        className='text-secondary-500 hover:text-secondary-600 dark:hover:text-secondary-400'
        target='_blank'
      >
        <Trans i18nKey='auth:register.privacy.privacyNotify' />
      </Link>
    </div>
  )

  const PrivacyPolicy = () => (
    <Link to={getStaticRoute(i18n.language).contracts.privacy} className='text-secondary-500' target='_blank'>
      {t('auth:register.privacy.privacyPolicy')}
    </Link>
  )

  const TermsOfUse = () => (
    <Link to={getStaticRoute(i18n.language).contracts.terms} className='text-secondary-500' target='_blank'>
      {t('auth:register.privacy.termsOfUse')}
    </Link>
  )

  const Space = () => <>&nbsp;</>

  return (
    <div>
      <form className='space-y-4 md:space-y-6 ease-in' autoComplete='on' onSubmit={onSubmit}>
        <Input
          label={t('auth:login.email')}
          name='email'
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
        <Checkbox
          name='privacy'
          onChange={onCheckboxChange}
          onBlur={onCheckboxChange}
          error={form.errors.privacy}
          value={form.values.privacy}
          required
        >
          <div className='flex flex-wrap items-center'>
            <Trans
              i18nKey='auth:register.privacy.text'
              components={{
                termsOfUse: <TermsOfUse />,
                privacyPolicy: <PrivacyPolicy />,
                privacyNotify: <PrivacyNotify />,
                space: <Space />,
              }}
            />
          </div>
        </Checkbox>
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
