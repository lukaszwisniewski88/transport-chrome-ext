<script>
  import Wrapper from './IconWrapper.svelte'
  import {getStartPoint} from './actions/getStartPoint.js'
  import {useMap} from './actions/useMap.js'
  export let offer
  let URL
  let image
  $: if (offer) {
    image = getImageLink(offer.places)
    URL = 'https://www.google.com/maps/dir/?api=1' + image
  }

  const getImageLink = (places) => {
    //add waypoints here
    //waypoints:
    const lastIndex = places.length - 1
    let destination =
      places[lastIndex].postalCode + ' ' + places[lastIndex].city
    let waypoints = places
      .filter((element, index) => {
        if (index === places.length - 1) return false
        else return true
      })
      .map((element) => element.postalCode + ' ' + element.city)
      .reduce((summary, element) => summary + '|' + element)

    //return '&waypoints='

    let gMaps = 'https://www.google.com/maps/dir/?api=1'
    let propertiesUri =
      '&origin=' +
      getStartPoint() +
      '&destination=' +
      destination +
      '&waypoints=' +
      waypoints

    return encodeURI(propertiesUri)
  }
</script>

<style>
  #map {
    width: 64px;
    height: 64px;
  }
  #point {
    position: absolute;
    width: 24px;
    height: 55px;
    top: 0px;
    right: 10px;
  }
  @keyframes bounce {
    0%,
    25%,
    50%,
    75%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-12px);
    }
  }
  #map path {
    fill: url('#GoogleGradient');
  }
  .container:hover #map path {
    fill: url('#GoogleReverse');
  }
  .container:hover #point path {
    animation: bounce 1.2s;
    animation-iteration-count: 2;
  }
</style>

<Wrapper tooltip="Zobacz w Mapach Google" mapURL={URL}>

  <svg
    id="map"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24">
    <defs>
      <linearGradient id="GoogleGradient">
        <stop offset="25%" stop-color="#4285F4" />
        <stop offset="50%" stop-color="#34A853" />
        <stop offset="75%" stop-color="#FBBC05" />
        <stop offset="100%" stop-color="#EA4335" />
      </linearGradient>
      <linearGradient id="GoogleReverse">
        <stop offset="25%" stop-color="#EA4335" />
        <stop offset="50%" stop-color="#FBBC05" />
        <stop offset="75%" stop-color="#34A853" />
        <stop offset="100%" stop-color="#4285F4" />
      </linearGradient>
    </defs>
    <path
      d="M22.428 4.173l-6.978-1.952-6.999
      1.971-6.508-1.846c-0.077-0.023-0.165-0.036-0.256-0.036-0.518 0-0.938
      0.42-0.938 0.938v0 15.965c0.002 0.511 0.343 0.943 0.81 1.080l0.008 0.002
      6.882 1.952 7.002-1.972 6.609 1.849c0.076 0.022 0.163 0.035 0.252 0.035
      0.518 0 0.938-0.42
      0.938-0.938v0-15.965c-0.001-0.513-0.345-0.945-0.814-1.081l-0.008-0.002zM7.641
      20.459l-5.391-1.529v-14.938l5.391 1.529zM14.701 18.929l-5.56
      1.566v-14.939l5.56-1.566zM21.75 20.48l-5.549-1.552v-14.939l5.549 1.552z" />
  </svg>
  <svg
    id="point"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 52 52"
    style="enable-background:new 0 0 52 52;"
    xml:space="preserve">
    <path
      style="fill:#EA4335;"
      d="M38.853,5.324L38.853,5.324c-7.098-7.098-18.607-7.098-25.706,0h0
      C6.751,11.72,6.031,23.763,11.459,31L26,52l14.541-21C45.969,23.763,45.249,11.72,38.853,5.324z
      M26.177,24c-3.314,0-6-2.686-6-6
      s2.686-6,6-6s6,2.686,6,6S29.491,24,26.177,24z" />
  </svg>
  <slot />
</Wrapper>
