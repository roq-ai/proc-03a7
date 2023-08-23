import * as yup from 'yup';

export const supplierValidationSchema = yup.object().shape({
  supplier_name: yup.string().nullable(),
  contact_person: yup.string().nullable(),
  phone_number: yup.string().nullable(),
  email: yup.string().nullable(),
  address: yup.string().nullable(),
  organization_id: yup.string().nullable().required(),
});
