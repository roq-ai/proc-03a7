import { PurchaseOrderInterface } from 'interfaces/purchase-order';
import { GetQueryInterface } from 'interfaces';

export interface ItemInterface {
  id?: string;
  item_name?: string;
  item_description?: string;
  quantity?: number;
  price?: number;
  purchase_order_id: string;
  created_at?: any;
  updated_at?: any;

  purchase_order?: PurchaseOrderInterface;
  _count?: {};
}

export interface ItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  item_name?: string;
  item_description?: string;
  purchase_order_id?: string;
}
