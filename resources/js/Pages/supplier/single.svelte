<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
  const supplier = $page.props.supplier
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>
      {txt('Supplier')}
      <a href="/users/edit/{supplier.id}" class="btn btn-square btn-outline btn-sm">
        <span class="material-icons"> {txt('edit')} </span>
      </a>
    </h2>
    <div class="flex flex-wrap -mx-2">
      <!-- id -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('id')}</h4>
        <p>{supplier.id}</p>
      </div>
      <!-- name -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('name')}</h4>
        <p>{supplier.name}</p>
      </div>
      <!-- createdAt -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('createdAt')}</h4>
        <p>{supplier.createdAt}</p>
      </div>
      <!-- updatedAt -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('updatedAt')}</h4>
        <p>{supplier.updatedAt}</p>
      </div>
      <!-- organization -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('organization')}</h4>
        <p>{supplier.organization}</p>
      </div>
      <!-- createdBy -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('createdBy')}</h4>
        <p>{supplier.createdBy}</p>
      </div>
      <!-- warehouses -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('warehouses')}</h4>
        <p>
          <a href="#supplier-warehouses-modal" class="cursor-pointer"
            >{txt('View')} ({supplier.warehouses?.length})</a
          >
        </p>
      </div>
      <!-- item -->
      <div class="my-2 px-2 w-1/4 overflow-hidden">
        <h4>{txt('item')}</h4>
        <p>
          <a href="#supplier-item-modal" class="cursor-pointer"
            >{txt('View')} ({supplier.item?.length})</a
          >
        </p>
      </div>
    </div>
    <!-- warehouses modal -->
    <div class="modal modal-bottom sm:modal-middle" id="supplier-warehouses-modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{txt('warehouses')}</h3>
        <ul class="menu p-2">
          {#each supplier.warehouses as warehousesItem}
            <li class="m-0">
              <a href="/warehousess/{warehousesItem.id}" class="m-0">{warehousesItem.id}</a>
            </li>
          {/each}
        </ul>
        <div class="modal-action">
          <a href="##" class="btn">{txt('Close')}</a>
        </div>
      </div>
    </div>
    <!-- item modal -->
    <div class="modal modal-bottom sm:modal-middle" id="supplier-item-modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{txt('item')}</h3>
        <ul class="menu p-2">
          {#each supplier.item as itemItem}
            <li class="m-0"><a href="/items/{itemItem.id}" class="m-0">{itemItem.id}</a></li>
          {/each}
        </ul>
        <div class="modal-action">
          <a href="##" class="btn">{txt('Close')}</a>
        </div>
      </div>
    </div>
  </div>
</MainLayout>
