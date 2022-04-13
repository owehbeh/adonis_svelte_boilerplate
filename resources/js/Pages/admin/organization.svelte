<script>
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
  console.log('DATA', DATA)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>Organizations</h1>
    <br />
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {#each $page.props.organizations as org}
            <tr>
              <td>{org.name}</td>
              <td>{org.slug}</td>
              <td>
                {new Date(org.createdAt).toLocaleDateString()} -
                {new Date(org.createdAt).toLocaleTimeString()}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</MainLayout>
