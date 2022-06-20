<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>{txt('Suppliers')}</h1>
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
            <th>{txt('item')}</th>
          </tr>
        </thead>
        <tbody>
          {#each $page.props.supplierList as supplier}
            <tr>
              <td><a href="/suppliers/{supplier.id}">{supplier.id}</a></td>
              <td><a href="/suppliers/{supplier.id}">{supplier.name}</a></td>
              <td><a href="/suppliers/{supplier.id}">{supplier.createdAt}</a></td>
              <td><a href="/suppliers/{supplier.id}">{supplier.updatedAt}</a></td>
              <td>{supplier.organization}</td>
              <td>{supplier.createdBy}</td>
              <td>{supplier.warehouses?.length}</td>
              <td>{supplier.item?.length}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</MainLayout>
