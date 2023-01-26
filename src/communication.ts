export type StyleType = 'color' | 'text' | 'effect'

export interface Event {
  type: string,
  data: unknown,
  appendix?: unknown,
}

export type Styles = {
  [Type in StyleType]: {
    [StyleKey in string]: {
      [PageId in string]: string[] // array of node id
    }
  }
}

export interface StylesEvent extends Event {
  type: 'styles',
  data: Styles,
  appendix: {
    pages: Record<string, Pick<PageNode, 'id' | 'name'>>,
    nodes: Record<string, Pick<SceneNode, 'id' | 'name'>>,
    styles: Record<string, Pick<BaseStyle, 'id' | 'name'>>,
  },
}

export type Focus = {
  pageId: string
  nodeId: string
}

export interface FocusEvent extends Event {
  type: 'focus',
  data: Focus,
}
