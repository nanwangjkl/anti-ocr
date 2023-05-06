import { render } from 'solid-js/web'
import App from '@/js/App'

const dispose = render(() => <App />, document.getElementById('app'))

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(dispose)
}
