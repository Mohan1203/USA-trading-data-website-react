import axios from "axios";
import React,{useState,useEffect} from "react";

let KEY = "cdqrl02ad3idhh7946n0cdqrl02ad3idhh7946ng";

export default axios.create({
    baseURL:"https://finnhub.io/api/v1",
    params:{
        token:KEY
    }
    
})

