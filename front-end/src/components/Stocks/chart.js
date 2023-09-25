import React from 'react';
import Plot from 'react-plotly.js';

function Chart(props)  {
    var plots = []
    for (const trace of props.traces){
      console.log(trace);
    }
    return (
      <Plot
        data={props.traces}
        layout={{width: '100%',
            height: '100%',
            title: props.title,
            xaxis: {
              showgrid: false
            },
            yaxis: {
              showgrid: false
            }
            
         }}
      />
    );
  }


  export default React.memo(Chart);