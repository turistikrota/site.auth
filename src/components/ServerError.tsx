import ErrorPage from '@turistikrota/ui/pages/error'
import { useTranslation } from 'react-i18next'

export default function ServerError() {
  const { t } = useTranslation(['error'])
  return <ErrorPage code={500} title={t('title')} subtitle={t('subtitle')} button={<></>} />
}
