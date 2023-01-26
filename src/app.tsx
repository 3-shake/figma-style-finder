import { Fragment, useState } from 'react'
import { Disclosure } from 'figma-ui-components'
import { StylesEvent, StyleType } from '/communication'
import { DisclosureItem } from '/components/disclosure'
import { Text } from '/components/text'
import { useEvent } from '/hooks/event'
import { TargetIcon } from '/icons/target'
import { Tabs } from './components/tabs'

export const App = () => {
  const [tab, setTab] = useState<StyleType>('color')
  const { event } = useEvent()
  const styles = event?.data?.pluginMessage as StylesEvent | undefined
  if (!styles) {
    return <Text>Loading...</Text>
  }

  return (
    <Fragment>
      <Tabs tabs={{
        color: { label: 'Color', active: tab === 'color', onClick: () => {
          setTab('color')
        } },
        text: { label: 'Text', active: tab === 'text', onClick: () => {
          setTab('text')
        } },
      }}/>
      { tab === 'color' && (
        <Disclosure>
          {
            Object.entries(styles.data.color).sort((a, b) => {
              const a_ = styles.appendix.styles[a[0]]?.name || ''
              const b_ = styles.appendix.styles[b[0]]?.name || ''
              if (a_ > b_) {
                return 1
              }
              return -1
            }).map(([styleKey, pages]) => (
              <DisclosureItem
                label={
                  // eslint-disable-next-line max-len
                  `${styles.appendix.styles?.[styleKey]?.name} (${Object.keys(pages).length})`
                }
                key={styleKey}
                isSection
                content={
                  <Disclosure>
                    {
                      Object.entries(pages).map(([page, nodes], index) => (
                        <DisclosureItem
                          label={
                            // eslint-disable-next-line max-len
                            `${styles.appendix.pages?.[page]?.name} (${nodes.length})`
                          }
                          key={index}
                          content={
                            <ul css={{
                              listStyleType: 'none',
                              padding: 0,
                            }}>
                              {
                                nodes.map((node, id) => (
                                  <li
                                    key={id}
                                    css={{
                                      alignItems: 'center',
                                      display: 'flex',
                                    }}
                                  >
                                    <Text
                                      css={{
                                        flexGrow: 1,
                                      }}
                                    >
                                      { styles.appendix.nodes?.[node]?.name }
                                    </Text>
                                    <TargetIcon
                                      css={{
                                        '&:hover': {
                                          backgroundColor: 'rgba(0, 0, 0, .06)',
                                        },
                                      }}
                                      onClick={() => {
                                        parent.postMessage({
                                          pluginMessage: {
                                            page,
                                            node,
                                          },
                                        }, '*')
                                      }}
                                    />
                                  </li>
                                ))
                              }
                            </ul>
                          }
                        />
                      ))
                    }
                  </Disclosure>
                }
              />
            ))
          }
        </Disclosure>
      )}
      { tab === 'text' && (
        <Disclosure>
          {
            Object.entries(styles.data.text).sort((a, b) => {
              const a_ = styles.appendix.styles[a[0]]?.name || ''
              const b_ = styles.appendix.styles[b[0]]?.name || ''
              if (a_ > b_) {
                return 1
              }
              return -1
            }).map(([styleKey, pages]) => (
              <DisclosureItem
                label={
                  // eslint-disable-next-line max-len
                  `${styles.appendix.styles?.[styleKey]?.name} (${Object.keys(pages).length})`
                }
                key={styleKey}
                isSection
                content={
                  <Disclosure>
                    {
                      Object.entries(pages).map(([page, nodes], index) => (
                        <DisclosureItem
                          label={
                            // eslint-disable-next-line max-len
                            `${styles.appendix.pages?.[page]?.name} (${nodes.length})`
                          }
                          key={index}
                          content={
                            <ul css={{
                              listStyleType: 'none',
                              padding: 0,
                            }}>
                              {
                                nodes.map((node, id) => (
                                  <li
                                    key={id}
                                    css={{
                                      alignItems: 'center',
                                      display: 'flex',
                                    }}
                                  >
                                    <Text
                                      css={{
                                        flexGrow: 1,
                                      }}
                                    >
                                      { styles.appendix.nodes?.[node]?.name }
                                    </Text>
                                    <TargetIcon
                                      css={{
                                        '&:hover': {
                                          backgroundColor: 'rgba(0, 0, 0, .06)',
                                        },
                                      }}
                                      onClick={() => {
                                        parent.postMessage({
                                          pluginMessage: {
                                            page,
                                            node,
                                          },
                                        }, '*')
                                      }}
                                    />
                                  </li>
                                ))
                              }
                            </ul>
                          }
                        />
                      ))
                    }
                  </Disclosure>
                }
              />
            ))
          }
        </Disclosure>
      )}
    </Fragment>
  )
}
