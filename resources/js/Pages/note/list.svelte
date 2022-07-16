<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { confirmModal, decodeProps, parseDbDate, PostThis } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)

  import { w2grid, w2ui } from '../../libs/w2ui.es6.js'
  import jQuery from 'jquery'
  import { onMount } from 'svelte'
  let noteList = $page.props.noteList
  onMount(() => {
    let grid = new w2grid({
      name: 'notes_grid',
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
        { field: 'id', label: txt('Id'), type: 'text' },
        { field: 'title', label: txt('Title'), type: 'text' },
        { field: 'body', label: txt('Body'), type: 'text' },
        { field: 'createdAt', label: txt('CreatedAt'), type: 'text' },
        { field: 'updatedAt', label: txt('UpdatedAt'), type: 'text' },
        { field: 'user', label: txt('User'), type: 'text' },
        { field: 'request', label: txt('Request'), type: 'text' },
        { field: 'item', label: txt('Item'), type: 'text' },
        { field: 'organization', label: txt('Organization'), type: 'text' },
      ],
      columns: [
        { field: 'id', text: txt('Id'), sortable: true },
        { field: 'title', text: txt('Title'), sortable: true },
        { field: 'body', text: txt('Body'), sortable: true },
        {
          field: 'createdAt',
          text: txt('CreatedAt'),
          render: 'datetime:mm/dd/yyyy',
          sortable: true,
        },
        {
          field: 'updatedAt',
          text: txt('UpdatedAt'),
          render: 'datetime:mm/dd/yyyy',
          sortable: true,
        },

        {
          field: 'user.id',
          text: txt('User'),
          render: (ci) => `<a href='/users/${ci.user.id}'>${ci.user.name}</a>`,
        },
        { field: 'request.length', text: txt('Request'), sortable: true },
        { field: 'item.length', text: txt('Item'), sortable: true },

        {
          field: 'organization.id',
          text: txt('Organization'),
          render: (ci) =>
            `<a href='/organizations/${ci.organization.id}'>${ci.organization.name}</a>`,
        },
      ],
      records: noteList,
      onDelete: function (e) {
        e.force = true
        e.preventDefault()
        var note = noteList.find((x) => x.id == this.getSelection()[0])
        confirmModal(
          `${txt('Deleting')} ${txt('Note')} ${note.id}`,
          'Are you sure?',
          'Delete',
          () => {
            PostThis(`/notes/delete/${note.id}`, null)
          }
        )
      },
      onEdit: (e) => (window.location.href = `/notes/edit/${e.recid}`),
      onDblClick: (e) => (window.location.href = `/notes/${e.recid}`),
    })
    grid.buttons['edit'].text = txt('Edit')
    grid.buttons['delete'].text = txt('Delete')
    w2ui['notes_grid'].render(jQuery('#notes_grid'))
  })
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>
      {txt('Notes')}
      <a href="/notes/edit" class="btn btn-square btn-outline btn-sm">
        <span class="material-icons">add</span>
      </a>
    </h1>
    <div style="height: 85vh" id="notes_grid">GRID</div>
  </div>
</MainLayout>
