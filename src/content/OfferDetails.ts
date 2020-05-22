/** @module OfferDetails */

import {Offer, Place} from '../interfaces/Offer'
/** @class */
class OfferDetails {
  private vehicleTypeMap = ['trailer', 'rigid', 'twelve', 'sevenHalf', 'small']
  public actualOffer: Offer

  constructor(private background: chrome.runtime.Port) {
    this.background.postMessage({
      action: 'offerDetails',
      payload: this.collect()
    })
  }
  /**
   * Zbiera Dane oferty
   * Nie przyjmuje parametrów, zbiera oferty z aktualnego widoku na Timo
   */
  private collect = (): Offer => {
    this.actualOffer = {
      contact: {
        name: (document.querySelector(
          '#app\\:cnt\\:searchDetail\\:contactPersonName'
        ) as HTMLElement).innerText,
        timoID: Number(
          (document.querySelector(
            '#app\\:cnt\\:searchDetail\\:timocomID'
          ) as HTMLElement).innerText
        ),
        email: (document.querySelector(
          '#app\\:cnt\\:searchDetail\\:contactPersonEmail'
        ) as HTMLElement).innerText
      },
      addedTime: this.dateParse(
        (document.querySelector(
          '#app\\:cnt\\:searchDetail\\:navBar\\:creationDate'
        ) as HTMLElement).innerText
      ),
      freightLength: (document.querySelector(
        '#app\\:cnt\\:searchDetail\\:freightLength'
      ) as HTMLElement).innerText,
      freightWeigth: (document.querySelector(
        '#app\\:cnt\\:searchDetail\\:freightWeight'
      ) as HTMLElement).innerText,
      typeOfGoods: (document.querySelector(
        '#app\\:cnt\\:searchDetail\\:typeOfGoods'
      ) as HTMLElement).innerText,
      additionalInfo: (document.querySelector(
        '#app\\:cnt\\:searchDetail\\:additionalInfo'
      ) as HTMLElement).innerText,
      freightPrice: {
        currency: (document.querySelector(
          '#app\\:cnt\\:searchDetail\\:currency'
        ) as HTMLElement).innerText,
        value: (document.querySelector(
          '#app\\:cnt\\:searchDetail\\:price'
        ) as HTMLElement).innerText
      },
      vehicleTypes: this.getVehicleType(),
      vehicleBody: (document.querySelector(
        '#app\\:cnt\\:searchDetail\\:vehicleBodies'
      ) as HTMLElement).innerText,
      remarks: (document.querySelector(
        '#app\\:cnt\\:searchDetail\\:remarks'
      ) as HTMLElement).innerText,
      distance: +(document.querySelector(
        '#app\\:cnt\\:searchDetail\\:estimatedDistance'
      ) as HTMLElement).innerText,
      loadingPlacesAmount: +(document.querySelector(
        '#app\\:cnt\\:searchDetail\\:loadingPlacesAmount'
      ) as HTMLElement).innerText,
      deliveryPlacesAmount: +(document.querySelector(
        '#app\\:cnt\\:searchDetail\\:unloadingPlacesAmount'
      ) as HTMLElement).innerText,
      places: this.getPlaces()
    }
    return this.actualOffer
  }
  /**
   * Przekształca pole input gdzie zapisane są typy pojazdów w nasz interfejs do zapisu typu pojazdów dla oferty
   * @returns {string[]} Tablica typów pojazdów z mapy vehicleTypeMap
   */
  private getVehicleType = (): {type: string}[] => {
    const num: {type: string}[] = []
    document
      .querySelector<HTMLElement>(
        '#app\\:cnt\\:searchDetail\\:vehicleTypesList'
      )
      .innerText.split(',')
      .forEach((el) => {
        num.push({
          type: el
        })
      })
    return num
  }
  /**
   * Zamienia datę z oferty na poprawny objekt Date
   *
   * @param timoDate {string} Data podana na ofercie w Timo, w formacie DD.MM.YYYY HH:MM:SS
   * @returns {Date} Poprawny objekt Date w JS
   *
   */
  private dateParse(timoDate: string) {
    const splitDate = timoDate.split(/\.|\:|\s/g)
    const dateObj = {
      year: +splitDate[2],
      date: +splitDate[0],
      month: +splitDate[1] - 1,
      hours: +splitDate[3],
      minutes: +splitDate[4],
      seconds: +splitDate[5]
    }
    return new Date(
      dateObj.year,
      dateObj.month,
      dateObj.date,
      dateObj.hours,
      dateObj.minutes,
      dateObj.seconds
    )
  }
  /**
   * Pobiera z oferty listę miejsc załadunku i rozładunku zgodnie z kolejnością podaną w ofercie, dlatego przy kazdym polu mamy loading i delivery jako boolean
   */
  private getPlaces = (): Place[] => {
    const Nodes = document
      .getElementById('loadingPlaces')
      .querySelectorAll('.tco-loadingplace')
    const rowParse = (row: NodeListOf<HTMLElement>, loading: boolean) => {
      return {
        loading,
        delivery: !loading,
        country: row[0].innerText,
        postalCode: row[1].innerText,
        city: row[2].innerText,
        dateFrom: row[3].innerText,
        dateTo: row[4].innerText
      }
    }
    const places: Place[] = []

    Nodes.forEach((place) => {
      if (place.querySelector('.tc-load')) {
        // console.log('loading',index)
        const loading = place.querySelectorAll('.tc-outputbox') as NodeListOf<
          HTMLElement
        >
        places.push(rowParse(loading, true))
      }
      if (place.querySelector('.tc-unload')) {
        const delivery = place.querySelectorAll('.tc-outputbox') as NodeListOf<
          HTMLElement
        >
        places.push(rowParse(delivery, false))
      }
    })
    return places
  }
}
export default OfferDetails
