import ReSendVerifyForm from '@/components/ReSendVerifyForm'
import ConfigurationLayout from '@/layouts/configuration'

function ReSendCodeView() {
  return (
    <ConfigurationLayout page='reSend'>
      <ReSendVerifyForm />
    </ConfigurationLayout>
  )
}
ReSendCodeView.displayName = 'ReSendCodeView'

export { ReSendCodeView as Component }
