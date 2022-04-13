<script>
  import MyNavigation from '../components/navigation.svelte'
  export let myData
  let x = 7
</script>

{#if myData?.user}
  <MyNavigation {myData}>
    <slot />
  </MyNavigation>
{:else}
  <!-- TODO IMPLEMENT NOT SIGNED MAIN LAYOUT -->
  <div style="height:100vh">
    <slot />
  </div>
{/if}
