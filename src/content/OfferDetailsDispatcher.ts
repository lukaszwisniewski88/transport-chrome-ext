/**
 * Funkcja która dodaje MutationObserver na 'loading indicator' z paska stanu na giełdzie Timo.
 * @fires #newOffer
 * @fires #listView
 */
const OfferDetailsDispatcher = () => {
  /** @event #newOffer
   * Mówi że użytkownik klinął na ofertę i jest w widoku oferty
   */

  const offerEvent = new Event('newOffer')
  /** @event #listView
   * Mówi że użytkownik jest w tym momencie na liście wszystkich frachtów
   */
  const listEvent = new Event('listView')

  /** próbuję pobrać testowo któryś element oferty, aby widzieć czy skrypt nie został załadowany już w tym widoku
   * @default null czyli skrypt załadowany poza widokiem oferty
   */
  const offerDetailElement = document.querySelector<HTMLElement>(
    '#app\\:cnt\\:searchDetail\\:timocomID'
  )

  /** formularz wyszukiwania ofert na giełdzie */
  const searchForm = document.querySelector<HTMLElement>(
    '#app\\:cnt\\:searchForm'
  )

  /** wskaźnik ładowania, zakładam że jak pojawi się i zniknie wskaźnik, coś się zmieniło, załadowała się nowa oferta, lub nowa część listy  */
  const loadingIndicator = document.querySelector<HTMLElement>(
    '#app\\:cnt\\:searchDetail\\:navBar\\:ajaxStatusPanelDetail_complete'
  )

  const observerOptions = {
    attributes: true,
    attributeFilter: ['style']
  }

  const eventEmitter = (record: MutationRecord[]) => {
    /** @field Wskazuje czy pojawił się na stronie formularz wyszukiwania ofert */
    let searchFormEventMemo = false

    if (record[0].target === searchForm) {
      searchFormEventMemo = true
      if (searchForm.style.display === 'block') window.dispatchEvent(listEvent)
    }
    if (record[0].target === loadingIndicator) {
      if (
        searchForm.style.display === 'none' &&
        loadingIndicator.style.display === 'block'
      ) {
        if (!searchFormEventMemo) {
          window.dispatchEvent(listEvent)
        }
        window.dispatchEvent(offerEvent)
        searchFormEventMemo = false
      }
    }
  }

  const offerObserver = new MutationObserver(eventEmitter)

  const loadingObserver = new MutationObserver(eventEmitter)

  if (searchForm.style.display === '' && offerDetailElement === null) {
    window.dispatchEvent(listEvent)
  } else window.dispatchEvent(offerEvent)
  offerObserver.observe(searchForm, observerOptions)
  loadingObserver.observe(loadingIndicator, observerOptions)
}

export default OfferDetailsDispatcher
