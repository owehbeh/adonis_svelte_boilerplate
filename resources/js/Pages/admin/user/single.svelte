<script>
  import { confirmModal, PostThis } from './../../../helpers.js'
  import { txt } from '../../../language'
  import MainLayout from './../../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
  const user = $page.props.user
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>
      <a href="/admin/users">{txt('User')}</a>
      <span>/ {user.name}</span>
      <a href="/admin/users/edit/{user.id}" class="btn btn-square btn-outline btn-sm">
        <span class="material-icons">edit</span>
      </a>
      <button
        on:click={() => {
          confirmModal(
            `${txt('Deleting')} ${txt('User')} ${user.name}`,
            txt('Are you sure?'),
            txt('Delete'),
            () => {
              PostThis(`/admin/users/delete/${user.id}`, null)
            }
          )
        }}
        class="btn btn-square btn-outline btn-sm btn-warning"
      >
        <span class="material-icons">delete</span>
      </button>
    </h2>
    <div class="flex flex-wrap -mx-2">
      <!-- name -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('name')}</h4>
        <p>{user.name}</p>
      </div>
      <!-- email -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('email')}</h4>
        <p>{user.email}</p>
      </div>
      <!-- role -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('role')}</h4>
        <p><a href="/roles/{user.role.id}">{user.role.name}</a></p>
      </div>
      <!-- validated -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('validated')}</h4>
        <p>{user.validated}</p>
      </div>
      <!-- createdAt -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('createdAt')}</h4>
        <p>{parseDbDate(user.createdAt)}</p>
      </div>
      <!-- updatedAt -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('updatedAt')}</h4>
        <p>{parseDbDate(user.updatedAt)}</p>
      </div>
      <!-- password -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('password')}</h4>
        <p>**********</p>
      </div>
    </div>
  </div>
</MainLayout>
