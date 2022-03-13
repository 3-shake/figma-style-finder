import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  VFC,
} from 'react'

const EventContext = createContext<null | MessageEvent>(null)

export const EventProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const [event, setEvent] = useState<MessageEvent | null>(null)
  useEffect(() => {
    onmessage = (event) => {
      setEvent(event)
    }
  }, [])

  return <EventContext.Provider value={event}>{children}</EventContext.Provider>
}

export const useEvent = (): {
  event: null | MessageEvent
} => {
  const event = useContext(EventContext)
  return { event }
}
