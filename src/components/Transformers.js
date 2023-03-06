import React, { useRef, useState } from 'react'

export default function Transformers(props) {
  const [control, setControl] = useState(null);
  const [fetched, setFetched] = useState(null);
  const [word, setWord] = useState('');
  const [num, setNum] = useState('');
  const text= useRef(" ")
  const number= useRef(" ")
  const [display, setDisplay] = useState("Enter something to show the generated text...");
  const changedValue = (event) => {
    setWord(event.target.value)
    console.log(event.target.value)
    console.log(text)
  }

  const changedNumber = (event) => {
    setNum(event.target.value)
    number.current= event.target.value;
  }
  

  const handleKey = (e) => {
    if (e.key === " " || e.key === "Enter") {
      const lang = 'ne';
      const url = `https://www.google.com/inputtools/request?ime=transliteration_en_${lang}&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=${word}`;
      fetch(url)
        .then(res => res.json()
          .then(data => {
            setWord(data[1][0][1][0] + " ");
            console.log("inner",word)
            text.current= data[1][0][1][0] + " ";
            console.log("inner text",text)
          }))
        .catch(err => console.log(err));
    }
  }

  const show = () => {
    if (control) {
      clearTimeout(control);
      setControl(null);
    }

    let x = setTimeout(() => {
      setDisplay("Why don't you try some other text too...");
    }, 20000);
    setControl(x);
    postreq();
  }
  const postreq = () => {
    console.log("pst",number.current,text)
    let url = "/api/transformer-lm/";
    console.log(number)
    fetch(url, {
      method: "post",
      mode: 'cors',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        body: text.current.trim(),
        num_words: 3
      })
    })

      .then(response => response.json())

      .then(json => {
        setFetched(json)
        console.log(fetched)
      })
      .catch(err => console.log(err));
  }

  return (

    <div className="container my-3">
      {
        props.mode === 'dark' ?
          <div className="px-5 pt-3 pb-3" style={{ boxShadow: '#5a6269  0px 2px 8px', borderRadius: '0.75rem' }}>
            <div style={{ color: 'white' }}>
              <h1><label htmlFor="exampleFormControlTextarea1" className="form-label font">{props.head}</label></h1>
              <textarea className="form-control opacity-50" autoFocus id="exampleFormControlTextarea1" value={word} onKeyDown={handleKey} onChange={changedValue} style={{ backgroundColor: 'black', color: 'white' }} rows="8"></textarea>
              <div>
                <span className="form-label font mt-4 mr-4" style={{ fontWeight:'500' }}>Enter number of words: </span>
                <input type='number' className="form-control opacity-50 mt-4" id="exampleFormControlTextarea1" value={num} onChange={(changedNumber)} style={{ backgroundColor: 'black', color: 'white', width: '10%',display: 'inline-block'}} rows="1"></input>
              </div>
              <button type="button" className="button-4 my-3" disabled={(text.current.trim().length === 0 || number.current.trim().length===0) ? true : false} style={{ cursor: text.current.trim().length === 0 || number.current.trim().length===0 ? 'not-allowed' : 'pointer' }} onClick={show}>Generate Text</button>
              <h1 className='font'>Generated Text:</h1>
              <p className='font' style={{ fontSize: '20px' }}>{display}</p>
            </div>
          </div>

          :

          <div className="px-5 pt-3 pb-3" style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', borderRadius: '0.75rem' }}>
            <h1><label htmlFor="exampleFormControlTextarea1" className="form-label font">{props.head}</label></h1>
            <textarea className="form-control" autoFocus id="exampleFormControlTextarea1" value={word} onKeyDown={handleKey} onChange={changedValue} rows="8"></textarea>
            <div>
                <span className="form-label font mt-4 mr-4" style={{ fontWeight:'500' }}>Enter number of words: </span>
                <input type='number' className="form-control mt-4" id="exampleFormControlTextarea1" value={num} onChange={changedNumber} style={{ borderColor:'#020202', width: '10%',display: 'inline-block'}} rows="1"></input>
              </div>
            <button type="button" className="button-4 my-3" disabled={(text.current.trim().length === 0 || number.current.trim().length===0) ? true : false} style={{ cursor: text.current.trim().length === 0 || number.current.trim().length===0 ? 'not-allowed' : 'pointer' }} onClick={show}>Generate Text</button>
            <h1 className='font'>Generated Text:</h1>
            <p className='font' style={{ fontSize: '20px' }}>{display}</p>
          </div>
      }
    </div>

  )
}
