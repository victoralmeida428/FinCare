import axios from "axios";
import { useEffect, useState } from "react";
import StockInfoTable from "./table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';


export default function GetInfos(props) {
    const url = `http://127.0.0.1:8000/info_stocks/${props.stocks}`
    console.log(url);
    const [error, setError] = useState(0)
    const [data, setData] = useState({})
    const [icon, setIcon] = useState(regHeart)
    var stocks = []
    useEffect(()=>
        {
            axios
            .get(url)
            .then((data)=>{
               setData(data.data)
               stocks = Object.keys(data.data)
                
            })
            .catch((err)=>{
                console.log(err);
                setError(error+1)
            })
        },[url, error]

    )
    async function isFavorited(stock) {
        const response = await axios.get('http://localhost:8000/user/1/stocks');
        const favorites = response.data.favorites;
        return favorites.includes(stock);
    }
    useEffect(() => {
        async function isFav() {
            const isFavorited = await isFavorited(props.stocks);
            setIcon(isFavorited ? solidHeart : regHeart);
        }
        isFav();
    }, [props.stocks]);


    return(
        <StockInfoTable stockData={data} icon={regHeart}/>
    )

}