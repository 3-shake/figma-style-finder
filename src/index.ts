import { Styles, StylesEvent } from '/communication'
import { walk } from '/walk'

const focus = (target: { page: string, node: string}): void => {
  const page = figma.getNodeById(target.page) as PageNode
  figma.currentPage = page
  page.selection = [figma.getNodeById(target.node) as SceneNode]
}

// returns array of fille style id
const colorFinder = (node: SceneNode): string[] => {
  if (!('fillStyleId' in node)) {
    return []
  }
  if (!('strokeStyleId' in node)) {
    return []
  }
  if (node.fillStyleId === figma.mixed) {
    // TODO: handling text in mixed color
    return []
  }
  return [node.fillStyleId, node.strokeStyleId]
}

const textFinder = (node: TextNode): string[] => {
  if (!('textStyleId' in node)) {
    return []
  }
  if (node.textStyleId=== figma.mixed) {
    // TODO: handling text in mixed color
    return []
  }
  return [node.textStyleId]
}

const getStyles = async (): Promise<StylesEvent> => {
  const styles: Styles = { color: {}, text: {}, effect: {} }
  const ret: StylesEvent = {
    type: 'styles',
    data: styles,
    appendix: {
      pages: {},
      nodes: {},
      styles: {},
    },
  }
  await Promise.all(figma.root.children.map(async (page: PageNode) => {
    await walk(page, (node) => {
      if (node.type === 'PAGE' || node.type === 'DOCUMENT') {
        return true
      }
      colorFinder(node).map((style: string) => {
        if (!style) return
        ret.appendix.pages[page.id] = { id: page.id, name: page.name }
        ret.appendix.nodes[node.id] = { id: node.id, name: node.name }
        const s = figma.getStyleById(style)
        !ret.appendix.styles[style] && s &&
          (ret.appendix.styles[style] = { id: s.id, name: s.name })
        if (!(style in styles.color)) {
          styles.color[style] = { [page.id]: [node.id] }
          return
        }
        if (!(page.id in (styles.color[style] || {}))) {
          Object.assign(styles.color[style], { [page.id]: [] })
        }
        (styles.color[style]?.[page.id] || []).push(node.id) // TypeScript Hack
      })
      if (!(node.type === 'TEXT') ) {
        return true
      }
      textFinder(node).map((style: string) => {
        if (!style) return
        ret.appendix.pages[page.id] = { id: page.id, name: page.name }
        ret.appendix.nodes[node.id] = { id: node.id, name: node.name }
        const s = figma.getStyleById(style)
        !ret.appendix.styles[style] && s &&
          (ret.appendix.styles[style] = { id: s.id, name: s.name })
        if (!(style in styles.text)) {
          styles.text[style] = { [page.id]: [node.id] }
          return
        }
        if (!(page.id in (styles.text[style] || {}))) {
          Object.assign(styles.text[style], { [page.id]: [] })
        }
        (styles.text[style]?.[page.id] || []).push(node.id) // TypeScript Hack
      })
      return true
    })
  }))
  return ret
}

const main = async () => {
  figma.showUI(__html__, { visible: true })
  figma.ui.resize(480, 640)
  const styles = await getStyles()
  console.log(styles)
  figma.ui.postMessage(styles)
  figma.ui.onmessage = (message) => focus(message)
}

main()
