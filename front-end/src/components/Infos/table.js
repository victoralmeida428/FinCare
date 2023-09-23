import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  './table.css'

const head = (stockData, fav)=>{
    if (stockData.data) {
        return(
            Object.keys(stockData.data[0]).map((col)=>{
                console.log(fav[col]);
                return (
                    <th key={col} className='text-center'>
                        {col}{col==='info'? '': <FontAwesomeIcon icon={fav[col]} style={{color:'red'}} />}
                    </th>
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
                {head(props.stockData, props.fav)}
            </thead>
            <tbody>
                {body(props.stockData)}
            </tbody>
        </Table>
    )
}
