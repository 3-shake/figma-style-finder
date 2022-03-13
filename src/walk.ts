export const walk = async <StackNode>(
  root: BaseNode,
  f: (node: BaseNode, stack?: StackNode[]) => boolean | Promise<boolean>,
  stack?: StackNode[]
) => {
  if (!(await f(root, stack))) {
    return
  }
  if (!('children' in root)) {
    return
  }
  await Promise.all(
      root.children.map(async (child) => {
        await walk(child, f)
      })
  )
}
