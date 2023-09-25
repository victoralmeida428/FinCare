import { useState } from 'react';
import Formulario from '../components/Form';
import Menu from '../components/Menu/index'
import CreateChart from '../components/Stocks';
import { useLocation } from 'react-router-dom';
import { Col, Row, Stack } from 'react-bootstrap';
import GetInfos from '../components/Infos';
import  './style.css'

function HomePage(props) {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const stocks_url = searchParams.get('stocks');
    const start_url = searchParams.get('start');
    const end_url = searchParams.get('end');
    const today = new Date()
    const begin = new Date()
    const month = (m) => { return (m.toString().length == 1 ? `0${m + 1}` : m + 1) }
    const date = (y, m, d) => { return (`${y}-${month(m)}-${d}`) }
    const [stock, setStock] = useState(stocks_url?stocks_url:'_acento_BVSP')
    const startDate = new Date(begin.setDate(begin.getDate() - 60))
    const [start, setStart] = useState(start_url ? start_url : date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()))
    const [end, setEnd] = useState(end_url ? end_url : date(today.getFullYear(), today.getMonth(), today.getDate()))
    const GetStock = (value) => {
        var field = value.target.value
        field = field.replace('^', '_acento_')
        .replace('.', '_ponto_')
        .replace(' ', '-')
        .replace(',', '-')
        .replace(';', '-')
        setStock(`${field} ${stocks_url?stocks_url:''}`);

    }
    const GetStart = (value) => {
        var field = value.target.value
        setStart(field);

    }
    const GetEnd = (value) => {
        var field = value.target.value
        setEnd(field);


    }
    var inputs = [
        {
            onchange: GetStock,
            type: 'text',
            id: 'stock',
            label: 'Stocks',
            name: 'stocks',
        },
        {
            type: "date",
            id: 'start',
            label: 'start',
            name: 'start',
            onchange: GetStart
        },
        {
            type: 'date',
            id: 'end',
            label: 'end',
            name: 'end',
            onchange: GetEnd
        }]
    return (
        <div className='font'>
            <Menu />
            <Stack className='mt-5' direction='horizontal' gap={5} >
                <Formulario fields={inputs} btn={false} />
            </Stack>
            <Row>
                    <GetInfos stocks={stock} />
                    <CreateChart stocks={stock} end={end} start={start} />
            </Row>

        </div>
    )

}

export default HomePage;