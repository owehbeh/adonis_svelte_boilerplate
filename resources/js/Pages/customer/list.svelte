<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>{txt('Customers')}</h1>
    <br />
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>{txt('id')}</th>
<th>{txt('name')}</th>
<th>{txt('createdAt')}</th>
<th>{txt('updatedAt')}</th>
<th>{txt('organization')}</th>
<th>{txt('createdBy')}</th>
<th>{txt('warehouses')}</th>
<th>{txt('Request')}</th>

          </tr>
        </thead>
        <tbody>
          {#each $page.props.customerList as customer }
            <tr>
              <td><a href="/customers/{customer.id}">{customer.id}</a></td>
<td><a href="/customers/{customer.id}">{customer.name}</a></td>
<td><a href="/customers/{customer.id}">{customer.createdAt}</a></td>
<td><a href="/customers/{customer.id}">{customer.updatedAt}</a></td>
<td>{customer.organization}</td>
<td>{customer.createdBy}</td>
<td>{customer.warehouses?.length}</td>
<td>{customer.Request?.length}</td>

            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</MainLayout>
