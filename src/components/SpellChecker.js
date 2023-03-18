import React, { useState } from 'react'
import wait from "../images/wait.gif"
export default function SpellChecker(props) {
  const [fetcheddata, setfetcheddata] = useState(null);
  const [text, settext] = useState("");
  const [option, setOption] = useState("knlm");
  const [correctionType, setCorrectionType] = useState("");
  const [wordArray, setWordArray] = useState(null)
  const [choiceState, setChoiceState] = useState("");
  const [choiceIndex, setChoiceIndex] = useState("");
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

  const show = (correctionType) => {
    setCorrectionType(correctionType)
    let url = "/api/spellchecker/";
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
        models: option
      })
    })

      .then(response => response.json())

      .then(json => {
        console.log(json,text)
        setfetcheddata(json);
        setWordArray(json['Input String'].trim().split(' '));
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  let setChoice = (i) => {
    if (choiceState === "clicked" && choiceIndex === i) {
      setChoiceState("not clicked");
    }
    else {
      setChoiceState("clicked");
    }
    setChoiceIndex(i);
  }

  const showChoices = () => {
    if (choiceState === "clicked") {
      return (<div className='mt-3'>
        <table className="table table-hover table-striped table-bordered border-primary" style={{ width: '30%' }}>
          <thead>
            <tr className='table-dark table-bordered border-dark-subtle'>
              <th scope="col">Choices:</th>
            </tr>
          </thead>
          <tbody>
            {fetcheddata["Choices list"][choiceIndex].map((element, i) => {
              return (
                <tr key={i} className='table-info table-bordered border-dark' style={{ cursor: "pointer" }}>
                  <th scope="row" onClick={() => { replaceText(i, "not clicked") }}>{element}</th>
                </tr>)
            })}
          </tbody>
        </table>
      </div>)
    }
    else {
      return (<></>)
    }
  }

  const replaceText = (i, status) => {
    setChoiceState(status);
    document.getElementById(`choice${choiceIndex}`).innerHTML = fetcheddata['Choices list'][choiceIndex][i] + ' ';
    document.getElementById(`choice${choiceIndex}`).style.color = wordArray[choiceIndex] === fetcheddata['Choices list'][choiceIndex][i] ? "green" : "red";
  }


  return (

    <div className="container my-3">
      {
        props.mode === 'dark' ?
          <div className="px-5 pt-3 pb-3" style={{ boxShadow: '#5a6269  0px 2px 8px', borderRadius: '0.75rem' }}>
            <div style={{ color: 'white' }}>
              <h1><label htmlFor="exampleFormControlTextarea1" className="form-label font">{props.head}</label></h1>
              <textarea className="form-control opacity-50" autoFocus id="exampleFormControlTextarea1" value={text} onKeyDown={handleKey} onChange={changedvalue} style={{ backgroundColor: 'black', color: 'white' }} rows="8"></textarea>
              <div className="form-check mt-3">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked onChange={() => { setOption('knlm') }} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  KN Model
                </label>
              </div>
              <div className="form-check mt-1">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={() => { setOption('transformer') }} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Transformer Model
                </label>
              </div>
              <button type="button" className="button-4 my-3" disabled={(text.trim().length === 0) ? true : false} style={{ cursor: text.trim().length === 0 ? 'not-allowed' : 'pointer' }} onClick={() => show("auto correction")}>Auto Correction</button>
              <button type="button" className="button-4 my-3 mx-4" disabled={(text.trim().length === 0) ? true : false} style={{ cursor: text.trim().length === 0 ? 'not-allowed' : 'pointer' }} onClick={() => show("manual correction")}>Manual Correction</button>
              <div className='text-center'>{loading?<img src ={wait} width="20%" alt="loading" />:<></>}</div>
              {wordArray !== null && correctionType === 'auto correction' && !loading? <div>
                <h5 className='font'>Auto Corrected Output: </h5>
                {fetcheddata['Choices list'].map((element, i) => {
                  return (
                    <span key={i} style={{ color: wordArray[i] === element[0] ? "green" : "red" }}>
                      {element[0] + ' '}
                    </span>
                  )
                }
                )
                }</div> : <></>}

              {wordArray !== null && correctionType === 'manual correction' && !loading ? <div>
                <h5 className='font'>Click on the text to manually correct the sentences.</h5>
                {fetcheddata['Choices list'].map((element, i) => {
                  return (
                    <span key={i} id={`choice${i}`} style={{ color: wordArray[i] === element[0] ? "green" : "red", cursor: "pointer" }} onClick={() => { setChoice(i) }}>
                      {element[0] + ' '}
                    </span>
                  )
                }
                )
                }
                {showChoices()}
              </div> : <></>}
            </div>
          </div>
          :

          <div className="px-5 pt-3 pb-3" style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', borderRadius: '0.75rem' }}>
            <h1><label htmlFor="exampleFormControlTextarea1" className="form-label font">{props.head}</label></h1>
            <textarea className="form-control" autoFocus id="exampleFormControlTextarea1" value={text} onKeyDown={handleKey} onChange={changedvalue} rows="8"></textarea>
            <div className="form-check mt-3">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked onChange={() => { setOption('knlm') }} />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                KN Model
              </label>
            </div>
            <div className="form-check mt-1">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={() => { setOption('transformer') }} />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Transformer Model
              </label>
            </div>
            <button type="button" className="button-4 my-3" disabled={(text.trim().length === 0) ? true : false} style={{ cursor: text.trim().length === 0 ? 'not-allowed' : 'pointer' }} onClick={() => show("auto correction")}>Auto Correction</button>
            <button type="button" className="button-4 my-3 mx-4" disabled={(text.trim().length === 0) ? true : false} style={{ cursor: text.trim().length === 0 ? 'not-allowed' : 'pointer' }} onClick={() => show("manual correction")}>Manual Correction</button>
            <div className='text-center'>{loading?<img src ={wait} width="20%" alt="loading" />:<></>}</div>
            {wordArray !== null && correctionType === 'auto correction'&& !loading ? <div>
              <h5 className='font'>Auto Corrected Output: </h5>
              {fetcheddata['Choices list'].map((element, i) => {
                return (
                  <span key={i} style={{ color: wordArray[i] === element[0] ? "green" : "red" }}>
                    {element[0] + ' '}
                  </span>
                )
              }
              )
              }</div> : <></>}

            {wordArray !== null && correctionType === 'manual correction'&& !loading ? <div>
              <h5 className='font'>Click on the text to manually correct the sentences.</h5>
              {fetcheddata['Choices list'].map((element, i) => {
                return (
                  <span key={i} id={`choice${i}`} style={{ color: wordArray[i] === element[0] ? "green" : "red", cursor: "pointer" }} onClick={() => { setChoice(i) }}>
                    {element[0] + ' '}
                  </span>
                )
              }
              )
              }
              {showChoices()}
            </div> : <></>}
          </div>

      }
    </div >

  )
}
