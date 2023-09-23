import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { prefix, faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import  './table.css'
import axios from 'axios';



const head = (stockData, icon)=>{
    if (stockData.data) {
        return(
            Object.keys(stockData.data[0]).map((col)=>{
                return (
                    <th key={col} className='text-center'>{col}{col==='info'? '': <FontAwesomeIcon icon={icon} style={{color:'red'}} />} </th>
                )
            })
        )}
    }

const body = (stockData) => {
    if (stockData.data) {
        const keys = Object.keys(stockData.data[0])
        
        return (
            stockData.data.map((data)=>

                    <tr>
                        {
                        keys.map((col)=><td className='text-center'>{data[col]}</td>)
                        }
                    </tr>
                    )
        )

    }
}

export default function StockInfoTable(props) {

    return(
        <Table className='table tabelWidth' hover={true} striped={true}>
            <thead>
                {head(props.stockData, props.icon)}
            </thead>
            <tbody>
                {body(props.stockData)}
            </tbody>
        </Table>
    )
}
