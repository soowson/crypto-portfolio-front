import {createContext} from "react";
import {CoinReq} from "types";

export const CoinListContext = createContext<CoinReq[]>([]);
