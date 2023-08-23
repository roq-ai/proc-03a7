import { ItemInterface } from 'interfaces/item';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface PurchaseOrderInterface {
  id?: string;
  order_number?: string;
  supplier_name?: string;
  order_date?: any;
  delivery_date?: any;
  total_amount?: number;
  user_id: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  item?: ItemInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    item?: number;
  };
}

export interface PurchaseOrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  order_number?: string;
  supplier_name?: string;
  user_id?: string;
  organization_id?: string;
}
