export function useMap(node, url) {
  document.body.appendChild(node)
  //node.src = url

  const loadedCallback = () => {
    console.log('LOADED!!' + new Date())
  }

  node.addEventListener('load', loadedCallback)

  return {
    update(url) {
      // update SRC
      node.src = url
    },
    destroy() {
      // destroy frame

      console.log('DESTROY?')
      node.removeEventListener('load', loadedCallback)
      document.body.removeChild(node)
    }
  }
}
