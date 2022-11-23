import React,{useState,useEffect,useContext} from "react";
import {BiSearchAlt2 as Search} from "react-icons/bi"
import finHub from "../axios/api";
import { WatchListContext } from "../context/watchListContext";

function AutoCompelete(){
    let isMounted = true;
    const [search,setSearch] = useState("");
    const [result,setResults] = useState([]);
    let {addStock} = useContext(WatchListContext)
    


    let renderDropDown = () => {
        const dropdownclass = search ? "show" : null;
        return(
            <ul className={`dropdown-menu ${dropdownclass} w-full `} style={{
                height:"500px",
                overflowY:"scroll",
                overflowX:"hidden",
                cursor:"pointer"
            }}>
                {result.map((result)=>{
                    return(
                        <li className="dropdown-item" key={result.symbol} onClick={()=>{
                            addStock(result.symbol)
                            setSearch("")
                        }}>{result.description}({result.symbol})
                        </li>
                    )
                })}
            </ul>
        )
    }

    useEffect(()=>{
        let fetchData = async () =>{
            try {
                let response = await finHub.get("/search",{
                    params:{
                        q:search
                    }
                })
                
                setResults(response.data.result);
            } catch (error) {
                console.log(error)
            }
        }
        if(search.length > 0){
         fetchData();
        }else{
            setResults([])
        }
        return ()=>(isMounted = false);
    },[search])

    return(
    <div className="w-1/2  rounded-sm mx-auto  p-5 mb-32 mt-10 dropdown ">
       <label className="relative block">
  <span className="sr-only">Search</span>
  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
    <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><Search/></svg>
  </span>
  
  <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search" id="search" autoComplete="off" value={search} 
  onChange={(e)=>setSearch(e.target.value)}/>

   {renderDropDown()}
</label>
    </div>
    )
}

export default AutoCompelete;