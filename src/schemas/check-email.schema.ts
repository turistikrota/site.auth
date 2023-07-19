import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

export const useCheckEmailSchema = () => {
  const { t } = useTranslation(['validation'])

  return Yup.object().shape({
    email: Yup.string().email(t('validation.invalidEmail')).required(t('validation.required')),
  })
}
