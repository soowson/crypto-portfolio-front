import {createContext} from "react";
import {GetTransactionReq} from "types";

interface TransactionsContextType {
    transactions: GetTransactionReq[];
    responseMessage: string | null
    refreshTransactions: () => void;
}

export const TransactionsContext = createContext<TransactionsContextType | undefined>({
    transactions: [],
    responseMessage: null,
    refreshTransactions: () => {},
});
