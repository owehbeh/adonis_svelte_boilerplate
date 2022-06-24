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
      {txt('Users')}
      <a href="/users/edit" class="btn btn-square btn-outline btn-sm">
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
<th>{txt('name')}</th>
<th>{txt('email')}</th>
<th>{txt('createdAt')}</th>
<th>{txt('updatedAt')}</th>
<th>{txt('validated')}</th>
<th>{txt('password')}</th>
<th>{txt('rememberMeToken')}</th>
<th>{txt('superAdmin')}</th>
<th>{txt('note')}</th>
<th>{txt('organization')}</th>
<th>{txt('request')}</th>
<th>{txt('customer')}</th>
<th>{txt('supplier')}</th>
<th>{txt('item')}</th>
<th>{txt('role')}</th>
<th />

          </tr>
        </thead>
        <tbody>
          {#each $page.props.userList as user }
            <tr>
              <td><a href="/users/{user.id}">{user.id}</a></td>
<td><a href="/users/{user.id}">{user.name}</a></td>
<td><a href="/users/{user.id}">{user.email}</a></td>
<td><a href="/users/{user.id}">{user.createdAt}</a></td>
<td><a href="/users/{user.id}">{user.updatedAt}</a></td>
<td>{user.validated}</td>
<td><a href="/users/{user.id}">{user.password}</a></td>
<td><a href="/users/{user.id}">{user.rememberMeToken}</a></td>
<td>{user.superAdmin}</td>
<td>{user.note?.length}</td>
<td><a href="/organizations/{user.organization.id}">{user.organization.id}</a></td>
<td>{user.request?.length}</td>
<td>{user.customer?.length}</td>
<td>{user.supplier?.length}</td>
<td>{user.item?.length}</td>
<td><a href="/roles/{user.role.id}">{user.role.id}</a></td>

    <td>
      <a href="/users/edit/{user.id}" class="btn btn-square btn-outline btn-sm">
      <span class="material-icons">edit</span>
      </a>
      <button
        on:click={() => {
          confirmModal(
            `${txt('Deleting')} ${txt('User')} ${user.id}`,
            'Are you sure?',
            'Delete',
            () => {
              PostThis(`/users/delete/${user.id}`, null)
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
