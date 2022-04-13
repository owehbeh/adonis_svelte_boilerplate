/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia'
import { User } from '@prisma/client'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'

Inertia.share({
  data: (ctx) => {
    let data = {}
    // FLASHED MESSAGES
    // CHECKS IF THERE IS A SESSION MESSAGE goBackWithMessage SAVED FROM THE FEEDBACK HELPER FUNCTION
    // => IF SO IT RESTORES THE FLASHED MESSAGES FROM THE OLD REQUEST
    // => FLASHES THEM INTO INERTIA
    // => THEN DELTES THE goBackWithMessage
    const comingFromFeedbackHelper = ctx.session.get('goBackWithMessage')
    if (comingFromFeedbackHelper) ctx.session.reflash()
    ctx.session.forget('goBackWithMessage')
    const flashedMessagesToReturn = ctx.session.responseFlashMessages.all()
    data['flashedMessages'] = flashedMessagesToReturn

    // USER
    data['user'] = ctx.auth.user

    // SIDE MENU ITEMS
    data['sideMenuItems'] = menu(ctx.auth.user)

    // ENCRYPT AND RETURN
    const dataString = JSON.stringify(data)
    let data64 = Base64.stringify(Utf8.parse(dataString))
    return data64
  },
}).version(() => Inertia.manifestFile('public/assets/manifest.json'))

/* ------------------------------ MENU START ------------------------------ */
const menu = (user?: User): SideMenu[] => {
  let sideMenuList: SideMenu[] = []
  if (!user) return sideMenuList

  sideMenuList.push({
    name: 'Dashboard',
    icon: 'home',
    url: '/',
  })

  sideMenuList.push({
    name: 'Requests',
    icon: 'flag',
    url: '/requests',
  })

  sideMenuList.push({
    name: 'Orders',
    icon: 'archive',
    url: '/orders',
  })

  sideMenuList.push({
    name: 'Delivery',
    icon: 'local_shipping',
    url: '/orders',
  })

  sideMenuList.push({
    name: 'Tracking',
    icon: 'my_location',
    url: '/tracking',
  })

  sideMenuList.push({ name: 'separator' })

  sideMenuList.push({
    name: 'Customers',
    icon: 'favorite',
    url: '/customers',
  })

  sideMenuList.push({
    name: 'Suppliers',
    icon: 'store',
    url: '/suppliers',
  })

  sideMenuList.push({
    name: 'Users',
    icon: 'people',
    url: '/users',
  })

  sideMenuList.push({
    name: 'Settings',
    icon: 'settings',
    url: '/settings',
  })

  sideMenuList.push({
    name: 'Problems',
    icon: 'report_problem',
    url: '/problems',
  })

  if (user.superAdmin) {
    sideMenuList.push({ name: 'separator' })

    sideMenuList.push({
      name: 'Organizations',
      icon: 'business',
      url: '/admin/organizations',
    })

    sideMenuList.push({
      name: 'Users',
      icon: 'manage_accounts',
      url: '/admin/users',
    })

    sideMenuList.push({
      name: 'Usage',
      icon: 'pie_chart',
      url: '/admin/usage',
    })
  }

  return sideMenuList
}

interface SideMenu {
  name?: string
  icon?: string
  url?: string
  children?: SideMenu[]
}
/* -------------------------------- MENU END -------------------------------- */
