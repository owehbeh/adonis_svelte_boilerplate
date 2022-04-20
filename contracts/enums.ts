export enum NotificationTypeEnum {
  success = 'success',
  error = 'error',
  debug = 'debug',
  critical = 'critical',
  info = 'info',
  warning = 'warning',
  fatal = 'fatal',
}

export enum PermissionsEnum {
  // VIEW
  VIEW_CUSTOMERS = 'View Customers',
  VIEW_SUPPLIERS = 'View Suppliers',
  VIEW_USERS = 'View Users',
  VIEW_SETTINGS = 'View Settings',
  VIEW_DASHBOARD = 'View Dashboard',
  VIEW_REQUESTS = 'View Requests',
  VIEW_ORDERS = 'View Orders',
  VIEW_DELIVERIES = 'View Deliveries',
  VIEW_TRACKING = 'View Tracking',
  // CREATE
  CREATE_REQUEST = 'Create Request',
  CREATE_ORDER = 'Create Order',
  CREATE_DELIVERY = 'Create Delivery',
  CREATE_CUSTOMER = 'Create Customer',
  CREATE_SUPPLIER = 'Create Supplier',
  CREATE_USER = 'Create User',
  // EDIT
  EDIT_REQUEST = 'Edit Request',
  EDIT_ORDER = 'Edit Order',
  EDIT_DELIVERY = 'Edit Delivery',
  EDIT_CUSTOMER = 'Edit Customer',
  EDIT_SUPPLIER = 'Edit Supplier',
  EDIT_USER = 'Edit User',
  EDIT_SETTINGS = 'Edit Settings',
  // DELETE
  DELETE_REQUEST = 'Delete Request',
  DELETE_ORDER = 'Delete Order',
  DELETE_DELIVERY = 'Delete Delivery',
  DELETE_CUSTOMER = 'Delete Customer',
  DELETE_SUPPLIER = 'Delete Supplier',
  DELETE_USER = 'Delete User',
  // OTHER
}
