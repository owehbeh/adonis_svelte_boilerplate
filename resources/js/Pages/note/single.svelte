<script>
  import { confirmModal, PostThis } from './../../helpers.js'
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
  const note = $page.props.note
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>
      <a href="/notes">{txt('Notes')}</a>
      <span>/ { note.id}</span>
      <a href="/notes/edit/{ note.id }" class="btn btn-square btn-outline btn-sm">
        <span class="material-icons">edit</span>
      </a>
      <button
        on:click={() => {
          confirmModal(
            `${txt('Deleting')} ${txt('Note')} ${ note.id}`,
            txt('Are you sure?'),
            txt('Delete'),
            () => {
              PostThis(`/notes/delete/${ note.id}`, null)
            }
          )
        }}
        class="btn btn-square btn-outline btn-sm btn-warning"
      >
        <span class="material-icons">delete</span>
      </button>
    </h2>
    <div class="flex flex-wrap -mx-2">
      <!-- id -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('id')}</h4>
  <p>{note.id}</p>
</div>
<!-- title -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('title')}</h4>
  <p>{note.title}</p>
</div>
<!-- body -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('body')}</h4>
  <p>{note.body}</p>
</div>
<!-- createdAt -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('createdAt')}</h4>
  <p>{note.createdAt}</p>
</div>
<!-- updatedAt -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('updatedAt')}</h4>
  <p>{note.updatedAt}</p>
</div>
<!-- user -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('user')}</h4>
  <p><a href="/users/{note.user.id}">{note.user.id}</a></p>
</div>
<!-- request -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('request')}</h4>
  <p><a href="#note-request-modal" class="cursor-pointer">{txt('View')} ({note.request?.length})</a></p>
</div>
<!-- item -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('item')}</h4>
  <p><a href="#note-item-modal" class="cursor-pointer">{txt('View')} ({note.item?.length})</a></p>
</div>
<!-- organization -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('organization')}</h4>
  <p><a href="/organizations/{note.organization.id}">{note.organization.id}</a></p>
</div>

    </div>
  <!-- request modal -->
<div class="modal modal-bottom sm:modal-middle" id="note-request-modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">{txt('request')}</h3>
    <ul class="menu p-2">
      {#each note.request as requestItem}
        <li class="m-0"><a href="/requests/{ requestItem.id }" class="m-0">{ requestItem.id }</a></li>
      {/each}
    </ul>
    <div class="modal-action">
      <a href="##" class="btn">{txt('Close')}</a>
    </div>
  </div>
</div>
<!-- item modal -->
<div class="modal modal-bottom sm:modal-middle" id="note-item-modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">{txt('item')}</h3>
    <ul class="menu p-2">
      {#each note.item as itemItem}
        <li class="m-0"><a href="/items/{ itemItem.id }" class="m-0">{ itemItem.id }</a></li>
      {/each}
    </ul>
    <div class="modal-action">
      <a href="##" class="btn">{txt('Close')}</a>
    </div>
  </div>
</div>

  </div>
</MainLayout>
