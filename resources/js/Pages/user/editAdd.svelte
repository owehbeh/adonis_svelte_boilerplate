<!-- svelte-ignore a11y-label-has-associated-control -->
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
    <div class="flex flex-wrap -mx-2">
      <div class="my-2 px-2 w-1/3 overflow-hidden">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">{txt('name')}</span>
          </label>
          <input type="text" placeholder="{txt('Insert')} {txt('name')}" class="input input-bordered w-full max-w-xs" />
          <label class="label">
            <span class="label-text-alt">{DATA.name_error || ''}</span>
          </label>
        </div>
      </div>
      <div class="my-2 px-2 w-1/3 overflow-hidden">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">{txt('validated')}</span>
          </label>
          <input type="checkbox" class="checkbox" bind:checked={user.validated} />
        </div>
      </div>
      <div class="my-2 px-2 w-1/3">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">{txt('notes')}</span>
          </label>
          <select class="multiple w-full max-w-xs" multiple>
            {#each user.notes as note}
              <option value={note.id} selected={note.title == 'Buy more pizza' ? 'selected' : ''}>{note.title}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="my-2 px-2 w-1/3 overflow-hidden">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">{txt('organization')}</span>
          </label>
          <select class="select select-bordered w-full max-w-xs">
            {#each user.notes as note}
              <option value={note.id}>{note.title}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>

  <script>
    VirtualSelect.init({
      ele: '.multiple',
      multiple: true,
      search: true,
    })
  </script>
</MainLayout>
