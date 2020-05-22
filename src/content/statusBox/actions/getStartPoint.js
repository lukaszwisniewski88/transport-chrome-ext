export const getStartPoint = () => {
  let startInput = {
    postalCode: document.querySelector(
      '#app\\:cnt\\:searchForm\\:startGeoZone\\:zip'
    ).value,
    city: document.querySelector(
      '#app\\:cnt\\:searchForm\\:startGeoZone\\:city'
    ).value,
    disabled: document
      .querySelector('#app\\:cnt\\:searchForm\\:startGeoZone\\:country')
      .getAttribute('disabled')
  }

  let gpsGeo = {
    position: document.querySelector(
      '#app\\:cnt\\:searchForm\\:startTrackingDevice\\:trackingDeviceLocation'
    ).innerText,
    disabled: document
      .querySelector(
        '#app\\:cnt\\:searchForm\\:startTrackingDevice\\:trackingDeviceLocation'
      )
      .getAttribute('disabled')
  }
  if (!startInput.disabled) {
    return startInput.postalCode + ' ' + startInput.city
  } else if (!gpsGeo.disabled) {
    console.log('POZYCJA GPS')
    if (gpsGeo.position.length > 11) {
      return ''
    } else return gpsGeo.position
  } else return ''
}
