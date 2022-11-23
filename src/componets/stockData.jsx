import {useState,useEffect} from "react";
import finHub from "../axios/api"
export const Stockdata = ({symbol}) => {
    let isMounted = true;
    const [stockData,setStockData] = useState([])
    useEffect(()=>{
        const fetchData = async() => {
            try{
                const response = await finHub.get("/stock/profile2",{
                    params:{
                        symbol
                    }
                })
                if(isMounted){
                setStockData(response.data);
            }
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
        return () => (isMounted=false);
    },[symbol])
    return (
        <div>
           {stockData && (
            <div className="row bg-white rounded-sm shadow-sm p-4 mt-5 ml-10">
                <div className="col">
                    <div>
                        <span className="fw-bold ">name: </span>{stockData.name}
                    </div>
                    <div>
                        <span className="fw-bold ">country: </span>{stockData.country}
                    </div>
                    <div>
                        <span className="fw-bold ">ticker: </span>{stockData.ticker}
                    </div>
                </div>
                <div className="col">
                <div>
                        <span className="fw-bold ">Exchange: </span>{stockData.exchange}
                    </div>
                <div>
                        <span className="fw-bold ">Industry: </span>{stockData.finnhubIndustry}
                    </div>
                <div>
                        <span className="fw-bold ">IPO: </span>{stockData.ipo}
                    </div>
                </div>
                <div className="col">
                <div>
                        <span className="fw-bold ">MarketCap: </span>{stockData.marketCapitalization
}
                    </div>
                <div>
                        <span className="fw-bold ">Shares Outstanding: </span>{stockData.shareOutstanding}
                    </div>
                <div>
                        <span className="fw-bold ">URL: </span><a href={stockData.weburl}>{stockData.weburl}</a>
                    </div>
                </div>
            </div>
           )}
        </div>
    )
}