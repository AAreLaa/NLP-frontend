import React, { useState } from 'react'
import CanvasJSReact from './canvasjs/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default function WordEmbeddings(props) {
  let dataPoints=[];

  const[mode,setmode]=useState("");

  const[fetched1,setfetched1]=useState([]);
  const[fetched2,setfetched2]=useState([]);

const twod=()=>{
  setmode('2d');
  let url1='/api/word-embedding/2d/';
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
  .catch(err=>console.log(err));
}

const threed=()=>{
  setmode('3d');
  let url2='/api/word-embedding/3d/';
  fetch(url2)
  .then((response) => response.json())
  .then((data) => {
    for (var i = 0; i < data['3d'].length; i++) {
      dataPoints.push({
        label: data['3d'][i].vocab,
        x: data['3d'][i].x,
        y: data['3d'][i].y,
        z: data['3d'][i].z,
        markerSize: 15+2*data['3d'][i].z,
        indexLabelPlacement: "outside" 
      });
    }
    setfetched2(dataPoints);
  })
  .catch(err=>console.log(err));
}

  const options1 = {
    animationEnabled: true,
    exportEnabled: true,
    markerType: 'none',
    height: '700',
    

    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title:{
      text: "2D Word Embeddings",
      fontSize: 25
    },
    axisX: {
      title: "X",
      titleFontSize: 20,
      titleFontWeight: "bold",
      labelFontSize: 8,
      labelFontWeight: "bold",
      minimum:-4,
      maximum:6.5,
      interval: 0.2
    },
    axisY: {
      title: "Y",
      titleFontSize: 20,
      titleFontWeight: "bold",
      labelFontSize: 8,
      labelFontWeight: "bold",
      minimum:-4,
      maximum:4,
      interval: 0.1,
      gridThickness: 0.2
    
    },
    data: [{
      type: "scatter",
      indexLabel: "{label}",
      markerSize: 9,
      indexLabelFontSize: 12,
      indexLabelPlacement:"outside",
      toolTipContent: "<b>{label}</b><br>Along x: {x}<br>Along y: {y}",
      dataPoints: fetched1
    }]
  }

  const options2 = {
    animationEnabled: true,
    exportEnabled: true,
    markerType: 'none',
    height: '700',
    dataPointMaxWidth: 1,
    // backgroundColor: "#cbfdfd",

    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title:{
      text: "3D Word Embeddings(Size is based on value of z)",
      fontSize: 25
    },
    axisX: {
      title: "X",
      titleFontSize: 20,
      titleFontWeight: "bold",
      labelFontSize: 10,
      labelFontWeight: "bold",
      minimum:-4,
      maximum:6.5,
      interval: 0.3
    },
    axisY: {
      title: "Y",
      titleFontSize: 20,
      titleFontWeight: "bold",
      labelFontSize: 10,
      labelFontWeight: "bold",
      minimum:-4,
      maximum:4,
      interval: 0.3,
      gridThickness: 0.5
    
    },
    data: [{
      type: "scatter",
      indexLabelFontSize: 12,
      indexLabelPlacement:"outside",
      markerSize:10,
      indexLabel: "{label}",
      toolTipContent: "<b>{label}</b><br>Along x: {x}<br>Along y: {y}<br>Along z: {z}",
      dataPoints: fetched2
    }]
  }

  return (
    <>
    <div className="d-flex justify-content-between">
      <div className="">
      <button onClick={twod} type="button" className={`btn btn-outline-${props.mode==='light'?'dark':'light'}`}>Get 2D Word Embeddings</button>
      </div>
      <div className="">
      <button onClick={threed} type="button" className={`btn btn-outline-${props.mode==='light'?'dark':'light'}`}>Get 3D Word Embeddings</button>
      </div>
      
    </div>
    
    <div className="container my-2">
      {mode==='2d'?
      <div>
              <CanvasJSChart options = {options1}/>
      </div>:mode==='3d'?
      <div>
              <CanvasJSChart options = {options2}/>
      </div>:<>
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
    </>
  )
}
