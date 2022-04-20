import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Role } from '@prisma/client'
import { PermissionsEnum } from 'Contracts/enums'

export const hasPermission = async (userId: string, permissions: string[]) => {
  let canDo = false
  // Fetch user
  const user = await prisma.user.findUnique({
    where: { id: userId },
    rejectOnNotFound: true,
    include: {
      organization: true,
      customer: true,
      item: true,
      request: true,
      supplier: true,
      notes: true,
      role: true,
    },
  })
  // Check superAdmin
  // if (user.superAdmin) return true
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
  const allPermissions = Object.keys(PermissionsEnum).map((key) => PermissionsEnum[key])
  const employeePermission = [
    PermissionsEnum.VIEW_DASHBOARD,
    PermissionsEnum.VIEW_REQUESTS,
    PermissionsEnum.VIEW_ORDERS,
    PermissionsEnum.VIEW_DELIVERIES,
    PermissionsEnum.VIEW_TRACKING,
    PermissionsEnum.VIEW_CUSTOMERS,
    PermissionsEnum.VIEW_SUPPLIERS,
    PermissionsEnum.EDIT_REQUEST,
    PermissionsEnum.EDIT_ORDER,
    PermissionsEnum.EDIT_DELIVERY,
    PermissionsEnum.EDIT_CUSTOMER,
    PermissionsEnum.EDIT_SUPPLIER,
    PermissionsEnum.DELETE_REQUEST,
    PermissionsEnum.DELETE_ORDER,
    PermissionsEnum.DELETE_DELIVERY,
    PermissionsEnum.DELETE_CUSTOMER,
    PermissionsEnum.DELETE_SUPPLIER,
    PermissionsEnum.CREATE_REQUEST,
    PermissionsEnum.CREATE_ORDER,
    PermissionsEnum.CREATE_DELIVERY,
    PermissionsEnum.CREATE_CUSTOMER,
    PermissionsEnum.CREATE_SUPPLIER,
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