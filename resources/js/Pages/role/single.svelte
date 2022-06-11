<script>
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  import User from '../admin/user.svelte'
  let DATA = decodeProps($page.props.data)
  const role = $page.props.role
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>Role</h2>
    <div class="flex flex-wrap -mx-2 overflow-hidden">
      <div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>id</h4>
  <p>{role.id}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>name</h4>
  <p>{role.name}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>createdAt</h4>
  <p>{role.createdAt}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>updatedAt</h4>
  <p>{role.updatedAt}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>permissions</h4>
  <p>{role.permissions}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>organization</h4>
  <p>{role.organization}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>User</h4>
  <p>{role.User?.length}</p>
</div>

    </div>
    <div class="overflow-x-auto" />
  </div>
</MainLayout>
