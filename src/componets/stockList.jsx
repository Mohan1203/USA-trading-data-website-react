import React,{useEffect,useState,useContext} from "react";
import finHub from "../axios/api"
import { useNavigate } from "react-router-dom";
// import StockInfo from "../pages/stockinfo";
import { WatchListContext } from "../context/watchListContext";





function StockList(){
    let [stockData,setStockdata] = useState([])
    let {watchList,deleteStock} = useContext(WatchListContext)
    const navigate = useNavigate();

    useEffect(()=>{
        let isMounted = true;
        let fetchData = async () => {
            try {
               const responses = await Promise.all(watchList.map((stock)=>{
                return finHub.get("/quote",{
                params:{
                    symbol:stock
                }
               })}));
            
              let data = responses.map((response)=>{
                return {
                    data:response.data,
                    symbol: response.config.params.symbol
                }
              })
               if(isMounted){
                   setStockdata(data)
                   };
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
        return () => (isMounted = false);
    },[watchList]);
    

    const handleStockSelect = (symbol) => {
        navigate(`stockinfo/${symbol}`)
    }
    
    return(
    <div>
         <table className="table w-1/2 mx-auto mt-5 ">
            <thead style={{color:"rgb(79,89,102"}} className="mx-10">
            <tr className="mx-10">
                <th scope="col" className="px-10">Name</th>
                <th scope="col" className="px-10">Last</th>
                <th scope="col" className="px-10">Chg</th>
                <th scope="col" className="px-10">Chg%</th>
                <th scope="col" className="px-10">High</th>
                <th scope="col" className="px-10">Low</th>
                <th scope="col" className="px-10">Open</th>
                <th scope="col" className="px-10">Pclose</th>
                
            </tr>
            </thead>
                {watchList.length >0 ? 
            <tbody>
                {
                    stockData.map((stockData)=>{
                        return(
                            
                            <tr key={stockData.symbol} className="hover:text-[#e414e1] group cursor-pointer table-row" onClick={()=>handleStockSelect(stockData.symbol)}>
                                <th scope="row">{stockData.symbol}</th>
                                <td >{stockData.data.c}</td>
                                <td className={stockData.data.d > 0 ? "text-green-600":"text-red-600"}>{stockData.data.d}</td>
                                <td className={stockData.data.dp > 0 ? "text-green-600":"text-red-600"}>{stockData.data.dp}</td>
                                <td>{stockData.data.h}</td>
                                <td>{stockData.data.l}</td>
                                <td>{stockData.data.o}</td>
                                <td className="flex w-5">{stockData.data.pc}
                                <button className="btn btn-danger btn-sm ml-3 d-inline-block delete-button" onClick={(e)=>{
                                    e.stopPropagation()
                                    deleteStock(stockData.symbol)
                                    }}>Remove</button></td>
                            </tr>
                              
                              
                            )
                    })
                }
            </tbody>
            :<p className="relative top-[10px] left-[235px] italic">There is no stock here</p>
             }
        </table>
    </div>
    )
}

export default StockList;