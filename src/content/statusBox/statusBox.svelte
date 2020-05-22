<script>
  import {onMount} from 'svelte'
  import {onDestroy} from 'svelte'
  import ClickIcon from './Icons/ClickIcon.svelte'
  import CompanyIcon from './Icons/ComapnyIcon.svelte'
  import MapIcon from './MapIcon.svelte'

  export let offer
  let background = offer.background.onMessage
  let loading = true
  let seenCount
  let company

  const setData = (data) => {
    loading = false
    console.log(data.payload)
    status = data.payload.status
    company = data.payload.company
    if (data.payload.seenCount) {
      seenCount = data.payload.seenCount + 1
    } else {
      seenCount = 1
    }
  }
  onMount(() => {
    background.addListener(setData)
  })
  onDestroy(() => {
    background.removeListener(setData)
  })
</script>

<style>
  menu {
    display: flex;
    padding: 0px;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
</style>

<section>
  <hgroup>
    <h5>Dodatkowe Informacje</h5>
  </hgroup>

  <menu>
    <ClickIcon {seenCount} />
    <CompanyIcon {company} />
    <MapIcon offer={offer.actualOffer} />
  </menu>
</section>
