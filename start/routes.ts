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
  Route.post('/login', 'AuthController.login')
  Route.get('/login', 'AuthController.loginView')
  Route.post('/logout', 'AuthController.logout')
})

/* --------------------------- ORGANIZATION ADMIN --------------------------- */
Route.group(() => {
  Route.get('/settings', 'AdminController.organizationView')
  /* ---------------------------------- USERS --------------------------------- */
  Route.group(() => {
    Route.get('/edit/:id?', 'AdminController.userEditAddView').middleware([
      `canDo:${permissions.EDIT_USER}`,
    ])
    Route.post('/edit/:id?', 'AdminController.userEditAdd').middleware([
      `canDo:${permissions.EDIT_USER}`,
    ])
    Route.post('/delete/:id?', 'AdminController.userDelete').middleware([
      `canDo:${permissions.DELETE_USER}`,
    ])
    Route.get('/', 'AdminController.userListView').middleware([`canDo:${permissions.VIEW_USERS}`])
    Route.get('/:id', 'AdminController.userSingleView').middleware([
      `canDo:${permissions.VIEW_USERS}`,
    ])
  }).prefix('users')
  /* ---------------------------------- ROLES --------------------------------- */
  Route.group(() => {
    Route.get('/edit/:id?', 'RolesController.roleEditAddView').middleware([
      `canDo:${permissions.EDIT_ROLES}`,
    ])
    Route.post('/edit/:id?', 'RolesController.roleEditAdd').middleware([
      `canDo:${permissions.EDIT_USER}`,
    ])
    Route.post('/delete/:id?', 'RolesController.roleDelete').middleware([
      `canDo:${permissions.DELETE_ROLES}`,
    ])
    Route.get('/', 'RolesController.roleListView').middleware([`canDo:${permissions.VIEW_ROLES}`])
    Route.get('/:id', 'RolesController.roleSingleView').middleware([
      `canDo:${permissions.VIEW_ROLES}`,
    ])
  }).prefix('roles/')
})
  .prefix('admin/')
  .middleware(['auth'])

/* ------------------------------- SUPER ADMIN ------------------------------ */
Route.group(() => {
  Route.get('/organizations', 'SuperAdminController.organizationView')
  Route.get('/users', 'SuperAdminController.usersView')
})
  .prefix('super/')
  .middleware(['auth', 'superAdmin'])

/* ---------------------------------- USER ---------------------------------- */
Route.group(() => {
  Route.get('/me', 'RenameMeUsersController.currentUserView')
  Route.get('/edit/me', 'RenameMeUsersController.currentUserEditView')
  Route.post('/edit/me', 'RenameMeUsersController.currentUserEdit')
  Route.get('/edit/:id?', 'RenameMeUsersController.userEditAddView')
  Route.post('/edit/:id?', 'RenameMeUsersController.userEditAdd')
  Route.post('/delete/:id?', 'RenameMeUsersController.userDelete')
  Route.get('/', 'RenameMeUsersController.userListView')
  Route.get('/:id', 'RenameMeUsersController.userSingleView')
})
  .prefix('users/')
  .middleware(['auth'])

/* ---------------------------------- ROLE ---------------------------------- */

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
