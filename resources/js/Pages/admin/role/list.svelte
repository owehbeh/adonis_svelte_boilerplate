<script>
  import { txt } from '../../../language'
  import MainLayout from '../../../layouts/main.svelte'
  import { confirmModal, decodeProps, parseDbDate, PostThis } from '../../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>
      {txt('Roles')}
      <a href="/admin/roles/edit" class="btn btn-square btn-outline btn-sm">
        <span class="material-icons">add</span>
      </a>
    </h1>
    <br />
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>{txt('Name')}</th>
            <th>{txt('Updated')}</th>
            <th>{txt('Users')}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {#each $page.props.roleList as role}
            <tr>
              <td><a href="/admin/roles/{role.id}">{role.name}</a></td>
              <td><a href="/admin/roles/{role.id}">{parseDbDate(role.updatedAt)}</a></td>
              <td>{role.user?.length}</td>
              <td>
                <a href="/admin/roles/edit/{role.id}" class="btn btn-square btn-outline btn-sm">
                  <span class="material-icons">edit</span>
                </a>
                <button
                  on:click={() => {
                    confirmModal(
                      `${txt('Deleting')} ${txt('Role')} ${role.name}`,
                      'Are you sure?',
                      'Delete',
                      () => {
                        PostThis(`/admin/roles/delete/${role.id}`, null)
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
