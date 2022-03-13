import { render } from 'react-dom'
import { App } from '/app'
import { EventProvider } from '/hooks/event'

const root = document.getElementById('app')

render(
    <EventProvider>
      <App />
    </EventProvider>,
    root,
)
