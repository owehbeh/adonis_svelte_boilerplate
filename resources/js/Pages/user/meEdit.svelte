<!-- svelte-ignore a11y-label-has-associated-control -->
<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  import User from '../admin/user.svelte'
  let DATA = decodeProps($page.props.data)
  const user = DATA.user
  const relations = $page.props.relations
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>Edit Account</h2>
    <form action="/users/edit/me" method="POST">
      <div class="flex flex-wrap -mx-2">
        <!--  STRING/NUMBER | name -->
        <div class="my-2 px-2 w-1/2 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('Name')}</span>
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
        <!--  STRING/NUMBER | password -->
        <div class="my-2 px-2 w-1/2 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('Password')}</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="{txt('Change')} {txt('password')}?"
              class="input input-bordered w-full max-w-xs"
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.password || ''}</span>
            </label>
          </div>
        </div>
        <!--  STRING/NUMBER | email -->
        <div class="my-2 px-2 w-1/2 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('Email')}</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="{txt('Insert')} {txt('email')}"
              class="input input-bordered w-full max-w-xs"
              value={user?.email || ''}
              required
              disabled
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.email || ''}</span>
            </label>
          </div>
        </div>
        <!--  STRING/NUMBER | role -->
        <div class="my-2 px-2 w-1/2 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('role')}</span>
            </label>
            <select name="role" class="select select-bordered w-full max-w-xs" disabled>
              <option value={user.role.id}>{user.role.name}</option>
            </select>
          </div>
        </div>
      </div>
      <a href="/users/me" class="btn btn-ghost mt-8"> {txt('Back')} </a>
      <button type="submit" class="btn btn-outline mt-8">{txt('Save')}</button>
    </form>
  </div>
</MainLayout>
