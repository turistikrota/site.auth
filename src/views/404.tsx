import ErrorPage from '@turistikrota/ui/pages/error'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function NotFoundView() {
  const { t } = useTranslation(['notfound'])
  return (
    <ErrorPage
      title={t('title')}
      subtitle={t('subtitle')}
      button={
        <Link
          to={'/'}
          className='inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4'
        >
          {t('button')}
        </Link>
      }
    />
  )
}
