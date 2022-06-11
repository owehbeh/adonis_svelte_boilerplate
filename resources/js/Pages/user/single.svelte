<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  import User from '../admin/user.svelte'
  let DATA = decodeProps($page.props.data)
  const user = $page.props.user
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>{txt('User')}</h2>
    <div class="flex flex-wrap -mx-2 overflow-hidden">
      <div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('id')}</h4>
  <p>{user.id}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('name')}</h4>
  <p>{user.name}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('email')}</h4>
  <p>{user.email}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('createdAt')}</h4>
  <p>{user.createdAt}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('updatedAt')}</h4>
  <p>{user.updatedAt}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('validated')}</h4>
  <p>{user.validated}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('password')}</h4>
  <p>{user.password}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('rememberMeToken')}</h4>
  <p>{user.rememberMeToken}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('superAdmin')}</h4>
  <p>{user.superAdmin}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('notes')}</h4>
  <p><a href="#user-notes-modal" class="cursor-pointer">{txt('View')} ({user.notes?.length})</a></p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('organization')}</h4>
  <p><a href="/organizations/{user.organization.id}">{user.organization.id}</a></p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('request')}</h4>
  <p><a href="#user-request-modal" class="cursor-pointer">{txt('View')} ({user.request?.length})</a></p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('customer')}</h4>
  <p><a href="#user-customer-modal" class="cursor-pointer">{txt('View')} ({user.customer?.length})</a></p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('supplier')}</h4>
  <p><a href="#user-supplier-modal" class="cursor-pointer">{txt('View')} ({user.supplier?.length})</a></p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('item')}</h4>
  <p><a href="#user-item-modal" class="cursor-pointer">{txt('View')} ({user.item?.length})</a></p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>{txt('role')}</h4>
  <p><a href="/roles/{user.role.id}">{user.role.id}</a></p>
</div>

    </div>
  <!-- notes modal -->
<div class="modal modal-bottom sm:modal-middle" id="user-notes-modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">{txt('notes')}</h3>
    <ul class="menu p-2">
      {#each user.notes as notesItem}
        <li class="m-0"><a href="/notess/notesItem.id" class="m-0">{ notesItem.id }</a></li>
      {/each}
    </ul>
    <div class="modal-action">
      <a href="##" class="btn">{txt('Close')}</a>
    </div>
  </div>
</div>
<!-- request modal -->
<div class="modal modal-bottom sm:modal-middle" id="user-request-modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">{txt('request')}</h3>
    <ul class="menu p-2">
      {#each user.request as requestItem}
        <li class="m-0"><a href="/requests/requestItem.id" class="m-0">{ requestItem.id }</a></li>
      {/each}
    </ul>
    <div class="modal-action">
      <a href="##" class="btn">{txt('Close')}</a>
    </div>
  </div>
</div>
<!-- customer modal -->
<div class="modal modal-bottom sm:modal-middle" id="user-customer-modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">{txt('customer')}</h3>
    <ul class="menu p-2">
      {#each user.customer as customerItem}
        <li class="m-0"><a href="/customers/customerItem.id" class="m-0">{ customerItem.id }</a></li>
      {/each}
    </ul>
    <div class="modal-action">
      <a href="##" class="btn">{txt('Close')}</a>
    </div>
  </div>
</div>
<!-- supplier modal -->
<div class="modal modal-bottom sm:modal-middle" id="user-supplier-modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">{txt('supplier')}</h3>
    <ul class="menu p-2">
      {#each user.supplier as supplierItem}
        <li class="m-0"><a href="/suppliers/supplierItem.id" class="m-0">{ supplierItem.id }</a></li>
      {/each}
    </ul>
    <div class="modal-action">
      <a href="##" class="btn">{txt('Close')}</a>
    </div>
  </div>
</div>
<!-- item modal -->
<div class="modal modal-bottom sm:modal-middle" id="user-item-modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">{txt('item')}</h3>
    <ul class="menu p-2">
      {#each user.item as itemItem}
        <li class="m-0"><a href="/items/itemItem.id" class="m-0">{ itemItem.id }</a></li>
      {/each}
    </ul>
    <div class="modal-action">
      <a href="##" class="btn">{txt('Close')}</a>
    </div>
  </div>
</div>

  </div>
</MainLayout>
