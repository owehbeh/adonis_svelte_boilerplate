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
import * as permissions from '../app/Helpers/Permission/permissions.json'

// Ws.boot()

/* ---------------------------------- HOME ---------------------------------- */
Route.get('/', async ({ inertia }) => {
  return inertia.render('index')
}).middleware(['auth', `canDo:${permissions.VIEW_DASHBOARD}`])

/* ---------------------------------- AUTH ---------------------------------- */
Route.group(() => {
  Route.post('/login', 'UsersController.login')
  Route.get('/login', 'UsersController.loginView')
  Route.post('/logout', 'UsersController.logout')
})

/* --------------------------- ORGANIZATION ADMIN --------------------------- */
Route.group(() => {
  Route.get('/organizations', 'AdminController.organizationView')
})
  .prefix('admin/')
  .middleware(['auth'])

Route.group(() => {
  Route.get('/', 'RequestsController.indexView')
})
  .prefix('requests/')
  .middleware('auth')

/* -------------------------------- WAREHOUSE ------------------------------- */
Route.group(() => {
  Route.get('/', 'RenameMeWarehousesController.warehouseListView').middleware([
    `canDo:${permissions.VIEW_WAREHOUSES}`,
  ])
  Route.get('/:id', 'RenameMeWarehousesController.warehouseSingleView')
  Route.get('/:id?', 'RenameMeWarehousesController.warehouseEditAddView')
  Route.post('/:id?', 'RenameMeWarehousesController.warehouseEditAdd')
  Route.delete('/:id?', 'RenameMeWarehousesController.warehouseDelete')
})
  .prefix('warehouses/')
  .middleware(['auth'])
/* ------------------------------- SUPER ADMIN ------------------------------ */
Route.group(() => {
  Route.get('/organizations', 'SuperAdminController.organizationView')
  Route.get('/users', 'SuperAdminController.usersView')
})
  .prefix('super/')
  .middleware(['auth', 'superAdmin'])

Route.group(() => {
  Route.get('/', 'RenameMeUsersController.userListView')
})
  .prefix('users/')
  .middleware(['auth'])

/* --------------------------------- TESTING -------------------------------- */
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
