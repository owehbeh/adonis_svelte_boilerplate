<script>
  import { confirmModal, PostThis } from './../../helpers.js'
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
  const {{model_name}} = $page.props.{{model_name}}
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>
      <a href="/{{model_name}}s">{txt('{{model_name_title}}s')}</a>
      <span>/ { {{model_name}}.id}</span>
      <a href="/{{model_name}}s/edit/{ {{model_name}}.id }" class="btn btn-square btn-outline btn-sm">
        <span class="material-icons">edit</span>
      </a>
      <button
        on:click={() => {
          confirmModal(
            `${txt('Deleting')} ${txt('{{model_name_title}}')} ${ {{model_name}}.id}`,
            txt('Are you sure?'),
            txt('Delete'),
            () => {
              PostThis(`/{{model_name}}s/delete/${ {{model_name}}.id}`, null)
            }
          )
        }}
        class="btn btn-square btn-outline btn-sm btn-warning"
      >
        <span class="material-icons">delete</span>
      </button>
    </h2>
    <div class="flex flex-wrap -mx-2">
      {{page_text_content}}
    </div>
  {{modals_content}}
  </div>
</MainLayout>
