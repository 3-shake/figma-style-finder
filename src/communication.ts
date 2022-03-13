export type StyleType = 'color' | 'text'

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
    pages: Array<Pick<PageNode, 'id' | 'name'>>,
    nodes: Array<Pick<SceneNode, 'id' | 'name'>>,
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
