import { useEffect, useState } from "react"
import Chart from "./chart"
import axios from "axios"
import SpinnerLoad from "../Spinner"
import { Container } from "react-bootstrap"

function CreateChart(props) {
    const [data, setData] = useState([])
    const [error, setError] = useState(0)
    const url = `http://127.0.0.1:8000/stocks/${props.stocks}/${props.start}/${props.end}`
    const assyncExemple = async () => {
        try {
            const response = await axios.get(url)
            setData(response.data.data)
            setError(0)
        }
        catch (err) {
            console.log(`Error:  ${err}`);
            setError(error+1)
        }
    }

    useEffect(() => { assyncExemple() }, [url, error])

    if (data) {
        return (
            <Chart data={data} />
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