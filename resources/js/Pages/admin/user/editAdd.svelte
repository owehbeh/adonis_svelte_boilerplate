<!-- svelte-ignore a11y-label-has-associated-control -->
<script>
  import { txt } from '../../../language'
  import MainLayout from './../../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  import User from '../../admin/user.svelte'
  let DATA = decodeProps($page.props.data)
  const user = $page.props.user
  const relations = $page.props.relations
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>
      <a href="/admin/users">{txt('Users')}</a>
      {#if user}
        <span>/</span>
        <a href="/admin/users/{user.id}">{user.name}</a>
      {/if}
    </h2>
    <form action="/admin/users/edit/{user?.id || ''}" method="POST">
      <div class="flex flex-wrap -mx-2">
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
              value={user?.name || ''}
              required
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.name || ''}</span>
            </label>
          </div>
        </div>
        <!--  STRING/NUMBER | email -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('email')}</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="{txt('Insert')} {txt('email')}"
              class="input input-bordered w-full max-w-xs"
              value={user?.email || ''}
              required
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.email || ''}</span>
            </label>
          </div>
        </div>
        <!--  STRING/NUMBER | password -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('password')}</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="{txt('Change')} {txt('password')}?"
              class="input input-bordered w-full max-w-xs"
              required
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.password || ''}</span>
            </label>
          </div>
        </div>
        <!--  SELECT | role -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('role')}</span>
            </label>
            <select name="role" class="select select-bordered w-full max-w-xs">
              {#each relations.roleList as role}
                <option value={role.id}>{role.name}</option>
              {/each}
            </select>
          </div>
        </div>
        <!--  CHECKBOX | validated -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('validated')}</span>
            </label>
            <input name="validated" type="checkbox" class="checkbox" checked={user?.validated} />
          </div>
        </div>
      </div>
      <a href="/admin/users/{user ? user.id : ''}" class="btn btn-ghost mt-8"> {txt('Back')} </a>
      <button type="submit" class="btn btn-outline mt-8">Save</button>
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
