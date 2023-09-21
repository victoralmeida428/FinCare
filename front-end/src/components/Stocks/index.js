import { useEffect, useState } from "react"
import Chart from "./chart"
import axios from "axios"
import SpinnerLoad from "../Spinner"
import { Container } from "react-bootstrap"

function CreateChart(props) {
    const [date, setDate] = useState([])
    const [trace, setTrace] = useState([])
    const [title, setTitle] = useState([])
    const [error, setError] = useState(0)
    const url = `http://127.0.0.1:8000/stocks/${props.stocks}/${props.start}/${props.end}`
    console.log(url);
    useEffect(() => {
        axios
            .get(url)
            .then((data) => {
                const date = data.data.date
                var traces = []

                if (date.length > 0) {
                    for (const [key, value] of Object.entries(data.data)) {

                        if (key == 'close') {
                            traces.push({
                                x: date,
                                close: value,
                                decreasing: { line: { color: 'red' } },
                                high: data.data.high,
                                increasing: { line: { color: 'green' } },
                                low: data.data.low,
                                open: data.data.open,
                                type: 'candlestick',
                                xaxis: 'x',
                                yaxis: 'y'
                            })
                            break
                        } else if (key != 'date') {
                            traces.push({
                                x: date,
                                y: value,
                                type: 'scatter',
                                name: key,
                            })

                        }
                    }
                    setTrace(traces)
                    setDate(date)
                    setTitle(props.stocks.replace('_ponto_', '.').replace('_acento_', '^').toUpperCase())
                    setError(0)
                }
                else {
                    setTrace([])
                    setDate([])
                    setError(error+1)

                }
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
                setError(error+1)
            });
    }, [url, error]);

    if (date.length > 0) {
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