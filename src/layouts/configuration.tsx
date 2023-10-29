import GlassEffect from '@turistikrota/ui/design/glass'
import Logo from '@turistikrota/ui/logo'
import { ToastListProvider, ToastProvider } from '@turistikrota/ui/toast'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {
  page: string
}

export default function ConfigurationLayout({ children, page }: React.PropsWithChildren<Props>) {
  const { i18n, t } = useTranslation('auth')

  document.documentElement.lang = i18n.language
  document.title = t(`${page}.meta.title`) + ' | Turistikrota'
  document.querySelector('meta[name="description"]')!.setAttribute('content', t(`${page}.meta.description`))
  document.querySelector('meta[name="keywords"]')!.setAttribute('content', t(`${page}.meta.keywords`))

  return (
    <ToastListProvider>
      <ToastProvider>
        <section className='h-full'>
          <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0 relative'>
            <Link to={`https://turistikrota.com/${i18n.language}`} target='_blank' className='flex items-center mb-6'>
              <Logo />
            </Link>
            <GlassEffect justify='center' align='center'>
              <GlassEffect.Item color='bg-primary' size='lg' position='-ml-20 mt-60' />
              <GlassEffect.Item color='bg-secondary' size='xl' position='ml-10 mt-20' />
            </GlassEffect>
            <div className='w-full bg-second shadow-lg rounded-lg md:mt-0 sm:max-w-md xl:p-0'>{children}</div>
          </div>
        </section>
      </ToastProvider>
    </ToastListProvider>
  )
}
