import { useState } from "react";
import Chart from "react-apexcharts";

export default function StockChart({chartData,symbol}){
    const [dateFormat,setDateFormat] = useState("24H");
    const{day,week,year} = chartData;

    const determeniDateFormat = () => {
        
        switch (dateFormat) {
            case "24H":
                return day;
                break;
            
            case "7D":
                return week;
                break;
             case "1Y":
                return year;
                break;
            default:
                return day;
            }
    }

    //const color = determeniDateFormat()[determeniDateFormat().length-1].y - determeniDateFormat()[0].y > 0 ? "#26C281" : "#ed3419"



    const options = {
        //colors:[color],
        title:{
            text:symbol,
            align:"center",
            style:{
                fontSize:"24px"
            }
        },
        chart:{ 
            id:"stock data",
            animation:{
                speed:1300  
            }
        },
        xaxis:{
            type:"datetime",
            labels:{
                datetimeUTC:false
            }
        },
        tooltip:{
            x:{
                format:"MMM dd HH:MM"
        }
    }
    }

  

    const series = [{
        name:symbol,
        data:determeniDateFormat(),
    }]

    const btnstyle = (button) => {
        let classes = "btn ml-8 "
        if(button === dateFormat){
            return classes + "btn-primary"
        }else{
            return classes + "btn-outline-primary"
        }
    }

    return(
        <div className="mt-5 p-4 shadow-sm bg-white">
            <Chart options={options} series={series} type="area" width="100%"/>
            <div className="flex">
                <button onClick={(e)=>{
                    e.preventDefault();
                    setDateFormat("24H")}} className={btnstyle("24H")} style={{marginLeft:"63px"}}>24H</button>
                <button onClick={()=>setDateFormat("7D")} className={btnstyle("7D")}>7D</button>
                <button onClick={()=>setDateFormat("1Y")} className={btnstyle("1Y")}>1Y</button>
            </div>
            
        </div>
    )
}