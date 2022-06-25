<!-- svelte-ignore a11y-label-has-associated-control -->
<script>
  import { txt } from '../../../language'
  import MainLayout from '../../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
  const role = $page.props.role
  console.log(role)
  const relations = $page.props.relations
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>
      <a href="/admin/roles">{txt('Roles')}</a>
      {#if role}
        <span>/</span>
        <a href="/admin/roles/{role.id}">{role.name}</a>
      {/if}
    </h2>
    <form action="/admin/roles/edit/{role?.id || ''}" method="POST">
      <div class="flex flex-wrap -mx-2">
        <!--  STRING/NUMBER | name -->
        <div class="my-2 px-2 w-1/2 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('name')}</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="{txt('Insert')} {txt('name')}"
              class="input input-bordered w-full max-w-xs"
              value={role?.name || ''}
              required
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.name || ''}</span>
            </label>
          </div>
        </div>
        <!--  MULTI SELECT | permissions -->
        <div class="my-2 px-2 w-1/2">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('permissions')}</span>
            </label>
            <select name="permissions" class="multiple w-full max-w-xs" multiple>
              {#each Object.keys(relations.permissionList) as permission}
                <option
                  value={relations.permissionList[permission]}
                  selected={role?.permissions?.includes(relations.permissionList[permission])
                    ? 'checked'
                    : ''}
                >
                  {relations.permissionList[permission]}
                </option>
              {/each}
            </select>
          </div>
        </div>
        <!--  MULTI SELECT | user -->
        <div class="my-2 px-2 w-full">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('User')}</span>
            </label>
            <select name="user" class="multiple w-full max-w-xs" multiple>
              {#each relations.userList as user}
                <option
                  value={user.id}
                  selected={role?.user.map((x) => x.id).indexOf(user.id) != -1 ? 'selected' : ''}
                >
                  {user.name} ({user.email})
                </option>
              {/each}
            </select>
          </div>
        </div>
      </div>
      <a href="/admin/roles/{role ? role.id : ''}" class="btn btn-ghost mt-8"> {txt('Back')} </a>
      <button type="submit" class="btn btn-outline mt-8">{txt('Save')}</button>
    </form>
  </div>

  <script>
    VirtualSelect.init({
      ele: '.multiple',
      multiple: true,
      search: true,
    })
  </script>
</MainLayout>
