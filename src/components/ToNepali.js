import React,{useState} from 'react'

export default function Form(props) {

  const [text,settext] = useState("");
  const [display,setdisplay] = useState("Enter something to translate to...");
  const changedvalue =(event)=>{
    settext(event.target.value)
  }

  let apiUrl =`https://api.mymemory.translated.net/get?q=${text}!&langpair=en-GB|ne-NP`
  const translate=()=>{
    fetch(apiUrl).then(res=>res.json().then(data=>{
      console.log(data);
      setdisplay(data.responseData.translatedText);
    }))
  }

  return (
   
    <div>
        <div className="mb-3" style={{color:'white'}}>
            <h1><label htmlFor="exampleFormControlTextarea1" className="font form-label">{props.head}</label></h1>
            <textarea className="form-control opacity-50" id="exampleFormControlTextarea1" value={text} onChange={changedvalue}  style={{backgroundColor:'#443c52',color:'white'}} rows="8"></textarea>
            <button type="button" className="btn btn-light my-3" onClick={translate}>Translate to Nepali</button>
           <h1 className='font'>In Nepali Preview:</h1> 
           <p className='font'style={{ fontSize: '20px' }}>{display}</p>
        </div>
    </div>
    
  )
}
