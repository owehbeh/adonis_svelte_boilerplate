<script>
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>Roles</h1>
    <br />
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>id</th>
<th>name</th>
<th>createdAt</th>
<th>updatedAt</th>
<th>permissions</th>
<th>organization</th>
<th>User</th>

          </tr>
        </thead>
        <tbody>
          {#each $page.props.roleList as role }
            <tr>
              <td><a href="/roles/{role.id}">{role.id}</a></td>
<td><a href="/roles/{role.id}">{role.name}</a></td>
<td><a href="/roles/{role.id}">{role.createdAt}</a></td>
<td><a href="/roles/{role.id}">{role.updatedAt}</a></td>
<td>{role.permissions}</td>
<td>{role.organization}</td>
<td>{role.User?.length}</td>

            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</MainLayout>
