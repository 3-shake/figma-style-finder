import { Fragment, ReactNode, VFC } from 'react'
import { CSSObject } from '@emotion/react'
import { Type11Pos, Type11PosBold } from 'figma-ui-components'

export const Text: VFC<{
  bold?: boolean,
  children: ReactNode,
  css?: CSSObject
  onClick?: () => void
}> = (props) => (
  <Fragment>
    { props.bold ?
    <Type11PosBold {...props} /> :
    <Type11Pos {...props} />
    }
  </Fragment>
)
