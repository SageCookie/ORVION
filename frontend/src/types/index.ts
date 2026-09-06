// Shared TypeScript types across the application

export type Role =
  | 'ROLE_SUPER_ADMIN'
  | 'ROLE_BUSINESS_ADMIN'
  | 'ROLE_SALES_MANAGER'
  | 'ROLE_INVENTORY_MANAGER'
  | 'ROLE_PRODUCTION_MANAGER'
  | 'ROLE_ACCOUNTANT'
  | 'ROLE_DELIVERY_MANAGER'
  | 'ROLE_EMPLOYEE';

export interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  accessToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface Customer {
  id: number;
  customerCode: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  taxId?: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode?: string;
  status: string;
  createdAt: string;
}

export interface Supplier {
  id: number;
  supplierCode: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  taxId?: string;
  address: string;
  status: string;
  createdAt: string;
}

export interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  code: string;
  description?: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  category: Category;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  taxRate: number;
  reorderLevel: number;
  description?: string;
  status: string;
}

export interface Inventory {
  id: number;
  product: Product;
  quantityOnHand: number;
  quantityReserved: number;
  locationRack: string;
  updatedAt: string;
}

export interface InventoryTransaction {
  id: number;
  product: Product;
  type: string;
  quantity: number;
  referenceType: string;
  referenceId: string;
  performedBy: string;
  createdAt: string;
}

export interface QuotationItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount: number;
  lineTotal: number;
}

export interface Quotation {
  id: number;
  quotationNumber: string;
  customer: Customer;
  status: string;
  issueDate: string;
  validUntil: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;
  notes?: string;
  items: QuotationItem[];
  createdAt: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount: number;
  lineTotal: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customer: Customer;
  status: string;
  priority: string;
  orderDate: string;
  promisedDeliveryDate: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;
  items: OrderItem[];
  createdAt: string;
}

export interface ProductionOrder {
  id: number;
  productionNumber: string;
  order?: Order;
  product: Product;
  targetQuantity: number;
  producedQuantity: number;
  rejectedQuantity: number;
  status: string;
  assignedEmployeeName: string;
  startDate: string;
  expectedCompletionDate: string;
  actualCompletionDate?: string;
}

export interface QualityCheck {
  id: number;
  checkNumber: string;
  productionOrder: ProductionOrder;
  inspectedQuantity: number;
  passedQuantity: number;
  rejectedQuantity: number;
  result: string;
  inspectorName: string;
  inspectionDate: string;
  notes?: string;
}

export interface Delivery {
  id: number;
  deliveryNumber: string;
  order: Order;
  assignedDriverName: string;
  deliveryAddress: string;
  status: string;
  trackingNumber: string;
  dispatchDate?: string;
  deliveredDate?: string;
  notes?: string;
}

export interface InvoiceItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  lineTotal: number;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  order?: Order;
  customer: Customer;
  status: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;
  paidAmount: number;
  balanceDue: number;
  items: InvoiceItem[];
}

export interface Payment {
  id: number;
  paymentNumber: string;
  invoice: Invoice;
  amount: number;
  paymentMethod: string;
  referenceNumber: string;
  paymentDate: string;
  status: string;
  recordedBy: string;
  notes?: string;
}

export interface DashboardKpiSummary {
  totalRevenue: number;
  outstandingReceivables: number;
  totalOrdersCount: number;
  pendingOrdersCount: number;
  activeProductionCount: number;
  lowStockAlertsCount: number;
  totalCustomersCount: number;
  salesTrend: SalesTrendMetric[];
}

export interface SalesTrendMetric {
  label: string;
  revenue: number;
  ordersCount: number;
}

export interface AuditLog {
  id: number;
  timestamp: string;
  userEmail: string;
  action: string;
  entityName: string;
  entityId: string;
  details: string;
}
