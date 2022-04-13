<script>
  import MainLayout from '../../layouts/main.svelte'
  import { page } from '@inertiajs/inertia-svelte'
  console.log($page)
</script>

<MainLayout>
  <div class="flex h-screen">
    <div class="m-auto">
      <form class="space-y-6" action="/admin/access" method="POST">
        {#if $page.props.flashedMessages.critical}
          <div class="alert alert-error shadow-lg">
            <span class="material-icons"> warning </span>
            <span>WRONG PASSWORD!!</span>
            <span class="material-icons"> warning </span>
          </div>
        {/if}
        <input
          type="text"
          name="password"
          placeholder="Enter Password"
          class="input input-bordered input-error w-full max-w-xs"
        />
        <button class="btn btn-block btn-outline btn-error">Access</button>
      </form>
    </div>
  </div>
</MainLayout>
