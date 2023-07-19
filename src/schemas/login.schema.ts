import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

export const useLoginSchema = () => {
  const { t } = useTranslation(['validation'])

  return Yup.object().shape({
    email: Yup.string().email(t('invalidEmail')).required(t('required')),
    password: Yup.string()
      .min(
        6,
        t('passwordMin', {
          min: 6,
        }),
      )
      .required(t('required')),
  })
}
