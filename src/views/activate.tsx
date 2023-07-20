import ActivateForm from '@/components/ActivateForm'
import ConfigurationLayout from '@/layouts/configuration'

function ActivateView() {
  return (
    <ConfigurationLayout page='activate'>
      <ActivateForm />
    </ConfigurationLayout>
  )
}
ActivateView.displayName = 'ActivateView'

export { ActivateView as Component }
