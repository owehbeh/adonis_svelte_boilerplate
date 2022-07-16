<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { confirmModal, decodeProps, parseDbDate, PostThis } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)

  import { w2grid, w2ui } from '../../libs/w2ui.es6.js'
  import jQuery from 'jquery'
  import { onMount } from 'svelte'
  let {{model_name}}List = $page.props.{{model_name}}List
  onMount(() => {
    let grid = new w2grid({
      name: '{{model_name}}s_grid',
      recid: 'id',
      show: {
        toolbar: true,
        footer: true,
        liveSearch: true,
        toolbarColumns: true,
        toolbarDelete: true,
        toolbarEdit: true,
        toolbarReload: false,
      },
      reorderColumns: true,
      multiSelect: false,
      editable: true,
      searches: [
        // For more information visit http://w.w2ui.com/web/demos/#/grid/16
        {{ searches }}
      ],
      columns: [
        // For datetime add => render: 'datetime:mm/dd/yyyy'
        {{ columns }}
      ],
      records: {{model_name}}List,
      onDelete: function (e) {
        e.force = true
        e.preventDefault()
        var {{model_name}} = {{model_name}}List.find((x) => x.id == this.getSelection()[0])
        confirmModal(
          `${txt('Deleting')} ${txt('{{model_name_title}}')} ${ {{model_name}}.id }`,
          'Are you sure?',
          'Delete',
          () => {
            PostThis(`/{{model_name}}s/delete/${ {{model_name}}.id }`, null)
          }
        )
      },
      onEdit: (e) => (window.location.href = `/{{model_name}}s/edit/${e.recid}`),
      onDblClick: (e) => (window.location.href = `/{{model_name}}s/${e.recid}`),
    })
    grid.buttons['edit'].text = txt('Edit')
    grid.buttons['delete'].text = txt('Delete')
    w2ui['{{model_name}}s_grid'].render(jQuery('#{{model_name}}s_grid'))
  })
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>
      {txt('{{model_name_title}}s')}
      <a href="/{{ model_name }}s/edit" class="btn btn-square btn-outline btn-sm">
        <span class="material-icons">add</span>
      </a>
    </h1>
    <div style="height: 85vh" id="{{ model_name }}s_grid">GRID</div>
  </div>
</MainLayout>
