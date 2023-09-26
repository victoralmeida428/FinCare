import React from 'react';
import { Stack } from 'react-bootstrap';
import Plot from 'react-plotly.js';
import './charts.css'

function Chart(props) {

  const plots = props.data.map((data, index) => {
    if (data.date) {
      const trace = {
        x: data.date,
        close: data.close,
        decreasing: { line: { color: 'red' } },
        high: data.high,
        increasing: { line: { color: 'green' } },
        low: data.low,
        open: data.open,
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      }
      return (
        <div key={index} className="stack">
          <Plot
            style={{width: '50%', padding:'0px'}}
            data={[trace]}
            layout={{
              width: 580,
              height: 500,
              margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50,
                pad: 30
              },
              title: data.stock.replace('_ponto_', '.')
                .replace('_acento_', '^')
                .toUpperCase()
                .replace('-', ', ')
                .replace('-', ''),
              xaxis: {
                showgrid: false
              },
              yaxis: {
                showgrid: false
              }

            }}
          />
        </div>
      )
    }
  })

  return (
    <div className='chart'>
    {plots}
    </div>
  );
}


export default React.memo(Chart);