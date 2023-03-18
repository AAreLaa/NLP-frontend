import React, { useState } from 'react'
import wait from "../images/wait.gif"
export default function Transformers(props) {
  const [fetcheddata, setfetcheddata] = useState(null);
  const [text, settext] = useState("");
  const [generated, setGenerated] = useState("");
  const [input, setInput] = useState("");
  const [number, setnumber] = useState('');
  const [loading, setLoading] = useState(false);
  const changedvalue = (event) => {
    settext(event.target.value);
    
  }

  const handleKey = (e) => {
    if (e.key === " " || e.key === "Enter") {
      const lang = 'ne';
      const url = `https://www.google.com/inputtools/request?ime=transliteration_en_${lang}&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=${text}`;
      fetch(url)
        .then(res => res.json()
          .then(data => {
            settext(data[1][0][1][0] + " ");
          }))
        .catch(err => console.log(err));
    }
  }

  const show = () => {
    if(number.trim().length === 0)
    {
      setnumber("3")
    }
    let url = "/api/transformer-lm/";
    setLoading(true);

    fetch(url, {
      method: "post",
      mode: 'cors',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },


      body: JSON.stringify({
        body: text.trim(),
        num_words: number.trim().length === 0 ? 3:number
      })
    })

      .then(response => response.json())

      .then(json => {
        setfetcheddata(json);
        setInput("Input String: " + json["Input String"]);
        setGenerated("Generated String: " + json["Generated String"]);
        setLoading(false);

      })
      .catch(err => console.log(err))
  }



  return (

    <div className="container my-3">
      {
        props.mode === 'dark' ?
          <div className="px-5 pt-3 pb-3" style={{ boxShadow: '#5a6269  0px 2px 8px', borderRadius: '0.75rem' }}>
            <div style={{ color: 'white' }}>
              <h1><label htmlFor="exampleFormControlTextarea1" className="form-label font">{props.head}</label></h1>
              <textarea className="form-control opacity-50" autoFocus id="exampleFormControlTextarea1" value={text} onKeyDown={handleKey} onChange={changedvalue} style={{ backgroundColor: 'black', color: 'white' }} rows="8"></textarea>
              <div>
                <span className="form-label font mt-4 mr-4" style={{ fontWeight: '500' }}>Enter number of words (Default = 3): </span>
                <input type='number' className="form-control opacity-50 mt-4" id="exampleFormControlTextarea1" value={number} onChange={(e) => { setnumber(e.target.value) }} style={{ backgroundColor: 'black', color: 'white', width: '10%', display: 'inline-block' }} rows="1"></input>
              </div>
              <button type="button" className="button-4 my-3" disabled={(text.trim().length === 0 ) ? true : false} style={{ cursor: text.trim().length === 0 ? 'not-allowed' : 'pointer' }} onClick={show}>Generate Text</button>
              <div className='text-center'>{loading?<img src ={wait} width="20%" alt="loading" />:<></>}</div>
              {fetcheddata === null || loading ? <p className='font' style={{ fontSize: '20px' }}></p>
                :
                <>
                  <p className='font' style={{ fontSize: '20px' }}>{input}</p>
                  <p className='font' style={{ fontSize: '20px' }}>{generated}</p></>}
            </div>
          </div>

          :

          <div className="px-5 pt-3 pb-3" style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', borderRadius: '0.75rem' }}>
            <h1><label htmlFor="exampleFormControlTextarea1" className="form-label font">{props.head}</label></h1>
            <textarea className="form-control" autoFocus id="exampleFormControlTextarea1" value={text} onKeyDown={handleKey} onChange={changedvalue} rows="8"></textarea>
            <div>
              <span className="form-label font mt-4 mr-4" style={{ fontWeight: '500' }}>Enter number of words (Default = 3): </span>
              <input type='number' className="form-control mt-4" id="exampleFormControlTextarea1" value={number} onChange={(e) => { setnumber(e.target.value) }} style={{ borderColor: '#020202', width: '10%', display: 'inline-block' }} rows="1"></input>
            </div>
            <button type="button" className="button-4 my-3" disabled={(text.trim().length === 0 ) ? true : false} style={{ cursor: text.trim().length === 0 ? 'not-allowed' : 'pointer' }} onClick={show}>Generate Text</button>
            <div className='text-center'>{loading?<img src ={wait} width="20%" alt="loading" />:<></>}</div>
            {fetcheddata === null || loading ? <p className='font' style={{ fontSize: '20px' }}>{ }</p>
              :
              <>
                <p className='font' style={{ fontSize: '20px' }}>{input}</p>
                <p className='font' style={{ fontSize: '20px' }}>{generated}</p></>}
          </div>
      }
    </div>

  )
}
