import { Config } from '@/config/config'
import { Services, apiUrl } from '@/config/services'
import { useCheckEmailSchema } from '@/schemas/check-email.schema'
import Button from '@turistikrota/ui/button'
import Input from '@turistikrota/ui/form/input'
import { useIsSmallMobile } from '@turistikrota/ui/hooks/dom'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SpinContext } from 'sspin'
import Turnstile from 'turnstile-next'
import { checkWidgetRender } from 'turnstile-next/utils'

type Props = {
  onNext: (val: boolean, mail?: string) => void
}

export default function CheckUserNameForm({ onNext }: Props) {
  const { t, i18n } = useTranslation(['auth', 'validation'])
  const isSmallMobile = useIsSmallMobile()
  const toast = useToast()
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const { setSpin } = useContext(SpinContext)
  const schema = useCheckEmailSchema()
  const form = useFormik({
    initialValues: {
      email: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: schema,
    onSubmit: (values) => {
      axios
        .post(
          apiUrl(Services.Auth, '/checkEmail'),
          {
            email: values.email,
          },
          {
            [Config.headers.TurnstileToken]: turnstileToken,
          },
        )
        .then((res) => {
          onNext(res.data, values.email)
        })
        .catch((error) => {
          parseApiError({
            error,
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
    <div>
      <form className='space-y-4 md:space-y-6 ease-in' autoComplete='on' onSubmit={onSubmit}>
        <Input
          label={t('auth:check.email')}
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
          ariaLabel={t('auth:check.email')}
        />
        <Turnstile
          siteKey={Config.turnstile.siteKey}
          locale={i18n.language}
          onError={onError}
          onVerify={onVerify}
          size={isSmallMobile ? 'compact' : 'normal'}
        />
        <Button htmlType='submit'>{t('auth:check.button')}</Button>
      </form>
    </div>
  )
}
