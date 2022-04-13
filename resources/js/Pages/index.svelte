<script>
  import MainLayout from '../layouts/main.svelte'
  import { decodeProps } from '../store.js'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
  console.log('DATA', DATA)
</script>

<MainLayout myData={DATA}>
  <div style="margin:20px">
    <h1>Sup {DATA.user.name}!</h1>
    <h1>THIS IS HOME</h1>
  </div>
</MainLayout>
