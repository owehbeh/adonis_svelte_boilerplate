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
    <form action="/users/edit/{user.id}" method="POST">
      <div class="flex flex-wrap -mx-2">
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
              value={user.name}
            />
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
            <input
              name="validated"
              type="checkbox"
              class="checkbox"
              bind:checked={user.validated}
            />
          </div>
        </div>
        <div class="my-2 px-2 w-1/3">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('notes')}</span>
            </label>
            <select name="notes" class="multiple w-full max-w-xs" multiple>
              {#each $page.props.notesList as note}
                <option
                  value={note.id}
                  selected={user.notes.map((n) => n.id).indexOf(note.id) != -1 ? 'selected' : ''}
                  >{note.title}</option
                >
              {/each}
            </select>
          </div>
        </div>
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('organization')}</span>
            </label>
            <select name="organization" class="select select-bordered w-full max-w-xs">
              {#each $page.props.organizationList as organization}
                <option value={organization.id}>{organization.name}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
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
