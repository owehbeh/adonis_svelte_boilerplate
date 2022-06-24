<!-- svelte-ignore a11y-label-has-associated-control -->
<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  import User from '../admin/user.svelte'
  let DATA = decodeProps($page.props.data)
  const note = $page.props.note
  const relations = $page.props.relations
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>
      <a href="/notes">{txt('Notes')}</a>
      {#if note }
        <span>/</span>
        <a href="/notes/{ note.id}">{ note.id}</a>
      {/if}
    </h2>
    <form action="/notes/edit/{ note?.id || '' }" method="POST">
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
      value={ note?.id || '' }
      required
    />
    <label class="label">
      <span class="label-text-alt">{$page.props.errors?.id || ''}</span>
    </label>
  </div>
</div>
<!--  STRING/NUMBER | title -->
<div class="my-2 px-2 w-1/3 overflow-hidden">
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{txt('title')}</span>
    </label>
    <input
      type="text"
      name="title"
      placeholder="{txt('Insert')} {txt('title')}"
      class="input input-bordered w-full max-w-xs"
      value={ note?.title || '' }
      required
    />
    <label class="label">
      <span class="label-text-alt">{$page.props.errors?.title || ''}</span>
    </label>
  </div>
</div>
<!--  STRING/NUMBER | body -->
<div class="my-2 px-2 w-1/3 overflow-hidden">
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{txt('body')}</span>
    </label>
    <input
      type="text"
      name="body"
      placeholder="{txt('Insert')} {txt('body')}"
      class="input input-bordered w-full max-w-xs"
      value={ note?.body || '' }
      required
    />
    <label class="label">
      <span class="label-text-alt">{$page.props.errors?.body || ''}</span>
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
      value={ note?.createdAt || '' }
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
      value={ note?.updatedAt || '' }
      required
    />
    <label class="label">
      <span class="label-text-alt">{$page.props.errors?.updatedAt || ''}</span>
    </label>
  </div>
</div>
<!--  SELECT | user -->
<div class="my-2 px-2 w-1/3 overflow-hidden">
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{txt('user')}</span>
    </label>
    <select name="user" class="select select-bordered w-full max-w-xs">
      {#each relations.userList as user }
        <option value={ user.id }>{ user.id }</option>
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
      {#each relations.requestList as request }
        <option
          value={ request.id }
          selected={ note?.request.map((x) => x.id).indexOf(request.id) != -1 ? 'selected' : ''}
          >{ request.id }</option
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
      {#each relations.itemList as item }
        <option
          value={ item.id }
          selected={ note?.item.map((x) => x.id).indexOf(item.id) != -1 ? 'selected' : ''}
          >{ item.id }</option
        >
      {/each}
    </select>
  </div>
</div>
<!--  SELECT | organization -->
<div class="my-2 px-2 w-1/3 overflow-hidden">
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{txt('organization')}</span>
    </label>
    <select name="organization" class="select select-bordered w-full max-w-xs">
      {#each relations.organizationList as organization }
        <option value={ organization.id }>{ organization.id }</option>
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
