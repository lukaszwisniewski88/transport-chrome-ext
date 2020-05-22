import tippy from 'tippy.js'

export function useTippy(node, content) {
  const toolTip = tippy(node, {
    content: content,
    arrow: true,
    placement: 'bottom',
    theme: 'tomato'
  })
  if (content === '') toolTip.disable()
  return {
    update(content) {
      if (content.length > 1) {
        toolTip.enable()
      }
      toolTip.setContent(content)
    },
    detroy() {
      toolTip = null
    }
  }
}
