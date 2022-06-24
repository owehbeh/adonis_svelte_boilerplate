<!-- svelte-ignore a11y-label-has-associated-control -->
<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  import User from '../admin/user.svelte'
  let DATA = decodeProps($page.props.data)
  const user = $page.props.user
  const relations = $page.props.relations
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>{txt('User')}</h2>
    <form action="/users/edit/{user?.id || ''}" method="POST">
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
              value={user?.id || ''}
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
              type="text"
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
        <!--  CHECKBOX | validated -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('validated')}</span>
            </label>
            <input name="validated" type="checkbox" class="checkbox" checked={user?.validated} />
          </div>
        </div>
        <!--  STRING/NUMBER | password -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('password')}</span>
            </label>
            <input
              type="text"
              name="password"
              placeholder="{txt('Insert')} {txt('password')}"
              class="input input-bordered w-full max-w-xs"
              value={user?.password || ''}
              required
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.password || ''}</span>
            </label>
          </div>
        </div>
        <!--  STRING/NUMBER | rememberMeToken -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('rememberMeToken')}</span>
            </label>
            <input
              type="text"
              name="rememberMeToken"
              placeholder="{txt('Insert')} {txt('rememberMeToken')}"
              class="input input-bordered w-full max-w-xs"
              value={user?.rememberMeToken || ''}
              required
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.rememberMeToken || ''}</span>
            </label>
          </div>
        </div>
        <!--  CHECKBOX | superAdmin -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('superAdmin')}</span>
            </label>
            <input name="superAdmin" type="checkbox" class="checkbox" checked={user?.superAdmin} />
          </div>
        </div>
        <!--  MULTI SELECT | notes -->
        <div class="my-2 px-2 w-1/3">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('notes')}</span>
            </label>
            <select name="notes" class="multiple w-full max-w-xs" multiple>
              {#each relations.notesList as notes}
                <option
                  value={notes.id}
                  selected={user?.notes.map((x) => x.id).indexOf(notes.id) != -1 ? 'selected' : ''}
                  >{notes.id}</option
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
              {#each relations.organizationList as organization}
                <option value={organization.id}>{organization.id}</option>
              {/each}
            </select>
          </div>
        </div>
        <!--  MULTI SELECT | request -->
        <div class="my-2 px-2 w-1/3">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('request')}</span>
            </label>
            <select name="request" class="multiple w-full max-w-xs" multiple>
              {#each relations.requestList as request}
                <option
                  value={request.id}
                  selected={user?.request.map((x) => x.id).indexOf(request.id) != -1
                    ? 'selected'
                    : ''}>{request.id}</option
                >
              {/each}
            </select>
          </div>
        </div>
        <!--  MULTI SELECT | customer -->
        <div class="my-2 px-2 w-1/3">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('customer')}</span>
            </label>
            <select name="customer" class="multiple w-full max-w-xs" multiple>
              {#each relations.customerList as customer}
                <option
                  value={customer.id}
                  selected={user?.customer.map((x) => x.id).indexOf(customer.id) != -1
                    ? 'selected'
                    : ''}>{customer.id}</option
                >
              {/each}
            </select>
          </div>
        </div>
        <!--  MULTI SELECT | supplier -->
        <div class="my-2 px-2 w-1/3">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('supplier')}</span>
            </label>
            <select name="supplier" class="multiple w-full max-w-xs" multiple>
              {#each relations.supplierList as supplier}
                <option
                  value={supplier.id}
                  selected={user?.supplier.map((x) => x.id).indexOf(supplier.id) != -1
                    ? 'selected'
                    : ''}>{supplier.id}</option
                >
              {/each}
            </select>
          </div>
        </div>
        <!--  MULTI SELECT | item -->
        <div class="my-2 px-2 w-1/3">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('item')}</span>
            </label>
            <select name="item" class="multiple w-full max-w-xs" multiple>
              {#each relations.itemList as item}
                <option
                  value={item.id}
                  selected={user?.item.map((x) => x.id).indexOf(item.id) != -1 ? 'selected' : ''}
                  >{item.id}</option
                >
              {/each}
            </select>
          </div>
        </div>
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('role')}</span>
            </label>
            <select name="role" class="select select-bordered w-full max-w-xs">
              {#each relations.roleList as role}
                <option value={role.id}>{role.id}</option>
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
