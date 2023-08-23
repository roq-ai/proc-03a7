import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createPurchaseOrder } from 'apiSdk/purchase-orders';
import { purchaseOrderValidationSchema } from 'validationSchema/purchase-orders';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { getUsers } from 'apiSdk/users';
import { getOrganizations } from 'apiSdk/organizations';
import { PurchaseOrderInterface } from 'interfaces/purchase-order';

function PurchaseOrderCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PurchaseOrderInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPurchaseOrder(values);
      resetForm();
      router.push('/purchase-orders');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PurchaseOrderInterface>({
    initialValues: {
      order_number: '',
      supplier_name: '',
      order_date: new Date(new Date().toDateString()),
      delivery_date: new Date(new Date().toDateString()),
      total_amount: 0,
      user_id: (router.query.user_id as string) ?? null,
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: purchaseOrderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Purchase Orders',
              link: '/purchase-orders',
            },
            {
              label: 'Create Purchase Order',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Purchase Order
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.order_number}
            label={'Order Number'}
            props={{
              name: 'order_number',
              placeholder: 'Order Number',
              value: formik.values?.order_number,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.supplier_name}
            label={'Supplier Name'}
            props={{
              name: 'supplier_name',
              placeholder: 'Supplier Name',
              value: formik.values?.supplier_name,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="order_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Order Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.order_date ? new Date(formik.values?.order_date) : null}
              onChange={(value: Date) => formik.setFieldValue('order_date', value)}
            />
          </FormControl>
          <FormControl id="delivery_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Delivery Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.delivery_date ? new Date(formik.values?.delivery_date) : null}
              onChange={(value: Date) => formik.setFieldValue('delivery_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Total Amount"
            formControlProps={{
              id: 'total_amount',
              isInvalid: !!formik.errors?.total_amount,
            }}
            name="total_amount"
            error={formik.errors?.total_amount}
            value={formik.values?.total_amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/purchase-orders')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'purchase_order',
    operation: AccessOperationEnum.CREATE,
  }),
)(PurchaseOrderCreatePage);
