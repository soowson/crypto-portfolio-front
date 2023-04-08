import * as yup from "yup";

export const TransactionValidationSchema = yup.object({
    transactionType: yup.string().required('Select transactionType'),
    coinName: yup.string().required('Select coin'),
    amount: yup.number().positive('Invalid amount').required('Input coin amount'),
    price: yup.number().positive('Invalid amount').required('Input coin amount'),
    date: yup.string().required('Required'),
    time: yup.string().required('Required'),
});
