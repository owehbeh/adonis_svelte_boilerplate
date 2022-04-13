<script>
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
  console.log('DATA', DATA)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>Users</h1>
    <br />
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {#each $page.props.users as user}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.organization.name}</td>
              <td>
                {parseDbDate(user.createdAt)}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</MainLayout>
