import { FC, Fragment } from 'react'
import { Divider } from 'figma-ui-components'
import { Text } from '/components/text'

export const Tab: FC<{active?: boolean, children: string, onClick?: () => void}> = ({ active, children, onClick }) => (
  <Text bold onClick={onClick} css={{
    cursor: 'default',
    opacity: active ? 1 : 0.7,
    '&:hover': {
      opacity: 1,
    },
  }}>{children}</Text>
)

export const Tabs: FC<{tabs: Record<string, {label: string, active?: boolean, onClick?: () => void}>}> = ({ tabs }) => (
  <Fragment>
    <div css={{
      display: 'flex',
      gap: 8,
      paddingTop: 4,
      paddingBottom: 4,
    }}>
      {Object.entries(tabs).map(([value, { label, active, onClick }]) => (
        <Tab key={value} active={active} onClick={onClick}>{label}</Tab>
      ))}
    </div>
    <Divider />
  </Fragment>
)
