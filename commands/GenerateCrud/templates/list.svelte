<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>{txt('{{model_name_title}}s')}</h1>
    <br />
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            {{ table_titles }}
          </tr>
        </thead>
        <tbody>
          {#each $page.props.{{model_name}}List as {{model_name}} }
            <tr>
              {{ table_values }}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</MainLayout>
