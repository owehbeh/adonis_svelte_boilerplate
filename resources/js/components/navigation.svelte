<script>
  import { acronym, textToHex } from './../helpers.js'
  import { selectedLanguage, switchLanguage, txt } from '../language.js'
  import Drawer, { AppContent, Content, Header, Subtitle } from '@smui/drawer'
  import Button, { Label } from '@smui/button'
  import List, { Item, Text } from '@smui/list'
  import { Graphic, Subheader } from '@smui/list'
  import User from '../Pages/admin/user.svelte'

  // Side menu and dark/light mode
  let menuOpen = localStorage.getItem('mySideMenuOpen') == 'true'
  let darkMode = localStorage.getItem('myDarkMode') == 'true'

  // Passed data
  export let myData

  // Update theme
  const applyTheme = () => {
    var node = document.getElementById('main_page')
    if (localStorage.getItem('myDarkMode') === 'true') node.setAttribute('data-theme', 'black')
    else node.setAttribute('data-theme', 'lofi')
  }
</script>

<!-- DRAWER -->
<div class="drawer {menuOpen ? 'drawer-mobile' : ''}">
  <input
    id="my-drawer"
    type="checkbox"
    class="drawer-toggle"
    checked={menuOpen}
    on:click={() => {
      menuOpen = !menuOpen
      localStorage.setItem('mySideMenuOpen', menuOpen)
    }}
  />
  <div class="drawer-content">
    <!-- NAVIGATION -->
    <div class="navbar bg-base-100">
      <div class="flex-none">
        <label class="btn btn-square btn-ghost" for="my-drawer">
          <span class="material-icons"> menu </span>
        </label>
      </div>
      <div class="flex-1">
        <span class="btn btn-ghost normal-case text-xl invisible md:visible">
          {txt('Hello,')}
          {myData.user.name}!
        </span>
      </div>
      <div class="flex-none gap-2">
        <!-- DARK MODE SWITCH-->
        <div class="form-control">
          <label class="swap swap-rotate">
            <input
              type="checkbox"
              checked={darkMode}
              on:click={() => {
                darkMode = !darkMode
                localStorage.setItem('myDarkMode', darkMode)
                applyTheme()
              }}
            />
            <!-- sun icon -->
            <span class="material-icons mr-2 swap-on fill-current"> light_mode </span>
            <!-- moon icon -->
            <span class="material-icons mr-2 swap-off fill-current"> dark_mode </span>
          </label>
        </div>
        <!-- LANGUAGE SWITCH-->
        <div class="form-control">
          <label class="swap swap-rotate">
            <input
              type="checkbox"
              checked={selectedLanguage == 'ar'}
              on:click={() => {
                switchLanguage()
              }}
            />
            <!-- arabic -->
            <img width="25px" class="mr-2 swap-off" src="/flags/sa.svg" alt="ar" />
            <!-- english -->
            <img width="25px" class="mr-2 swap-on" src="/flags/gb.svg" alt="ar" />
          </label>
        </div>
        <div class="form-control">
          <input type="text" placeholder="Search" class="input input-bordered" />
        </div>
        <div class="dropdown dropdown-end cursor-pointer">
          <a href="/users/me" class="avatar placeholder">
            <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
              <span class="text-xs"> {acronym(myData.user.name)} </span>
            </div>
          </a>
        </div>
      </div>
    </div>
    <!-- PAGE CONTENT -->
    <article class="prose max-w-none">
      <slot />
    </article>
  </div>
  <!-- SIDE MENU CONTENT -->
  <div class="drawer-side">
    <label for="my-drawer" class="drawer-overlay" />

    <div
      class="flex flex-col w-64 h-screen px-4 py-8 {selectedLanguage == 'ar'
        ? 'border-l'
        : 'border-r'} {darkMode ? 'border-neutral-focus' : 'border-base-300'} bg-base-100"
    >
      <h2 class="text-3xl font-semibold ml-4">{myData.user.organization.name}</h2>
      <div class="divider mb-0 mt-6" />

      <div class="flex flex-col justify-between flex-1 mt-6 space-y-6">
        <!-- NAV ITEMS -->
        <nav>
          <ul class="menu w-56 p-1 rounded-box space-y-4">
            {#each myData.sideMenuItems as item}
              {#if item.name && item.icon && item.url}
                <li class="hover-bordered">
                  <a class={window.location.pathname === item.url ? 'active' : ''} href={item.url}>
                    <span class="material-icons"> {item.icon} </span>
                    <span class="ml-2">{txt(item.name)}</span>
                  </a>
                </li>
              {:else}
                <div class="divider" />
              {/if}
            {/each}
          </ul>
        </nav>
        <!-- LOGOUT -->
        <div class="flex items-center px-4 -mx-2">
          <form action="/logout" method="POST" class="btn-block">
            <button href="/#" class="btn btn-block btn-ghost mb-4">
              <span class="material-icons"> logout </span>
              <span class="ml-2">{txt('Logout')}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  form button.btn-ghost {
    justify-content: start;
  }
</style>
