import '../css/app.css'

import { createInertiaApp } from '@inertiajs/inertia-svelte'
import { InertiaProgress } from '@inertiajs/progress'
// White theme

InertiaProgress.init({
  showSpinner: true,
})

createInertiaApp({
  resolve: (name) => import(`./Pages/${name}.svelte`),
  setup({ el, App, props }) {
    new App({ target: el, props })
  },
})
