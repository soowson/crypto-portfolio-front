import React, {useContext, useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {CoinTableRow} from "./CoinTableRow";
import {CoinListContext} from "../utils/context/CoinListContext/CoinListContext";
import {Spinner} from "../common/Spinner/Spinner";

import styles from "./CoinTable.module.css";

export const CoinTable = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [coinName, setCoinName] = useState<string>('');
    const [pageNumber, setPageNumber] = useState<number>(0);
    const coinCtx = useContext(CoinListContext);

    useEffect(() => {
        if (coinCtx.length === 0) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [coinCtx]);

    const handleSearch = (coinName: string) => {
        return coinCtx.filter(coin => coin.id.toLowerCase().includes(coinName) || coin.symbol.toLowerCase().includes(coinName))
    };

    const coinsPerPage = 10;
    const pageCount = Math.ceil(handleSearch(coinName).length / coinsPerPage);

    return <>
        {loading ? <Spinner/> :
            <main className={styles.mainSection}>
                <div className={styles.mainSection__searchCoin}>
                    <input className={styles.mainSection__input} placeholder="Find your crypto!" type="text"
                           value={coinName} onChange={event => setCoinName(event.target.value)}/>
                </div>
                <table className={styles.coinTable}>
                    <thead className={styles.coinTable__thead}>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>1h Change</th>
                        <th>24h Change</th>
                        <th className={styles.coinTable__theadTrTh__sixth}>Market Cap</th>
                    </tr>
                    </thead>
                    <tbody>
                    {handleSearch(coinName)
                        .slice((pageNumber) * 10, (pageNumber) * 10 + 10)
                        .map(coin => <CoinTableRow coin={coin} key={coin.id}/>)}

                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={pageCount}
                    onPageChange={({selected}) => setPageNumber(selected)}
                    containerClassName={styles.paginationButtons}
                    previousLinkClassName={"previousButton"}
                    nextLinkClassName={"nextButton"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            </main>
        }
    </>
};
