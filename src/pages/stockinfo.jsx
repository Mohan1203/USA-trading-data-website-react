import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finHub from "../axios/api"
import StockChart from "../componets/sotckChart"
import {Stockdata} from "../componets/stockData"

let formatData = (data) => {
    return data.t.map((el,index)=>{
       return {
        x : el*1000,
        y : Math.floor(data.c[index])
       }
    })
}

export function StockInfo() {
    const [chartData, setChartData] = useState([])
    const { symbol } = useParams();

useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            //For take time from computer 
            const date = new Date();
            const currentTime = Math.floor(date.getTime() / 1000);
            let oneDay;
            if (date.getDay() === 0) {
                oneDay = currentTime - 2 * 60 * 60 * 24;
            }
            else if (date.getDay() === 1) {
                oneDay = currentTime - 3 * 60 * 60 * 24;
            } else {
                oneDay = currentTime - 60 * 60 * 24;
            }
            const oneWeek = currentTime - 7 * 60 * 60 * 24;
            const oneYear = currentTime - 365 * 60 * 60 * 24;
            //For making request to server
            try {
                const responses = await Promise.all([finHub.get("/stock/candle", {
                    params: {
                        symbol,
                        from: oneDay,
                        to: currentTime,
                        resolution: 30,
                    }
                }), finHub.get("/stock/candle", {
                    params: {
                        symbol,
                        from: oneWeek,
                        to: currentTime,
                        resolution: 60,
                    }
                }), finHub.get("/stock/candle", {
                    params: {
                        symbol,
                        from: oneYear,
                        to: currentTime,
                        resolution: "W",
                    }
                })])
                if(isMounted){
                setChartData({
                    day:formatData(responses[0].data),
                    week:formatData(responses[1].data),
                    year:formatData(responses[2].data)

                })
                
                
            }
            
        } catch (err) {
            console.log(err)
        }
    }
    fetchData();
        return () => (isMounted = false)
    }, [symbol])

    return(
        <div>
        {chartData &&(
            <div>
                <StockChart chartData={chartData} symbol={symbol}/>
                <Stockdata symbol={symbol}/>
            </div>
        )}
        
</div>
   
    )
}

