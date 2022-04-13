<script>
  import MainLayout from './../../layouts/main.svelte'
  import { decodeProps } from '../../helpers'
  import { page } from '@inertiajs/inertia-svelte'
  let DATA = decodeProps($page.props.data)
  console.log('DATA', DATA)

  import { txt } from './../../language'
</script>

<MainLayout>
  <div class="flex items-center justify-center min-h-screen bg-base-300">
    <div
      class="p-10 mt-4 text-left bg-base-100 shadow-2xl text-base-content border-base-content rounded-lg"
    >
      <div class="flex justify-center">
        <span class="material-icons text-5xl my-8"> login </span>
      </div>
      <h3 class="text-2xl text-center mb-6">{txt('Login to your account')}</h3>
      <form action="/login" method="POST">
        <!--  -->
        <div class="form-control w-full max-w-xs">
          <label class="block" for="email"> {txt('Email')} </label>
          <input
            type="email"
            placeholder={txt('Email')}
            autocomplete="email"
            name="email"
            class="input input-bordered w-full max-w-xs"
          />
          {#if DATA.flashedMessages?.loginError}
            <label for="email" class="label">
              <span class="label-text-alt text-red-500">{DATA.flashedMessages?.loginError}</span>
            </label>
          {/if}
          <!--  -->
          <div class="mt-4">
            <label class="block " for="password"> {txt('Password')} </label>
            <input
              type="password"
              placeholder={txt('Password')}
              autocomplete="current-password"
              name="password"
              class="input input-bordered w-full max-w-xs"
            />
          </div>
          <div class="flex items-baseline justify-between mt-6">
            <button class="btn btn-primary px-6"> {txt('Login')} </button>
            <a href="/forgot-password" class="btn btn-link text-base-content">
              {txt('Forgot Password?')}
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</MainLayout>
