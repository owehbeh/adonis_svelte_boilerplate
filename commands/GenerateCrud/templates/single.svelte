<script>
  import { txt } from '../../language'
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps, parseDbDate } from '../../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  import User from '../admin/user.svelte'
  let DATA = decodeProps($page.props.data)
  const {{model_name}} = $page.props.{{model_name}}
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h2>{txt('{{model_name_title}}')}</h2>
    <div class="flex flex-wrap -mx-2 overflow-hidden">
      {{page_text_content}}
    </div>
  {{modals_content}}
  </div>
</MainLayout>
