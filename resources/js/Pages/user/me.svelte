<script>
  import { confirmModal, PostThis } from './../../helpers.js'
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
  const user = DATA.user
  console.log(DATA)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>
      Your Account
      <a href="/users/edit/me" class="btn btn-square btn-outline btn-sm">
        <span class="material-icons">edit</span>
      </a>
    </h2>
    <div class="flex flex-wrap -mx-2">
      <!-- name -->
      <div class="my-2 px-2 w-1/2 overflow-hidden">
        <h4>{txt('Name')}</h4>
        <p>{user.name}</p>
      </div>
      <!-- email -->
      <div class="my-2 px-2 w-1/2 overflow-hidden">
        <h4>{txt('Email')}</h4>
        <p>{user.email}</p>
      </div>
      <!-- role -->
      <div class="my-2 px-2 w-1/2 overflow-hidden">
        <h4>{txt('Role')}</h4>
        <p>{user.role.name}</p>
      </div>
      <!-- password -->
      <div class="my-2 px-2 w-1/2 overflow-hidden">
        <h4>{txt('Password')}</h4>
        <p>**********</p>
      </div>
    </div>
  </div>
</MainLayout>
