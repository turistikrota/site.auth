import AutoRefreshAccessLayout from '@/layouts/auto-refresh'
import ConfigurationLayout from '@/layouts/configuration'
import { openRedirectUrl } from '@/utils/on-login'
import Button from '@turistikrota/ui/button'
import Condition from '@turistikrota/ui/condition'
import { lazy, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import Spin from 'sspin'

const Components = {
  CheckUserName: lazy(() => import('../components/CheckUserNameForm')),
  Login: lazy(() => import('../components/LoginForm')),
  Register: lazy(() => import('../components/RegisterForm')),
}

type Id = 'check-username' | 'login' | 'register'

type ChainEl = {
  title: string
  component: keyof typeof Components
}

const chain: Record<Id, ChainEl> = {
  'check-username': {
    title: 'check.title',
    component: 'CheckUserName',
  },
  login: {
    title: 'login.title',
    component: 'Login',
  },
  register: {
    title: 'register.title',
    component: 'Register',
  },
}

const getActiveChain = (id: Id): ChainEl => {
  return chain[id]
}

function LoginView() {
  const [searchParams] = useSearchParams()
  const { t } = useTranslation(['auth'])
  const [email, setEmail] = useState<string>('')
  const [id, setId] = useState<Id>('check-username')
  const [activeChain, setActiveChain] = useState<ChainEl>(getActiveChain('check-username'))

  const onLogin = () => {
    openRedirectUrl(searchParams.get('redirect'))
  }

  const onRegister = () => {
    setId('login')
    setActiveChain(getActiveChain('login'))
  }

  const onNext = (id: Id, mail?: string) => {
    setId(id)
    setActiveChain(getActiveChain(id))
    if (mail) setEmail(mail)
    else setEmail('')
  }

  const onPrev = () => {
    if (['login', 'register'].includes(id)) {
      setId('check-username')
      setActiveChain(getActiveChain('check-username'))
    }
  }

  return (
    <AutoRefreshAccessLayout>
      <ConfigurationLayout page='login'>
        <Spin.WithContext value={false}>
          <div className='p-4 space-y-4 md:space-y-4 sm:p-4'>
            <div className='flex items-center'>
              <Condition value={['login', 'register'].includes(id)}>
                <Button
                  block={false}
                  variant='transparent'
                  size='normal'
                  className='mr-1'
                  title={t('buttons.back')}
                  onClick={onPrev}
                >
                  <i className='bx bx-left-arrow-alt text-3xl text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'></i>
                </Button>
              </Condition>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                {t(activeChain.title)}
              </h1>
            </div>
            <Condition value={id === 'check-username'}>
              <Components.CheckUserName
                onNext={(val: boolean, mail?: string) => onNext(val ? 'login' : 'register', mail)}
              />
            </Condition>
            <Condition value={id === 'login'}>
              <Components.Login email={email} onLogin={onLogin} />
            </Condition>
            <Condition value={id === 'register'}>
              <Components.Register email={email} onRegister={onRegister} />
            </Condition>
          </div>
        </Spin.WithContext>
      </ConfigurationLayout>
    </AutoRefreshAccessLayout>
  )
}
LoginView.displayName = 'LoginView'

export { LoginView as Component }
