interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Procurement Manager'],
  customerRoles: [],
  tenantRoles: ['Owner', 'Procurement Manager'],
  tenantName: 'Organization',
  applicationName: 'proc',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
