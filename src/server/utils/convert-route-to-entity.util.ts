const mapping: Record<string, string> = {
  inventories: 'inventory',
  items: 'item',
  organizations: 'organization',
  'purchase-orders': 'purchase_order',
  suppliers: 'supplier',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
