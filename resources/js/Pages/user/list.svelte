<script>
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>User</h1>
    <br />
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>validated</th>
            <th>notes</th>
            <th>organization</th>
            <th>request</th>
            <th>customer</th>
            <th>supplier</th>
            <th>item</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          {#each $page.props.userList as user}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td>{user.updatedAt}</td>
              <td>{user.validated}</td>
              <td>{user.notes?.length}</td>
              <td><a href="/organizations/{user.organization.id}">{user.organization.name}</a></td>
              <td>{user.request?.length}</td>
              <td>{user.customer?.length}</td>
              <td>{user.supplier?.length}</td>
              <td>{user.item?.length}</td>
              <td><a href="/roles/{user.role.id}">{user.role.name}</a></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</MainLayout>
