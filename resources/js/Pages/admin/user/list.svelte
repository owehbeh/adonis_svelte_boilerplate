<script>
  import { txt } from '../../../language'
  import MainLayout from './../../../layouts/main.svelte'
  import { confirmModal, decodeProps, parseDbDate, PostThis } from '../../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>
      {txt('Users')}
      <a href="/admin/users/edit" class="btn btn-square btn-outline btn-sm">
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
            <th>{txt('Email')}</th>
            <th>{txt('Role')}</th>
            <th>{txt('Validated')}</th>
            <th>{txt('Updated')}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {#each $page.props.userList as user}
            <tr>
              <td><a href="/admin/users/{user.id}">{user.name}</a></td>
              <td><a href="/admin/users/{user.id}">{user.email}</a></td>
              <td><a href="/roles/{user.role?.id}">{user.role?.name}</a></td>
              <td>{user.validated ? 'Yes' : 'No'}</td>
              <td><a href="/admin/users/{user.id}">{parseDbDate(user.updatedAt)}</a></td>
              <td>
                <a href="/admin/users/edit/{user.id}" class="btn btn-square btn-outline btn-sm">
                  <span class="material-icons">edit</span>
                </a>
                <button
                  on:click={() => {
                    confirmModal(
                      `${txt('Deleting')} ${txt('User')} ${user.name}`,
                      'Are you sure?',
                      'Delete',
                      () => {
                        PostThis(`/admin/users/delete/${user.id}`, null)
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
