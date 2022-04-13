/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Ws from 'App/Services/Ws'
// Ws.boot()

Route.get('/', async ({ inertia }) => {
  return inertia.render('index')
}).middleware('auth')

Route.group(() => {
  Route.post('/login', 'UsersController.login')
  Route.get('/login', 'UsersController.loginView')
  Route.post('/logout', 'UsersController.logout')
})

Route.group(() => {
  Route.get('/', 'RequestsController.indexView')
})
  .prefix('requests/')
  .middleware('auth')

Route.group(() => {
  Route.get('/access', 'AdminController.passwordView')
  Route.post('/access', 'AdminController.password')
  Route.get('/organization', 'AdminController.organizationView')
})
  .prefix('admin/')
  .middleware('auth')

Route.get('/pizza', async ({ inertia }) => {
  return inertia.render('pizza', { text: 'Pizza' })
})

Route.get('/burger', async ({ inertia }) => {
  return inertia.render('burger', {
    data: [
      {
        id: 1,
        name: 'Omar',
      },
      {
        id: 2,
        name: 'Mahmoud',
      },
    ],
  })
})

Route.post('/burger_post', async () => {
  Ws.io.emit('burger_post', {
    data: {
      id: 3,
      name: 'William',
    },
  })
  return 'burger_post was called'
})
