<script>
  import MyNavigation from '../components/navigation.svelte'
  import { txt } from '../language'
  import { modal } from '../helpers'
  export let myData
  let x = 7
  function closeError() {
    myData.flashedMessages = null
  }

  // MODAL
  let modalShowValue
  let modalTitleValue
  let modalContentValue
  let modalButtonTextValue
  let modalFnValue
  modal.show.subscribe((value) => (modalShowValue = value))
  modal.title.subscribe((value) => (modalTitleValue = value))
  modal.content.subscribe((value) => (modalContentValue = value))
  modal.button.subscribe((value) => (modalButtonTextValue = value))
  modal.fn.subscribe((value) => (modalFnValue = value))
  function hideModal() {
    modal.show.set(false)
  }
  // FORM
</script>

{#if myData?.user}
  <MyNavigation {myData}>
    <!-- ERRORS -->
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
    <!-- CONFIRMATION MODAL -->
    <input type="checkbox" id="my-modal" class="modal-toggle" bind:checked={modalShowValue} />
    <div class="modal modal-bottom sm:modal-middle" id="">
      <div class="modal-box">
        <h3 class="font-bold text-xl">{txt(modalTitleValue)}</h3>
        <p class="font-bold text-base">{txt(modalContentValue)}</p>
        <div class="modal-action">
          <button on:click={hideModal} class="btn btn-outline">{txt('Cancel')}</button>
          <button
            on:click={() => {
              modalFnValue()
              hideModal()
            }}
            class="btn">{txt(modalButtonTextValue)}</button
          >
        </div>
      </div>
    </div>
    <!-- DYNAMIC FORM -->
    <form action="" />
    <!-- CONTENT -->
    <slot />
  </MyNavigation>
{:else}
  <div style="height:100vh">
    <slot />
  </div>
{/if}
