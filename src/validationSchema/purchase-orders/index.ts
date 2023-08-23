import * as yup from 'yup';

export const purchaseOrderValidationSchema = yup.object().shape({
  order_number: yup.string().nullable(),
  supplier_name: yup.string().nullable(),
  order_date: yup.date().nullable(),
  delivery_date: yup.date().nullable(),
  total_amount: yup.number().integer().nullable(),
  user_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
