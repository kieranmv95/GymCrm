import { Provider } from 'react-redux'
import { store } from './store'
import Root from "./screens/Root";

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  )
}
