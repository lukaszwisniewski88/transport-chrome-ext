import actionReducer from './actionReducer'

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(actionReducer)
  return true
})
