<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>{txt('Users')}</h1>
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
<th>{txt('notes')}</th>
<th>{txt('organization')}</th>
<th>{txt('request')}</th>
<th>{txt('customer')}</th>
<th>{txt('supplier')}</th>
<th>{txt('item')}</th>
<th>{txt('role')}</th>

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
<td>{user.rememberMeToken}</td>
<td>{user.superAdmin}</td>
<td>{user.notes?.length}</td>
<td><a href="/organizations/{user.organization.id}">{user.organization.id}</a></td>
<td>{user.request?.length}</td>
<td>{user.customer?.length}</td>
<td>{user.supplier?.length}</td>
<td>{user.item?.length}</td>
<td><a href="/roles/{user.role.id}">{user.role.id}</a></td>

            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</MainLayout>
