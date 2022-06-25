<!-- svelte-ignore a11y-label-has-associated-control -->
<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  import User from '../admin/user.svelte'
  let DATA = decodeProps($page.props.data)
  const role = $page.props.role
  const relations = $page.props.relations
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>
      <a href="/admin/roles">{txt('Roles')}</a>
      {#if role}
        <span>/</span>
        <a href="/admin/roles/{role.id}">{role.id}</a>
      {/if}
    </h2>
    <form action="/admin/roles/edit/{role?.id || ''}" method="POST">
      <div class="flex flex-wrap -mx-2">
        <!--  STRING/NUMBER | id -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('id')}</span>
            </label>
            <input
              type="text"
              name="id"
              placeholder="{txt('Insert')} {txt('id')}"
              class="input input-bordered w-full max-w-xs"
              value={role?.id || ''}
              required
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.id || ''}</span>
            </label>
          </div>
        </div>
        <!--  STRING/NUMBER | name -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
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
        <!--  STRING/NUMBER | createdAt -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('createdAt')}</span>
            </label>
            <input
              type="text"
              name="createdAt"
              placeholder="{txt('Insert')} {txt('createdAt')}"
              class="input input-bordered w-full max-w-xs"
              value={role?.createdAt || ''}
              required
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.createdAt || ''}</span>
            </label>
          </div>
        </div>
        <!--  STRING/NUMBER | updatedAt -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('updatedAt')}</span>
            </label>
            <input
              type="text"
              name="updatedAt"
              placeholder="{txt('Insert')} {txt('updatedAt')}"
              class="input input-bordered w-full max-w-xs"
              value={role?.updatedAt || ''}
              required
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.updatedAt || ''}</span>
            </label>
          </div>
        </div>
        <!--  STRING/NUMBER | permissions -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('permissions')}</span>
            </label>
            <input
              type="text"
              name="permissions"
              placeholder="{txt('Insert')} {txt('permissions')}"
              class="input input-bordered w-full max-w-xs"
              value={role?.permissions || ''}
              required
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.permissions || ''}</span>
            </label>
          </div>
        </div>
        <!--  SELECT | organization -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('organization')}</span>
            </label>
            <select name="organization" class="select select-bordered w-full max-w-xs">
              {#each relations.organizationList as organization}
                <option value={organization.id}>{organization.id}</option>
              {/each}
            </select>
          </div>
        </div>
        <!--  MULTI SELECT | User -->
        <div class="my-2 px-2 w-1/3">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('User')}</span>
            </label>
            <select name="User" class="multiple w-full max-w-xs" multiple>
              {#each relations.UserList as User}
                <option
                  value={User.id}
                  selected={role?.User.map((x) => x.id).indexOf(User.id) != -1 ? 'selected' : ''}
                  >{User.id}</option
                >
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
