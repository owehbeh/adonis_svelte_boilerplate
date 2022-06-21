<script>
  import MyNavigation from '../components/navigation.svelte'
  export let myData
  let x = 7
  function closeError() {
    myData.flashedMessages = null
  }
</script>

{#if myData?.user}
  <MyNavigation {myData}>
    {#if myData.flashedMessages?.error}
      <div class="alert alert-warning shadow-lg p-5">
        <div>
          <span class="material-icons-outlined">{myData.flashedMessages?.error}</span>
        </div>
        <div class="flex-none">
          <button on:click={closeError} class="btn btn-sm btn-ghost">X</button>
        </div>
      </div>
    {/if}
    <slot />
  </MyNavigation>
{:else}
  <!-- TODO IMPLEMENT NOT SIGNED MAIN LAYOUT -->
  <div style="height:100vh">
    <slot />
  </div>
{/if}
