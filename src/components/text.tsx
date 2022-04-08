import { Fragment, ReactNode, VFC } from 'react'
import { CSSObject } from '@emotion/react'
import { Type11Pos, Type11PosBold } from 'figma-ui-components'

export const Text: VFC<{
  bold?: boolean,
  children: ReactNode,
  css?: CSSObject
}> = (props) => (
  <Fragment>
    { props.bold ?
      <Type11PosBold {...props}>{props.children}</Type11PosBold> :
      <Type11Pos {...props}>{props.children}</Type11Pos>
    }
  </Fragment>
)
