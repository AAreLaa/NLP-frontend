import React, { useState } from 'react'
import CanvasJSReact from './canvasjs/canvasjs.react';
import Plot from 'react-plotly.js';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default function WordEmbeddings(props) {
  let dataPoints = [];
  let a=[],b =[],c=[],lab=[];
  const [mode, setmode] = useState("");

  const [fetched1, setfetched1] = useState([]);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [z, setZ] = useState([]);
  const [label,setLabel]=useState([]);

  const twod = () => {
    setmode('2d');
    let url1 = '/api/word-embedding/2d/';
    fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        for (var i = 0; i < data['2d'].length; i++) {
          dataPoints.push({
            label: data['2d'][i].vocab,
            x: data['2d'][i].x,
            y: data['2d'][i].y,
            z: null
          });
        }
        setfetched1(dataPoints);
      })
      .catch(err => console.log(err));
  }

  const threed = () => {
    setmode('3d');
    let url2 = '/api/word-embedding/3d/';
    fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        for (var i = 0; i < data['3d'].length; i++) {
          a.push(data['3d'][i].x);
          b.push(data['3d'][i].y);
          c.push(data['3d'][i].z);
          lab.push(data['3d'][i].vocab)
        }
        setX(a);
        setY(b);
        setZ(c);
        setLabel(lab);
       
        console.log(data)
      })
      .catch(err => console.log(err));
  }

  const options1 = {
    animationEnabled: true,
    exportEnabled: true,
    markerType: 'none',
    height: '700',


    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: "2D Word Embeddings",
      fontSize: 24,
      fontFamily: "my-font",
    },
    axisX: {
      title: "X",
      titleFontSize: 20,
      titleFontWeight: "bold",
      labelFontSize: 8,
      labelFontWeight: "bold",
      minimum: -4,
      maximum: 6.5,
      interval: 0.2
    },
    axisY: {
      title: "Y",
      titleFontSize: 20,
      titleFontWeight: "bold",
      labelFontSize: 8,
      labelFontWeight: "bold",
      minimum: -4,
      maximum: 4,
      interval: 0.1,
      gridThickness: 0.2

    },
    data: [{
      type: "scatter",
      indexLabel: "{label}",
      markerSize: 9,
      indexLabelFontSize: 12,
      indexLabelPlacement: "outside",
      toolTipContent: "<b>{label}</b><br>Along x: {x}<br>Along y: {y}",
      dataPoints: fetched1
    }]
  }

  return (
    <div className="container my-3">
      <div className="d-flex justify-content-between">
        <div className="">
          <button onClick={twod} type="button" className={`btn btn-outline-${props.mode === 'light' ? 'dark' : 'light'}`}>Get 2D Word Embeddings</button>
        </div>
        <div className="">
          <button onClick={threed} type="button" className={`btn btn-outline-${props.mode === 'light' ? 'dark' : 'light'}`}>Get 3D Word Embeddings</button>
        </div>

      </div>

      <div className="container my-2">
        {mode === '2d' ?
          <div>
            <CanvasJSChart options={options1} />
          </div> : mode === '3d' ?
            <div>
              <Plot data={[
        {
          x: x,
          y: y,
          z: z,
          mode:'+markers+text',
          type:'scatter3d',
          marker: {
            size:5,
            color:'blue',     
            colorscale:'Viridis', 
            opacity:0.8
          },
          text: label,
          textposition: 'top center',
          textfont: {
            family:  'Raleway, sans-serif'
          }
        }
      ]}
      layout={{width: 1200, height: 1000,  title: {
        text:'<b>3D Word Embeddings</b>',
        font: {
          family: 'my-font',
          size: 24,
        },
        
    }}}/>
            </div> : <>
              <h1 className='animate' style={{ alignItems: 'centre' }}>Click the button to see respective graphs</h1>
              <div className="center">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
              </div>
            </>}
      </div>
    </div>
  )
}
