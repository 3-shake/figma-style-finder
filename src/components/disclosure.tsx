import { ComponentProps, useState, VFC } from 'react'
import {
  DisclosureItem as DisclosureItem_,
} from 'figma-ui-components'

export const DisclosureItem: VFC<ComponentProps<typeof DisclosureItem_>> =
  (props) => {
    const [open, setOpen] = useState(false)
    const handler = () => {
      setOpen((open) => !open)
      props?.onClick?.()
    }
    return (
      <DisclosureItem_
        {...props}
        isExpanded={props.isExpanded === undefined ? open : props.isExpanded}
        onClick={handler}
        css={{ '& > div': { paddingTop: 0, paddingBottom: 0 } }}
      />
    )
  }
