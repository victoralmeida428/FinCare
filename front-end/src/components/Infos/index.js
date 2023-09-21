import axios from "axios";
import { useEffect, useState } from "react";
import StockInfoTable from "./table";

export default function GetInfos(props) {
    const url = `http://127.0.0.1:8000/info_stocks/${props.stocks}`
    console.log(url);
    const [error, setError] = useState(0)
    const [data, setData] = useState({})
    useEffect(()=>
        {
            axios
            .get(url)
            .then((data)=>{
               setData(data.data)
                
            })
            .catch((err)=>{
                console.log(err);
                setError(error+1)
            })
        },[url, error]

    )

    return(
        <StockInfoTable stockData={data} />
    )

}