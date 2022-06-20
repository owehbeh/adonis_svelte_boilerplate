<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
  const customer = $page.props.customer
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>
      {txt('Customer')}
      <a href="/users/edit/{ customer.id }" class="btn btn-square btn-outline btn-sm">
        <span class="material-icons"> {txt('edit')} </span>
      </a>
    </h2>
    <div class="flex flex-wrap -mx-2">
      <!-- id -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('id')}</h4>
  <p>{customer.id}</p>
</div>
<!-- name -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('name')}</h4>
  <p>{customer.name}</p>
</div>
<!-- createdAt -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('createdAt')}</h4>
  <p>{customer.createdAt}</p>
</div>
<!-- updatedAt -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('updatedAt')}</h4>
  <p>{customer.updatedAt}</p>
</div>
<!-- organization -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('organization')}</h4>
  <p>{customer.organization}</p>
</div>
<!-- createdBy -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('createdBy')}</h4>
  <p>{customer.createdBy}</p>
</div>
<!-- warehouses -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('warehouses')}</h4>
  <p><a href="#customer-warehouses-modal" class="cursor-pointer">{txt('View')} ({customer.warehouses?.length})</a></p>
</div>
<!-- Request -->
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('Request')}</h4>
  <p><a href="#customer-Request-modal" class="cursor-pointer">{txt('View')} ({customer.Request?.length})</a></p>
</div>

    </div>
  <!-- warehouses modal -->
<div class="modal modal-bottom sm:modal-middle" id="customer-warehouses-modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">{txt('warehouses')}</h3>
    <ul class="menu p-2">
      {#each customer.warehouses as warehousesItem}
        <li class="m-0"><a href="/warehousess/{ warehousesItem.id }" class="m-0">{ warehousesItem.id }</a></li>
      {/each}
    </ul>
    <div class="modal-action">
      <a href="##" class="btn">{txt('Close')}</a>
    </div>
  </div>
</div>
<!-- Request modal -->
<div class="modal modal-bottom sm:modal-middle" id="customer-Request-modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">{txt('Request')}</h3>
    <ul class="menu p-2">
      {#each customer.Request as RequestItem}
        <li class="m-0"><a href="/Requests/{ RequestItem.id }" class="m-0">{ RequestItem.id }</a></li>
      {/each}
    </ul>
    <div class="modal-action">
      <a href="##" class="btn">{txt('Close')}</a>
    </div>
  </div>
</div>

  </div>
</MainLayout>
