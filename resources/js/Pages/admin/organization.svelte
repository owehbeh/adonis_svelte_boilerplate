<script>
  import MainLayout from '../../layouts/main.svelte'
  import { page } from '@inertiajs/inertia-svelte'
  console.log($page)
</script>

<MainLayout myData={{ user: $page.props.user }}>
  <h1>Organization</h1>
</MainLayout>
