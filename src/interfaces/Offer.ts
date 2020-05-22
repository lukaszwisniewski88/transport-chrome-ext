interface Place {
  loading: boolean
  delivery: boolean
  country: string
  postalCode: string
  city: string
  dateFrom: string
  dateTo: string
}

interface Offer {
  contact: {
    name: string
    timoID: number
    email: string
  }
  addedTime: Date
  freightLength: string
  freightWeigth: string
  typeOfGoods: string
  additionalInfo: string
  freightPrice: {
    currency: string
    value: string
  }
  vehicleTypes: {
    type: string
  }[]
  vehicleBody: string
  remarks: string
  distance: number
  loadingPlacesAmount: number
  deliveryPlacesAmount: number
  places: Place[]
}

export {Offer, Place}
