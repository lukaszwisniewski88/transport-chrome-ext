<script>
  import {onMount} from 'svelte'
  import {useTippy} from './actions/useTippy.js'
  export let tooltip = ''
  export let mapURL = null
  const handler = () => {
    if (mapURL) {
      window.open(mapURL)
    }
  }

  let countTest = 0
</script>

<style>
  .container {
    cursor: pointer;
    position: relative;
  }
</style>

<div class="container" use:useTippy={tooltip} on:click={handler}>
  <slot />
</div>
