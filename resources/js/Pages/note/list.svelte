<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { confirmModal, decodeProps, parseDbDate, PostThis } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>
      {txt('Notes')}
      <a href="/notes/edit" class="btn btn-square btn-outline btn-sm">
        <span class="material-icons">add</span>
      </a>
    </h1>
    <br />
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>{txt('id')}</th>
<th>{txt('title')}</th>
<th>{txt('body')}</th>
<th>{txt('createdAt')}</th>
<th>{txt('updatedAt')}</th>
<th>{txt('user')}</th>
<th>{txt('request')}</th>
<th>{txt('item')}</th>
<th>{txt('organization')}</th>
<th />

          </tr>
        </thead>
        <tbody>
          {#each $page.props.noteList as note }
            <tr>
              <td><a href="/notes/{note.id}">{note.id}</a></td>
<td><a href="/notes/{note.id}">{note.title}</a></td>
<td><a href="/notes/{note.id}">{note.body}</a></td>
<td><a href="/notes/{note.id}">{note.createdAt}</a></td>
<td><a href="/notes/{note.id}">{note.updatedAt}</a></td>
<td><a href="/users/{note.user.id}">{note.user.id}</a></td>
<td>{note.request?.length}</td>
<td>{note.item?.length}</td>
<td><a href="/organizations/{note.organization.id}">{note.organization.id}</a></td>

    <td>
      <a href="/notes/edit/{note.id}" class="btn btn-square btn-outline btn-sm">
      <span class="material-icons">edit</span>
      </a>
      <button
        on:click={() => {
          confirmModal(
            `${txt('Deleting')} ${txt('Note')} ${note.id}`,
            'Are you sure?',
            'Delete',
            () => {
              PostThis(`/notes/delete/${note.id}`, null)
            }
          )
        }}
        class="btn btn-square btn-outline btn-sm btn-warning"
      >
        <span class="material-icons">delete</span>
      </button>
    </td>
    
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</MainLayout>
