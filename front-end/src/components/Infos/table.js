import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import  './table.css'

function rows(keys, stocks, stockData){
    const row = keys.map(key=>(
        <tr>
            <td className={'column'}>{key}</td>
            {stocks.map(e=><td className={'column'}>{stockData[key][e]}</td>)}
        </tr>
    ))
    return (
        row
    )
}


function StockInfoTable({ stockData }) {
    // Obter as   chaves (valores) do objeto data
    const keys = Object.keys(stockData);
    let stocks = undefined
    let body = undefined
    let th = []
    
    if (keys.length>0){
        stocks = Object.keys(stockData[keys[0]])
        stocks.map((s)=>{th.push(<td>{s} <FontAwesomeIcon icon={regHeart} style={{color: "#fa0000",}} /></td>)})
        body = rows(keys, stocks, stockData)
        
    }
    return (
            <div>
            <h2>Stocks Informations</h2>
            <table className='tabelWidth table table-striped table-hover'>
                <thead>
                <tr>
                    <th>Info</th>
                    {th}
                </tr>
                    {body}
                </thead>
                <tbody>
                </tbody>
            </table>
            </div>
        );
    
    }

    export default StockInfoTable;
