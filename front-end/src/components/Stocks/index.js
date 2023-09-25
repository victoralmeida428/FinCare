import { useEffect, useState } from "react"
import Chart from "./chart"
import axios from "axios"
import SpinnerLoad from "../Spinner"
import { Container } from "react-bootstrap"


function CreateTraces(data){
    var traces = []
        for (const [key, value] of Object.entries(data)) {

            if (key == 'close') {
                traces.push({
                    x: data.date,
                    close: value,
                    decreasing: { line: { color: 'red' } },
                    high: data.high,
                    increasing: { line: { color: 'green' } },
                    low: data.low,
                    open: data.open,
                    type: 'candlestick',
                    xaxis: 'x',
                    yaxis: 'y'
                })
                break
            } else if (key != 'date') {
                traces.push({
                    x: data.date,
                    y: value,
                    type: 'scatter',
                    name: key,
                })

            }
        }
    return traces
}


function CreateChart(props) {
    const [trace, setTrace] = useState([])
    const [title, setTitle] = useState([])
    const [error, setError] = useState(0)
    const url = `http://127.0.0.1:8000/stocks/${props.stocks}/${props.start}/${props.end}`
    const assyncExemple = async()=>{
        try{
            const response = await axios.get(url)
            const data = response.data
            if (data.close.length > 0) {
                setTrace(CreateTraces(data))
                setTitle(props.stocks.replace('_ponto_', '.')
                    .replace('_acento_', '^')
                        .toUpperCase()
                            .replace('-', ', ')
                                .replace('-', ''))
                setError(0)
            }
            else {
                console.log(data);
                setTrace([])
                setError(error+1)
            }
        }
        catch(error){
            console.log(`Error:  ${error}`);
        }
    }

    useEffect(()=>{assyncExemple()},[url, error])

    if (trace.length > 0) {
        console.log(trace);
        return (
            <Chart title={title} traces={trace} />
        )
    }
    else {
        return (<Container className="p-5">
            <SpinnerLoad />
        </Container>
        )
    }
}

export default CreateChart