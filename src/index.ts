import { Styles, StylesEvent } from '/communication'
import { walk } from '/walk'

type Unit = {
  page: PageNode
  node: SceneNode
}

export const focus = ({ page, node }: Unit): void => {
  figma.currentPage = page
  page.selection = [node]
}

// returns array of fille style id
const fillFinder = (node: SceneNode): string[] => {
  if (!('fillStyleId' in node)) {
    return []
  }
  if (node.fillStyleId === figma.mixed) {
    // TODO: handling text in mixed color
    return []
  }
  return [node.fillStyleId]
}

const getStyles = async (): Promise<StylesEvent> => {
  const styles: Styles = { color: {}, text: {} }
  const ret: StylesEvent = {
    type: 'styles',
    data: styles,
    appendix: {
      pages: {},
      nodes: {},
      styles: {},
    },
  }
  await Promise.all(figma.root.children.map(async (page) => {
    await walk(page, (node) => {
      if (node.type === 'PAGE' || node.type === 'DOCUMENT') {
        return true
      }
      fillFinder(node).map((style) => {
        ret.appendix.pages[page.id] = { id: page.id, name: page.name }
        ret.appendix.nodes[node.id] = { id: node.id, name: node.name }
        const s = figma.getStyleById(style)
        !ret.appendix.styles[style] && s &&
          (ret.appendix.styles[style] = { id: s.id, name: s.name })
        if (!styles.color[style]) {
          styles.color[style] = { [page.id]: [node.id] }
          return
        }
        const t = styles.color[style] as Record<string, string[]>
        if (!t[page.id]) {
          t[page.id] = [node.id]
          return
        }
      })
      return true
    })
  }))
  return ret
}

const main = async () => {
  figma.showUI(__html__, { visible: true })
  const styles = await getStyles()
  figma.ui.postMessage(styles)
}

main()
