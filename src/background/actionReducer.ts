import Message from '../interfaces/Message'
import md5 from 'md5'
import {user, strapi} from './globals'

const actionReducer = (msg: Message, port: chrome.runtime.Port) => {
  switch (msg.action) {
    case 'userData':
      user
        .login(msg.payload)
        .then((success) => console.log('loggedIN', success))
      break
    case 'offerDetails':
      msg.payload.hash = md5(JSON.stringify(msg.payload))
      if (user.initialized) {
        strapi
          .get('/timo-offers/check/' + msg.payload.hash, {
            headers: {
              Authorization: `Bearer ${user.JWT}`
            }
          })
          .then((response) => {
            // odpowiadam ze statusem oferty
            port.postMessage({
              action: 'check',
              payload: response.data
            })
            if (response.data.offer === 'inDatabase') {
              console.log('W BAZIE!')
            } else {
              strapi.post('/timo-offers', msg.payload, {
                headers: {
                  Authorization: `Bearer ${user.JWT}`
                }
              })
            }
          })
      }
      break
  }
  return true
}

export default actionReducer
