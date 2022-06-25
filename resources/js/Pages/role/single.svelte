<script>
  import { confirmModal, PostThis } from './../../helpers.js'
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
  const role = $page.props.role
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>
      <a href="/admin/roles">{txt('Roles')}</a>
      <span>/ {role.name}</span>
      <a href="/admin/roles/edit/{role.id}" class="btn btn-square btn-outline btn-sm">
        <span class="material-icons">edit</span>
      </a>
      <button
        on:click={() => {
          confirmModal(
            `${txt('Deleting')} ${txt('Role')} ${role.name}`,
            txt('Are you sure?'),
            txt('Delete'),
            () => {
              PostThis(`/admin/roles/delete/${role.id}`, null)
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
        <p>{role.name}</p>
      </div>
      <!-- updatedAt -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('updatedAt')}</h4>
        <p>{role.updatedAt}</p>
      </div>
      <!-- User -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('User')}</h4>
        <p>
          <a href="#role-User-modal" class="cursor-pointer">{txt('View')} ({role.User?.length})</a>
        </p>
      </div>
      <!-- permissions -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('permissions')}</h4>
        {#each role.permissions as permission}
          <p>{permission}</p>
        {/each}
      </div>
    </div>
    <!-- User modal -->
    <div class="modal modal-bottom sm:modal-middle" id="role-User-modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{txt('User')}</h3>
        <ul class="menu p-2">
          {#each role.User as UserItem}
            <li class="m-0"><a href="/Users/{UserItem.id}" class="m-0">{UserItem.name}</a></li>
          {/each}
        </ul>
        <div class="modal-action">
          <a href="##" class="btn">{txt('Close')}</a>
        </div>
      </div>
    </div>
  </div>
</MainLayout>
