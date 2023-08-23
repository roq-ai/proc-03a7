import { InventoryInterface } from 'interfaces/inventory';
import { PurchaseOrderInterface } from 'interfaces/purchase-order';
import { SupplierInterface } from 'interfaces/supplier';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  inventory?: InventoryInterface[];
  purchase_order?: PurchaseOrderInterface[];
  supplier?: SupplierInterface[];
  user?: UserInterface;
  _count?: {
    inventory?: number;
    purchase_order?: number;
    supplier?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
