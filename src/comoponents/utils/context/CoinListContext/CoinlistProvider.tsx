import React, {useEffect, useState} from "react";
import {CoinListContext} from "./CoinListContext";
import {CoinReq} from "types";

export const CoinListProvider = ({children}: { children: JSX.Element }) => {
    const [coinList, setCoinList] = useState<CoinReq[]>([]);

    useEffect(() => {
        try {
            (async () => {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false&price_change_percentage=1h%2C24h%2C7d`, {
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:3004/'
                    }
                });
                const data = await res.json();
                setCoinList(data)
            })();
        } catch (error) {
            console.log(error)
        }
    }, [])


    return <CoinListContext.Provider value={coinList}>
        {children}
    </CoinListContext.Provider>
};
