import { } from 'react'
import { Styles } from '/communication'
import { useEvent } from '/hooks/event'

export const App = () => {
  const { event } = useEvent()
  const styles = event?.data?.pluginMessage as Styles | undefined
  if (!styles) {
    return <p>Loading...</p>
  }

  console.log('ui', styles)

  return (
    <ul>
      {
        Object.entries(styles.color).map(([key, colors]) => (
          <li key={key}>
            <h2>{key}</h2>
            {
              colors.map((v, id) => (
                <div key={id}>
                  <p>Page: { v.page.name }</p>
                  <p>Node: { v.node.name }</p>
                </div>
              ))
            }
          </li>
        ))
      }
    </ul>
  )
}
