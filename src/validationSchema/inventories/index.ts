import * as yup from 'yup';

export const inventoryValidationSchema = yup.object().shape({
  item_name: yup.string().nullable(),
  item_description: yup.string().nullable(),
  quantity: yup.number().integer().nullable(),
  price: yup.number().integer().nullable(),
  organization_id: yup.string().nullable().required(),
});
