import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { HmyReactProvider } from '../src'

function App() {
  return (
    <HmyReactProvider getLibrary={() => {}}>
      <div>test!</div>
    </HmyReactProvider>
  )
}

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
