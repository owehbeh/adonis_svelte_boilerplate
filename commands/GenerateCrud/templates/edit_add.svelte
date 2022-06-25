<!-- svelte-ignore a11y-label-has-associated-control -->
<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  import User from '../admin/user.svelte'
  let DATA = decodeProps($page.props.data)
  const {{model_name}} = $page.props.{{model_name}}
  const relations = $page.props.relations
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>
      <a href="/{{model_name}}s">{txt('{{model_name_title}}s')}</a>
      {#if {{model_name}} }
        <span>/</span>
        <a href="/{{model_name}}s/{ {{model_name}}.id}">{ {{model_name}}.id}</a>
      {/if}
    </h2>
    <form action="/{{model_name}}s/edit/{ {{model_name}}?.id || '' }" method="POST">
      <div class="flex flex-wrap -mx-2">
        {{page_form_content}}
      </div>
      <a href="/{{model_name}}s/{ {{model_name}} ? {{model_name}}.id : ''}" class="btn btn-ghost mt-8"> {txt('Back')} </a>
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
