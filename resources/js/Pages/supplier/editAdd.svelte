<!-- svelte-ignore a11y-label-has-associated-control -->
<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  import User from '../admin/user.svelte'
  let DATA = decodeProps($page.props.data)
  const supplier = $page.props.supplier
  const relations = $page.props.relations
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>{txt('Supplier')}</h2>
    <form action="/users/edit/{supplier.id}" method="POST">
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
              value={supplier.id}
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
              value={supplier.name}
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
              value={supplier.createdAt}
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
              value={supplier.updatedAt}
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.updatedAt || ''}</span>
            </label>
          </div>
        </div>
        <!--  STRING/NUMBER | organization -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('organization')}</span>
            </label>
            <input
              type="text"
              name="organization"
              placeholder="{txt('Insert')} {txt('organization')}"
              class="input input-bordered w-full max-w-xs"
              value={supplier.organization}
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.organization || ''}</span>
            </label>
          </div>
        </div>
        <!--  STRING/NUMBER | createdBy -->
        <div class="my-2 px-2 w-1/3 overflow-hidden">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('createdBy')}</span>
            </label>
            <input
              type="text"
              name="createdBy"
              placeholder="{txt('Insert')} {txt('createdBy')}"
              class="input input-bordered w-full max-w-xs"
              value={supplier.createdBy}
            />
            <label class="label">
              <span class="label-text-alt">{$page.props.errors?.createdBy || ''}</span>
            </label>
          </div>
        </div>
        <!--  MULTI SELECT | warehouses -->
        <div class="my-2 px-2 w-1/3">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{txt('warehouses')}</span>
            </label>
            <select name="warehouses" class="multiple w-full max-w-xs" multiple>
              {#each relations.warehousesList as warehouses}
                <option
                  value={warehouses.id}
                  selected={supplier.warehouses.map((x) => x.id).indexOf(warehouses.id) != -1
                    ? 'selected'
                    : ''}>{warehouses.id}</option
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
                  selected={supplier.item.map((x) => x.id).indexOf(item.id) != -1 ? 'selected' : ''}
                  >{item.id}</option
                >
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
