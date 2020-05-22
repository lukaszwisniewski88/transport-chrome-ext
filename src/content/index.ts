import OfferDetailsDispatcher from './OfferDetailsDispatcher'
import {fromEvent, zip} from 'rxjs'
import {map, elementAt} from 'rxjs/operators'
import OfferDetails from './OfferDetails'
import UserProfile from './userProfile'
// @ts-ignore
import statusBox from './statusBox/statusBox.svelte'
// @ts-ignore
let statusComponent = null

const state = {
  visited: [] as HTMLElement[],
  background: chrome.runtime.connect(),
  user: new UserProfile()
}
OfferDetailsDispatcher()
const offersList = document.querySelector(
  '#app\\:cnt\\:ricosForm\\:freightResultList'
)
const user$ = fromEvent(window, 'userData')
const offer$ = fromEvent(window, 'newOffer')
const list$ = fromEvent(window, 'listView')
const clickList$ = fromEvent(offersList, 'click')

zip(clickList$, offer$)
  .pipe(map(([click]) => click.target as HTMLElement))
  .subscribe((element) => {
    state.visited.push(element.parentElement)
  })

user$.subscribe(() => {
  state.background.postMessage({
    action: 'userData',
    payload: {
      name: state.user.firstName + ' ' + state.user.lastName,
      id: state.user.userId,
      timoID: state.user.companyId,
      email: state.user.email
    }
  })
})
offer$.subscribe(() => {
  const offerState = new OfferDetails(state.background)
  const fieldset = document.getElementById('app:cnt:searchDetail:remarks')
    .parentElement.parentElement
  statusComponent = new statusBox({
    target: fieldset,
    props: {
      offer: offerState
    }
  })
})

list$.subscribe(() => {
  // @ts-ignore
  if (statusComponent != null) {
    // @ts-ignore
    statusComponent.$destroy()
  }
  document
    .querySelectorAll(
      '#app\\:cnt\\:ricosForm\\:freightResultList>.tc-jsonTable-results>.body>.page>div'
    )
    .forEach((el) => {
      state.visited.map((vs) => {
        console.log(vs.innerText)
      })
    })
  return true
})
