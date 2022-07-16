<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { confirmModal, decodeProps, parseDbDate, PostThis } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'

  let DATA = decodeProps($page.props.data)

  import { w2grid, w2ui } from '../../libs/w2ui.es6.js'
  import jQuery from 'jquery'
  import { onMount } from 'svelte'
  let userList = $page.props.userList
  onMount(() => {
    let grid = new w2grid({
      name: 'users_grid',
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
      searches: [
        { field: 'id', label: 'ID ', type: 'text' },
        { field: 'name', label: 'Name', type: 'text' },
        { field: 'email', label: 'Email', type: 'text' },
        {
          field: 'status',
          label: 'Status',
          type: 'enum',
          style: 'width1: 350px',
          options: { items: ['active', 'selected', 'submitted'] },
        },
        { field: 'createdAt', label: 'Created', type: 'date' },
        { field: 'sdate', label: 'Start Date', type: 'date' },
      ],
      columns: [
        { field: 'id', text: txt('id'), sortable: true },
        { field: 'name', text: 'Name', sortable: true },
        {
          field: 'email',
          text: 'Email',
          clipboardCopy: true,
          render: (ci) => `<a href='mailto:${ci.email}'>${ci.email}</a>`,
        },
        {
          field: 'createdAt',
          text: 'Created',
          render: 'datetime:mm/dd/yyyy',
          size: '120px',
        },
        {
          field: 'role.name',
          text: 'Role',
          render: (ci) => `<a href='/roles/${ci.role.id}'>${ci.role.name}</a>`,
        },
        { field: 'validated', text: txt('Validated'), sortable: true, render: 'toggle' },
        { field: 'supplier.length', text: txt('Supplier'), sortable: true },
      ],
      records: userList,
      onDelete: function (e) {
        e.force = true
        e.preventDefault()
        var user = userList.find((x) => x.id == this.getSelection()[0])
        confirmModal(
          `${txt('Deleting')} ${txt('User')} ${user.name}`,
          'Are you sure?',
          'Delete',
          () => {
            PostThis(`/users/delete/${user.id}`, null)
          }
        )
      },
      onEdit: (e) => (window.location.href = `/users/edit/${e.recid}`),
      onDblClick: (e) => (window.location.href = `/users/${e.recid}`),
    })
    grid.buttons['edit'].text = txt('Edit')
    grid.buttons['delete'].text = txt('Delete')
    w2ui['users_grid'].render(jQuery('#gridz'))
  })
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>
      {txt('Users')}
      <a href="/users/edit" class="btn btn-square btn-outline btn-sm">
        <span class="material-icons">add</span>
      </a>
    </h1>
    <br />
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>{txt('id')}</th>
            <th>{txt('name')}</th>
            <th>{txt('email')}</th>
            <th>{txt('createdAt')}</th>
            <th>{txt('updatedAt')}</th>
            <th>{txt('validated')}</th>
            <th>{txt('password')}</th>
            <th>{txt('rememberMeToken')}</th>
            <th>{txt('superAdmin')}</th>
            <th>{txt('note')}</th>
            <th>{txt('organization')}</th>
            <th>{txt('request')}</th>
            <th>{txt('customer')}</th>
            <th>{txt('supplier')}</th>
            <th>{txt('item')}</th>
            <th>{txt('role')}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {#each $page.props.userList as user}
            <tr>
              <td><a href="/users/{user.id}">{user.id}</a></td>
              <td><a href="/users/{user.id}">{user.name}</a></td>
              <td><a href="/users/{user.id}">{user.email}</a></td>
              <td><a href="/users/{user.id}">{user.createdAt}</a></td>
              <td><a href="/users/{user.id}">{user.updatedAt}</a></td>
              <td>{user.validated}</td>
              <td><a href="/users/{user.id}">{user.password}</a></td>
              <td><a href="/users/{user.id}">{user.rememberMeToken}</a></td>
              <td>{user.superAdmin}</td>
              <td>{user.note?.length}</td>
              <td><a href="/organizations/{user.organization.id}">{user.organization.id}</a></td>
              <td>{user.request?.length}</td>
              <td>{user.customer?.length}</td>
              <td>{user.supplier?.length}</td>
              <td>{user.item?.length}</td>
              <td><a href="/roles/{user.role.id}">{user.role.id}</a></td>

              <td>
                <a href="/users/edit/{user.id}" class="btn btn-square btn-outline btn-sm">
                  <span class="material-icons">edit</span>
                </a>
                <button
                  on:click={() => {
                    confirmModal(
                      `${txt('Deleting')} ${txt('User')} ${user.id}`,
                      'Are you sure?',
                      'Delete',
                      () => {
                        PostThis(`/users/delete/${user.id}`, null)
                      }
                    )
                  }}
                  class="btn btn-square btn-outline btn-sm btn-warning"
                >
                  <span class="material-icons">delete</span>
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div style="height: 64vh" id="gridz">GRID</div>
  </div>
</MainLayout>
