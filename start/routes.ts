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

/* ------------------------------- SUPER ADMIN ------------------------------ */
Route.group(() => {
  Route.get('/organizations', 'SuperAdminController.organizationView')
  Route.get('/users', 'SuperAdminController.usersView')
})
  .prefix('super/')
  .middleware(['auth', 'superAdmin'])

/* ---------------------------------- USER ---------------------------------- */

Route.group(() => {
  Route.get('/edit/:id?', 'RenameMeUsersController.userEditAddView')
  Route.post('/edit/:id?', 'RenameMeUsersController.userEditAdd')
  Route.post('/delete/:id?', 'RenameMeUsersController.userDelete')
  Route.get('/', 'RenameMeUsersController.userListView')
  Route.get('/:id', 'RenameMeUsersController.userSingleView')
})
  .prefix('users/')
  .middleware(['auth'])

/* ---------------------------------- ROLE ---------------------------------- */
Route.group(() => {
  Route.get('/', 'RolesController.roleListView')
  Route.get('/:id', 'RolesController.roleSingleView')
  Route.get('/:id?', 'RolesController.roleEditAddView')
  Route.post('/:id?', 'RolesController.roleEditAdd')
  Route.delete('/:id?', 'RolesController.roleDelete')
})
  .prefix('roles/')
  .middleware(['auth'])

/* ---------------------------------- _NOTE ---------------------------------- */
Route.group(() => {
  Route.get('/', 'NotesController.noteListView')
  Route.get('/:id', 'NotesController.noteSingleView')
  Route.get('/:id?', 'NotesController.noteEditAddView')
  Route.post('/:id?', 'NotesController.noteEditAdd')
  Route.delete('/:id?', 'NotesController.noteDelete')
})
  .prefix('notes/')
  .middleware(['auth'])

/* -------------------------------- SUPPLIER -------------------------------- */
Route.group(() => {
  Route.get('/', 'SuppliersController.supplierListView')
  Route.get('/:id', 'SuppliersController.supplierSingleView')
  Route.get('/edit/:id?', 'SuppliersController.supplierEditAddView')
  Route.post('/:id?', 'SuppliersController.supplierEditAdd')
  Route.delete('/:id?', 'SuppliersController.supplierDelete')
})
  .prefix('suppliers/')
  .middleware(['auth'])
/* -------------------------------- CUSTOMER -------------------------------- */
Route.group(() => {
  Route.get('/', 'CustomersController.customerListView')
  Route.get('/:id', 'CustomersController.customerSingleView')
  Route.get('/edit/:id?', 'CustomersController.customerEditAddView')
  Route.post('/:id?', 'CustomersController.customerEditAdd')
  Route.delete('/:id?', 'CustomersController.customerDelete')
})
  .prefix('customers/')
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
  // return 'burger_post was called'
})
