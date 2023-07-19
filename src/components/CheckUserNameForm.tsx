import { Config } from '@/config/config'
import { Services, apiUrl } from '@/config/services'
import { createLoginSchema } from '@/schemas/login.schema'
import Button from '@turistikrota/ui/button'
import Input from '@turistikrota/ui/form/input'
import { useIsSmallMobile } from '@turistikrota/ui/hooks/dom'
import { useToast } from '@turistikrota/ui/toast'
import { parseApiError } from '@turistikrota/ui/utils/response'
import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SpinContext } from 'sspin'
import Turnstile from 'turnstile-next'

type Props = {
  onNext: (val: boolean, mail?: string) => void
}

export default function CheckUserNameForm({ onNext }: Props) {
  const { t, i18n } = useTranslation(['auth', 'validation'])
  const isSmallMobile = useIsSmallMobile()
  const toast = useToast()
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const { setSpin } = useContext(SpinContext)
  const form = useFormik({
    initialValues: {
      email: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: createLoginSchema(t),
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

  const onError = () => {
    setTurnstileToken('')
  }

  const onVerify = (token: string) => {
    setTurnstileToken(token)
  }

  return (
    <div>
      <form className='space-y-4 md:space-y-6 ease-in' autoComplete='on' onSubmit={form.handleSubmit}>
        <Input
          label={t('email')}
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
          ariaLabel={t('email')}
        />
        <Turnstile
          siteKey={Config.turnstile.siteKey}
          locale={i18n.language}
          onError={onError}
          onVerify={onVerify}
          size={isSmallMobile ? 'compact' : 'normal'}
        />
        <Button htmlType='submit'>{t('button')}</Button>
      </form>
    </div>
  )
}
