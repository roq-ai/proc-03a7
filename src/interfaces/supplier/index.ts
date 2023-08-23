import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface SupplierInterface {
  id?: string;
  supplier_name?: string;
  contact_person?: string;
  phone_number?: string;
  email?: string;
  address?: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface SupplierGetQueryInterface extends GetQueryInterface {
  id?: string;
  supplier_name?: string;
  contact_person?: string;
  phone_number?: string;
  email?: string;
  address?: string;
  organization_id?: string;
}
