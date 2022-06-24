# Adonis.js + Svelte: Server-Side-Routed Boilerplate

[![GitHub package.json version](https://img.shields.io/github/package-json/v/owehbeh/expressjs-auth-oweh?style=for-the-badge)](http://twitter.com/owehbeh)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)
[![GitHub last commit](https://img.shields.io/github/last-commit/owehbeh/expressjs-auth-oweh?style=for-the-badge)](http://twitter.com/owehbeh)
[![Twitter Follow](https://img.shields.io/twitter/follow/owehbeh?style=for-the-badge)](http://twitter.com/owehbeh)

[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](http://twitter.com/owehbeh)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](http://twitter.com/owehbeh)
[![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)](http://twitter.com/owehbeh)

A boilerplate for building a reactive server-side-rendered and server-side-routed application using Adonis.js, Svelte, and prisma.

## But why?

The need for building fast reactive apps is rising, and having to build and manage both front-end and backend routings heavily slows the process. This project tackles this challange in a strongly oppinionated approach, but you are free to make it yours. You can kickstart your app with the below [features](#features).

<img src="https://user-images.githubusercontent.com/12089028/173215537-74eb4003-41da-4d20-9550-8a328b4dad08.png" width=31% height=50%> <img src="https://user-images.githubusercontent.com/12089028/173215270-a10d5966-a3f7-4788-8d2a-330bade97ca6.png" width=30% height=50%>
<img src="https://user-images.githubusercontent.com/12089028/173215281-67045005-fc31-4037-911a-49a42cf39f3c.png" width=61.5% height=50%>
<img src="https://user-images.githubusercontent.com/12089028/173216015-6c95ae33-50e6-4286-8d5f-c4b460670ff7.png" width=61.5% height=50%>
<img src="https://user-images.githubusercontent.com/12089028/173215680-d99a14bf-114f-4d3c-8ac4-e1299713c52a.png" width=61.5% height=50%>

## Table of Contents

- ✅ [Features](#features)
- ✅ [Project Structure](#project-structure)
- ✅ [Prisma](#prisma)
- ✅ [Error Handling](#error-handling)
- ✅ [Menu](#menu)
- ✅ [Themes](#themes)
- ✅ [Icons](#icons)
- 🔜 [User Management](#user-management)
  - 🔜 [Users](#users)
    - ✅ Login
    - 🔜 Register
    - 🔜 Reset Password
    - 🔜 Change Password
    - 🔜 Confirm Email
  - ✅ [Roles](#roles)
  - ✅ [Permissions](#permissions)
- ✅ [Translation](#translation)
- 🔜 [Code Generation](#code-generation)
  - ✅ List page
  - ✅ Single page
  - 🔜 Add/Edit page
- ✅ [Socket](#socket)
- ✅ [Helpers](#helpers)
- ✅ [Install](#install)
- ✅ [Run](#run)

## Features

- CRUD [Code Generation](#code-generation) using [Adonis.js](https://adonisjs.com/) commands, that includes:
  - Controller
  - Translation-ready views
  - Permissions
  - Routes
- Supercharged [user management](#user-management)
- Centerlaized access mechanism using [roles](#roles) and [permissions](#permissions)
- Dynamic [menu](#menu) rendering relative to users' [permissions](#roles--permissions)
- Simple and centralized [translation](#translation) mechanism
- Real-time front-end updates using [Socket.io](https://socket.io/) + [svelte](#https://svelte.dev/)
- [Tailwind](https://tailwindcss.com/) CSS framework integration
- [DaisyUI](https://daisyui.com/) integration with front-end [theme](#themes) switch [ Dark | Light ]
- Node.js server using [Adonis.js](https://adonisjs.com/)
- TypeScript ORM using [Prisma](https://www.prisma.io/)
- Relational database using [MySQL](https://www.mysql.com/)
- Server-driven web app using [Inertia.js](https://inertiajs.com/)
- Reactive front-end using [Svelte](https://svelte.dev/)
- Centerlaized [error handling](#error-handling) mechanism

## Project Structure

```bash
├── app
│  ├── Controllers
│  ├── Exceptions
│  ├── Helpers
│  │  ├── FeedbackHelper.ts "Cenralized feedback [ Success | Error ] handling"
│  │  ├── MenuHelper.ts "Definition of menu items"
│  │  ├── Permission
│  │  │  ├── PermissionHelper.ts "Permission-related methods used in MenuHelper and Permission middleware"
│  │  │  └── permissions.json "List of permissions"
│  ├── Middleware
│  │  ├── Auth.ts "Adonis.js authorization middleware"
│  │  ├── Permission.ts "Middleware that checks if valid permissions exist on authorized user"
│  │  └── SuperAdmin.ts "Middleware that limits access to super admin users"
│  ├── Models
│  └── Services "Includes Socket.io service"
├── commands
│  ├── GenerateCrud "CRUD Code generator command"
├── config
├── contracts
├── database
├── prisma
│  ├── json-schema "Has the json schema presentation of the prisma schema, used for CRUD Code generation"
│  ├── schema.prisma
│  └── seeders "Includes database seeders"
├── providers
├── public
├── resources
│  ├── css
│  ├── js
│  │  ├── app.js "Inertia App for Svelte integration"
│  │  ├── components
│  │  │  └── navigation.svelte "Navigation code, including side menu and nav bar"
│  │  ├── helpers.js "Svelte helper methods"
│  │  ├── language.js "Translation related text and functions"
│  │  ├── layouts "To enable different layouts as per user preferences if needed"
│  │  ├── Pages "Svelte views directory"
│  └── views "Adonis.js (.edge) Views directory"
├── start

```

---

## Prisma

### Configure

To connect to your database instance, you need to configure the `DATABASE_URL` in the `.env` file or in your Node.js `environment variables`.

The default connection connector is `MySQL`, to install other connectors, check [prisma docs](https://www.prisma.io/docs/concepts/database-connectors), and change the schema.prisma file accordingly.

```
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### Edit Schema

Edit the prisma schema file under `/prisma/schema.prisma`

### Generate

Use the below command to generate client, models, and json schema. [Read more](https://www.prisma.io/docs/concepts/components/prisma-schema/generators)

```
npx prisma generate
```

### Migrate

Use the below command create a migration. [Read more](https://www.prisma.io/docs/concepts/components/prisma-migrate)

```
npx prisma migrate dev --name {MIGRATION_NAME}
```

### Seed

Follow [these steps](https://github.com/wahyubucil/adonis-prisma#seeder-prisma-seeder) to create and execute database seeds. ~~Skip the initiation step as it is already done inside this project.~~

---

## Error Handling

The file `/app/Helpers/FeedbackHelper.ts` contains several usefull methods:

- `handleError()`: Used inside the global exception handler `/app/Exceptions/Handler.ts`
- `handleErrorToRoute()`: Handles error and redirects to a specific rout
- `handleServiceError()`: For long running async functions error handling
- `goBackWithMessage()`: Redirects back to the previous page with a message and extra options
- `goToRouteWithMessage()`: Redirects to a specific page with a message and extra options

---

## Menu

A side menu item has the following structure:

```Javascript
  interface SideMenu {
    name?: string
    icon?: string
    url?: string
    children?: SideMenu[]
  }
```

Menu items with no url are considered as separators

The `getUserMenu()` function accepts a User argument so you may use the `hasPermission()` function from the `PermissionHelper.ts` file to [ Show | Hide ] menu items based on the users' granted permissions attached to his role.

Example:

```Javascript
  const dashboardItem = {
    name: 'Dashboard',
    icon: 'home',
    url: '/',
  }
  if (hasPermission(user, [permissions.VIEW_DASHBOARD])) {
    sideMenuList.push(dashboardItem)
  }
```

---

## Themes

To change the Dark and the Light themes you need to edit the file `/resources/js/components/navigation.svelte`

You need to change the default themes which are `lofi` and `black` as below:

```Javascript
  if (localStorage.getItem('myDarkMode') === 'true') node.setAttribute('data-theme', 'black')
  else node.setAttribute('data-theme', 'lofi')
```

You may choose between the themes available at [DaisyUI here](https://daisyui.com/docs/themes/), or use your own themes which you can generate following [these steps](https://daisyui.com/theme-generator/).

---

## Icons

[Google Material icons](https://fonts.google.com/icons?selected=Material+Icons) are available to use inside svelte pages and components.

---

## User Management

### **Users**

- Login
- Logout
- Register
- Reset Password
- Change Password
- Edit Profile

### **Roles**

CRUD roles

### **Permissions**

CRUD permissions

---

## Translation

Translation is done on the front-end side, is case sensitive, and supports switching between two languages by default. This can be easily changed from the `/resources/js/components/navigation.svelte` file if you plan to support more than two languages.

In order to translate a word/phrase you can use the txt() function from the `/resources/js/language.js` file, as below:

```Javascript
  // Import
  import { txt } from '../../language'
  // Use
  <h2>{txt('User')}</h2>
```

You can add new words/languages inside the `/resources/js/language.js` itself as well.

---

## Code Generation

Code generation saves your time by elimanating redundant effort needed for every new table you add to your databse/prisma schema.

1. To start the code generator, simply execute the following command in your project directory:

```bash
node ace generate:crud
```

2. You will be asked to choose the model you wish to generate pages and code for

```console
Select the model you want to generate CRUD for ... Press <ENTER> to select
  User
  Note
  Role
  Request
```

3. After choosing a model, a guiding page will open with two informative sections and one pending action to make.

   1. View Files under `/resources/js/pages/{model}/`
      1. list.svelte
      2. single.svelte
      3. editAdd.svelte
   2. Controller File under `/app/Controllers/Http/{model}sController`
   3. Routes: **Make sure** to copy these routes to your `/start/routs.ts`

4. Permissions will be added to the `/app/Helpers/Permission/permissions.json` file

   - `View {model}`
   - `Create {model}`
   - `Edit {model}`
   - `Delete {model}`

5. One final step would be [seeding the database](#seed) for the new permissions to be attached with the Admin role

---

## Socket

In order to update a loaded view, remove a row from a table for example, all you have to do is:

1. Emit a web socket event through the `Ws` service
2. Listen to the event on the `.svelte` page and update the related variable, which will its turn update the view.

For Example:

Inside your Controller

```Typescript
  // Import the web socket service
  import Ws from 'App/Services/Ws'
  // Emit the event with data
  Ws.io.emit('event_name', {
    data: {
      id: 3,
      name: 'Omar',
    },
  })
```

Inside your page_name.svelte

```Javascript
  var socket = io('http://localhost:3333')
  // Subscribe to the event
  socket.on('burger_post', (received) => {
    data = received.data
  })
```

---

## Helpers

### Show a confirmation modal programmatically

```Javascript
  // Import
  import { confirmModal } from '../../helpers.js'
  // Call where needed
  confirmModal(
    `Modal Title`,
    'Modal Content',
    'Button Text',
    () => {/** CALLBACK ON BUTTON CLICK */}
  )
```

### Submit a POST HTML from programmatically

```Javascript
  // Import
  import { PostThis } from '../../helpers.js'
  // Call where needed
  PostThis('URL', { data1: data1Val, data2:data2Val... })
```

---

## Install

1. Clone the repo

2. Install the dependencies:

```bash
npm install
```

3. Set the environment variables:

```bash
cp .env.example .env
```

### Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=random_key
DRIVE_DISK=local
SESSION_DRIVER=cookie
CACHE_VIEWS=false

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB (Preview).
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="mysql://{user}:{password}@{url}:{port}/{database_name}"
```

---

## Run

### Run locally

Copy the below code into a `RUN_ADONIS.bat` file and run it.

Make sure to change the project's path to yours by replacing the `{PROJECT_PATH}` with `D:\CODE\adonis_crud` for example

```bash
@echo This was written by @owehbeh
@echo Accessing HDD
@CALL cd {PROJECT_PATH}
@CALL D:
@echo Access granted
@CALL code .
@start cmd /k CALL node ace serve --watch --node-args="--inspect"
@start cmd /k npx tailwindcss -i ./resources/css/tailwind.css -o ./public/output.css --watch
@echo Done!
@echo You take control in
@echo 3
@choice /d y /t 1 > nul
@echo 2
@choice /d y /t 1 > nul
@echo 1
@choice /d y /t 1 > nul
cmd /k
```

Or run these two commands in seperate terminals inside your project's directory:

`node ace serve --watch --node-args="--inspect"`

`npx tailwindcss -i ./resources/css/tailwind.css -o ./public/output.css --watch`

### Run in production

Follow [Adonis's guide](https://docs.adonisjs.com/guides/deployment) for details about deployment
