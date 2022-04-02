import { Fragment } from 'react'
import { StylesEvent } from '/communication'
import { useEvent } from '/hooks/event'

export const App = () => {
  const { event } = useEvent()
  const styles = event?.data?.pluginMessage as StylesEvent | undefined
  if (!styles) {
    return <p>Loading...</p>
  }

  console.log(styles)

  return (
    <ul>
      {
        Object.entries(styles.data.color).map(([styleKey, pages]) => (
          <li key={styleKey}>
            <h2>
              {styles.appendix.styles?.[styleKey]?.name}
            </h2>
            {
              Object.entries(pages).map(([page, nodes], index) => (
                <Fragment key={index}>
                  <div>{
                    styles.appendix.pages?.[page]?.name
                  }</div>
                  {
                    nodes.map((node, id) => (
                      <p key={id} onClick={() => {
                        parent.postMessage({ pluginMessage: 'hello' })
                      }}>Node: {
                          styles.appendix.nodes?.[node]?.name
                        }</p>
                    ))
                  }
                </Fragment>
              ))
            }
          </li>
        ))
      }
    </ul>
  )
}
