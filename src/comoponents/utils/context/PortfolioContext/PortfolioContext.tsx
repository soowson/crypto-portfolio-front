import {createContext} from "react";
import {GetPortfolioReq} from "types";

interface PortfolioContextType {
    portfolio: GetPortfolioReq[];
    responseMessage: string | null | undefined;
    refreshPortfolio: () => void;
}

export const PortfolioContext = createContext<PortfolioContextType>({
    portfolio: [],
    responseMessage: null,
    refreshPortfolio: () => {
    },
});
