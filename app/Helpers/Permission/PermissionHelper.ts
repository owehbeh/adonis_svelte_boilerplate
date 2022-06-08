import { Role } from '@prisma/client'
import * as permissions from '../Permission/permissions.json'

export const hasPermission = (user: any, permissions: string[]) => {
  let canDo = false
  // Check superAdmin
  if (user.superAdmin) return true
  // Check role permissions
  const userPermissions = user.role?.permissions as string[]
  permissions.forEach((permissionToCheck) => {
    userPermissions.forEach((uPermission) => {
      if (uPermission === permissionToCheck) canDo = true
    })
  })
  return canDo
}
// ["VIEW_CUSTOMERS", "VIEW_SUPPLIERS", "VIEW_USERS", "VIEW_SETTINGS", "VIEW_DASHBOARD", "VIEW_REQUESTS", "VIEW_ORDERS", "VIEW_DELIVERIES", "VIEW_TRACKING", "CREATE_REQUEST", "CREATE_ORDER", "CREATE_DELIVERY", "CREATE_CUSTOMER", "CREATE_SUPPLIER", "CREATE_USER", "EDIT_REQUEST", "EDIT_ORDER", "EDIT_DELIVERY", "EDIT_CUSTOMER", "EDIT_SUPPLIER", "EDIT_USER", "EDIT_SETTINGS", "DELETE_REQUEST", "DELETE_ORDER", "DELETE_DELIVERY", "DELETE_CUSTOMER", "DELETE_SUPPLIER", "DELETE_USER"]
// ["VIEW_CUSTOMERS", "VIEW_SUPPLIERS", "VIEW_USERS", "VIEW_SETTINGS", "VIEW_REQUESTS", "VIEW_ORDERS", "VIEW_DELIVERIES", "VIEW_TRACKING", "CREATE_REQUEST", "CREATE_ORDER", "CREATE_DELIVERY", "CREATE_CUSTOMER", "CREATE_SUPPLIER", "CREATE_USER", "EDIT_REQUEST", "EDIT_ORDER", "EDIT_DELIVERY", "EDIT_CUSTOMER", "EDIT_SUPPLIER", "EDIT_USER", "EDIT_SETTINGS", "DELETE_REQUEST", "DELETE_ORDER", "DELETE_DELIVERY", "DELETE_CUSTOMER", "DELETE_SUPPLIER", "DELETE_USER"]
export const AppRoles = (organizationId: string): Role[] => {
  // Define Permissions
  const allPermissions = Object.keys(permissions).map((key) => permissions[key])
  const employeePermission = [
    permissions.VIEW_DASHBOARD,
    permissions.VIEW_REQUESTS,
    permissions.VIEW_ORDERS,
    permissions.VIEW_DELIVERIES,
    permissions.VIEW_TRACKING,
    permissions.VIEW_CUSTOMERS,
    permissions.VIEW_SUPPLIERS,
    permissions.EDIT_REQUEST,
    permissions.EDIT_ORDER,
    permissions.EDIT_DELIVERY,
    permissions.EDIT_CUSTOMER,
    permissions.EDIT_SUPPLIER,
    permissions.DELETE_REQUEST,
    permissions.DELETE_ORDER,
    permissions.DELETE_DELIVERY,
    permissions.DELETE_CUSTOMER,
    permissions.DELETE_SUPPLIER,
    permissions.CREATE_REQUEST,
    permissions.CREATE_ORDER,
    permissions.CREATE_DELIVERY,
    permissions.CREATE_CUSTOMER,
    permissions.CREATE_SUPPLIER,
  ]
  // Define Roles
  let rolesToReturn: Role[] = []
  let adminRole: Role = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Admin',
    organizationId: organizationId!,
    permissions: allPermissions,
  }
  let employeeRole: Role = {
    id: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Employee',
    organizationId: organizationId!,
    permissions: employeePermission,
  }
  // Push Roles
  rolesToReturn.push(adminRole)
  rolesToReturn.push(employeeRole)
  return rolesToReturn
}
