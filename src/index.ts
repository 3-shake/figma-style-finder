import { Styles } from '/communication'
import { walk } from '/walk'

type Unit = {
  page: PageNode
  node: SceneNode
}

const focus = ({ page, node }: Unit): void => {
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

const getStyles = async (): Promise<Styles> => {
  const ret: Styles = { color: {}, text: {} }
  await Promise.all(figma.root.children.map(async (page) => {
    await walk(page, (node) => {
      if (node.type === 'PAGE' || node.type === 'DOCUMENT') {
        return true
      }
      fillFinder(node).map((style) => {
        if (!ret.color[style]) {
          ret.color[style] = {
            [page.id]: [
              node.id,
            ],
          }
          return
        }
        if (!ret.color[style][page.id]) {
          ret.color[style][page.id] = [node.id]
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
