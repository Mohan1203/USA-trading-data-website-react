import React from "react";
import AutoCompelete from "../componets/autoCompelete";
import StockList from "../componets/stockList";

function WatchList(){
    return(
        <div>
            <AutoCompelete/>
            <StockList/>
        </div>
    )
}

export default WatchList;