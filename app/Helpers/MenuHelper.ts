import { hasPermission } from './Permission/PermissionHelper'
import * as permissions from '../Helpers/Permission/permissions.json'

export const getUserMenu = (user?: any): SideMenu[] => {
  let sideMenuList: SideMenu[] = []
  if (!user) return sideMenuList

  const dashboardItem = {
    name: 'Dashboard',
    icon: 'home',
    url: '/',
  }
  const requestsItem = {
    name: 'Requests',
    icon: 'flag',
    url: '/requests',
  }
  const ordersItem = {
    name: 'Orders',
    icon: 'archive',
    url: '/orders',
  }
  const deliveryItem = {
    name: 'Delivery',
    icon: 'local_shipping',
    url: '/orders',
  }
  const trackingItem = {
    name: 'Tracking',
    icon: 'my_location',
    url: '/tracking',
  }
  const customersItem = {
    name: 'Customers',
    icon: 'favorite',
    url: '/customers',
  }
  const suppliersItem = {
    name: 'Suppliers',
    icon: 'store',
    url: '/suppliers',
  }
  const rolesItem = {
    name: 'Roles',
    icon: 'verified_user',
    url: '/admin/roles',
  }
  const usersItem = {
    name: 'Users',
    icon: 'people',
    url: '/admin/users',
  }
  const settingsItem = {
    name: 'Settings',
    icon: 'settings',
    url: '/settings',
  }
  // const problemsItem = {
  //   name: 'Problems',
  //   icon: 'report_problem',
  //   url: '/problems',
  // }
  // Super admin
  const superOrganizationsItem = {
    name: 'Organizations',
    icon: 'business',
    url: '/admin/organizations',
  }
  const superUsersItem = {
    name: 'Users',
    icon: 'manage_accounts',
    url: '/super/users',
  }
  const superUsageItem = {
    name: 'Usage',
    icon: 'pie_chart',
    url: '/super/usage',
  }

  let topMenuItemsExist = false
  let topMenuSeparatorExist = false

  if (hasPermission(user, [permissions.VIEW_DASHBOARD])) {
    sideMenuList.push(dashboardItem)
    topMenuItemsExist = true
  }
  if (hasPermission(user, [permissions.VIEW_REQUESTS])) {
    sideMenuList.push(requestsItem)
    topMenuItemsExist = true
  }
  if (hasPermission(user, [permissions.VIEW_ORDERS])) {
    sideMenuList.push(ordersItem)
    topMenuItemsExist = true
  }
  if (hasPermission(user, [permissions.VIEW_DELIVERIES])) {
    sideMenuList.push(deliveryItem)
    topMenuItemsExist = true
  }
  if (hasPermission(user, [permissions.VIEW_TRACKING])) {
    sideMenuList.push(trackingItem)
    topMenuItemsExist = true
  }
  if (hasPermission(user, [permissions.VIEW_CUSTOMERS])) {
    if (!topMenuSeparatorExist) sideMenuList.push({ name: 'separator' })
    topMenuSeparatorExist = true
    sideMenuList.push(customersItem)
  }
  if (hasPermission(user, [permissions.VIEW_SUPPLIERS])) {
    if (!topMenuSeparatorExist) sideMenuList.push({ name: 'separator' })
    topMenuSeparatorExist = true
    sideMenuList.push(suppliersItem)
  }
  if (hasPermission(user, [permissions.VIEW_USERS])) {
    if (!topMenuSeparatorExist) sideMenuList.push({ name: 'separator' })
    topMenuSeparatorExist = true
    sideMenuList.push(usersItem)
  }
  if (hasPermission(user, [permissions.VIEW_ROLES])) {
    if (!topMenuSeparatorExist) sideMenuList.push({ name: 'separator' })
    topMenuSeparatorExist = true
    sideMenuList.push(rolesItem)
  }
  if (hasPermission(user, [permissions.VIEW_SETTINGS])) {
    if (!topMenuSeparatorExist) sideMenuList.push({ name: 'separator' })
    topMenuSeparatorExist = true
    sideMenuList.push(settingsItem)
  }
  if (user.superAdmin) {
    sideMenuList.push({ name: 'separator' })
    sideMenuList.push(superOrganizationsItem)
    sideMenuList.push(superUsersItem)
    sideMenuList.push(superUsageItem)
  }

  return sideMenuList
}

export interface SideMenu {
  name?: string
  icon?: string
  url?: string
  children?: SideMenu[]
}
