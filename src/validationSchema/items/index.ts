import * as yup from 'yup';

export const itemValidationSchema = yup.object().shape({
  item_name: yup.string().nullable(),
  item_description: yup.string().nullable(),
  quantity: yup.number().integer().nullable(),
  price: yup.number().integer().nullable(),
  purchase_order_id: yup.string().nullable().required(),
});
