import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Icon(stock){
    const [icon, setIcon] = useState(regHeart)
    axios.get('http://localhost:8000/user/1/stocks')
    .then((data) =>{
        const stocks = data.data.map((element)=>element.stock)
        console.log(stocks, stock);
        if (stocks.includes(stock)){
            setIcon(solidHeart)
        }
            
    })
    .catch((err) =>{
        console.log(err);
    })

    return(<FontAwesomeIcon icon={icon} style={{color:'red'}}/>)

    }