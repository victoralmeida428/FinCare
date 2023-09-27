import axios from "axios";
import { useEffect, useState } from "react";
import StockInfoTable from "./table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';


export default function GetInfos(props) {
    const url = `http://127.0.0.1:8000/info_stocks/${props.stocks}`
    const [error, setError] = useState(0)
    const [data, setData] = useState({})
    const [fav, setFav] = useState([])
    async function getInfo(){
        try {
            const response = await axios.get(url);
            setData(response.data)

        } catch(err){
            console.log(err);
            setError(error+1)
        }

    }


    async function getFav() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/user/stocks');
          const stocks_fav = response.data.map((e) => e.stock);
          const stocks = Object.keys(data.data[0]);
          console.log('fav', response.data);
          var dados = {};
          stocks.map((s) => {
            dados[s] = stocks_fav.includes(s) ? solidHeart : regHeart;
          });
      
          setFav(dados);
        } catch (err) {
          console.log(err);
          setError(error+1)
        }
      }
    const favClick = (e)=>{
      const svg = e.target.tagName=='path'?e.target.parentElement:e.target
      const stock = svg.parentElement.innerText
      console.log(stock)
    }
    useEffect(()=>{getFav()}, [url, error])
    useEffect(()=>{getInfo()}, [url, error])

    return(
        <StockInfoTable stockData={data} icon={regHeart} fav={fav} clickAction={favClick}/>
    )

}