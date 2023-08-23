import axios from 'axios';
import queryString from 'query-string';
import { PurchaseOrderInterface, PurchaseOrderGetQueryInterface } from 'interfaces/purchase-order';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPurchaseOrders = async (
  query?: PurchaseOrderGetQueryInterface,
): Promise<PaginatedInterface<PurchaseOrderInterface>> => {
  const response = await axios.get('/api/purchase-orders', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPurchaseOrder = async (purchaseOrder: PurchaseOrderInterface) => {
  const response = await axios.post('/api/purchase-orders', purchaseOrder);
  return response.data;
};

export const updatePurchaseOrderById = async (id: string, purchaseOrder: PurchaseOrderInterface) => {
  const response = await axios.put(`/api/purchase-orders/${id}`, purchaseOrder);
  return response.data;
};

export const getPurchaseOrderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/purchase-orders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePurchaseOrderById = async (id: string) => {
  const response = await axios.delete(`/api/purchase-orders/${id}`);
  return response.data;
};
