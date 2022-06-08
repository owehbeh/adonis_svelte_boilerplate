<script>
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>Note</h1>
    <br />
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>id</th>
<th>title</th>
<th>body</th>
<th>createdAt</th>
<th>updatedAt</th>
<th>user</th>
<th>request</th>
<th>item</th>

          </tr>
        </thead>
        <tbody>
          {#each $page.props.note as note }
            <tr>
              <td>Note.id</td>
<td>Note.title</td>
<td>Note.body</td>
<td>Note.createdAt</td>
<td>Note.updatedAt</td>
<td></td>
<td></td>
<td></td>

            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</MainLayout>
