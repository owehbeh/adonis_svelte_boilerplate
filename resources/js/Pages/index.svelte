<script>
  import MainLayout from '../layouts/main.svelte'
  import { decodeProps } from '../helpers.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
  console.log('DATA', DATA)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>Welcome Home</h1>
  </div>
</MainLayout>
