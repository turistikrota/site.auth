import { createLoginSchema } from '@/schemas/login.schema'
import { useIsSmallMobile } from '@turistikrota/ui/hooks/dom'
import { useToast } from '@turistikrota/ui/toast'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { SpinContext } from 'sspin'

type Props = {
  onNext: (val: boolean, mail?: string) => void
}

export default function CheckUserNameForm({ onNext }: Props) {
  const { t, i18n } = useTranslation(['auth', 'validation'])
  const isSmallMobile = useIsSmallMobile()
  const toast = useToast()
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
      console.log('values::', values)
    },
  })
}
