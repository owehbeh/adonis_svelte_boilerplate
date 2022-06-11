<script>
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  import User from '../admin/user.svelte'
  let DATA = decodeProps($page.props.data)
  const note = $page.props.note
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>Note</h2>
    <div class="flex flex-wrap -mx-2 overflow-hidden">
      <div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>id</h4>
  <p>{note.id}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>title</h4>
  <p>{note.title}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>body</h4>
  <p>{note.body}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>createdAt</h4>
  <p>{note.createdAt}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>updatedAt</h4>
  <p>{note.updatedAt}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>user</h4>
  <p>{note.user}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>request</h4>
  <p>{note.request?.length}</p>
</div>
<div class="my-2 px-2 w-1/4 overflow-hidden">
  <h4>item</h4>
  <p>{note.item?.length}</p>
</div>

    </div>
    <div class="overflow-x-auto" />
  </div>
</MainLayout>
