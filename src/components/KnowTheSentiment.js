import React,{useState} from 'react'
import { BsArrowRightSquare} from 'react-icons/bs'

export default function KnowTheSentiment(props) {
    const [control,setControl]=useState(null);
    const [fetched,setfetched] = useState(null);

    const [text,settext] = useState("");
    const [display,setdisplay] = useState("Enter something to show the sentiment of the text...");
    const changedvalue =(event)=>{
        settext(event.target.value);
    }

    const handleKey=(e)=>
    {
        if(e.key===" " || e.key==="Enter"){
            const lang='ne';
            const url = `https://www.google.com/inputtools/request?ime=transliteration_en_${lang}&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=${text}`;
            fetch(url)
            .then(res=>res.json()
            .then(data=>{
                settext(data[1][0][1][0]+" ");
            }))
            .catch(err=>console.log(err)); 
    }
    }
  
    const show=()=>{
      
      if (fetched['type']==='Neutral'){
        setdisplay("Type: Neutral");
      } 
      else if(fetched['type']==='Positive'){
        setdisplay("Type: Positive");
      }
      else if(fetched['type']==='Negative'){
        setdisplay("Type: Negative");
      }
      if(control){
        clearTimeout(control);
        setControl(null);
      }

        let x=setTimeout(() => {
          setdisplay("Why don't you try some other text too..."); 
        }, 20000);
        setControl(x);
    postreq();
  }
    const postreq=()=>{
        let url="/api/sentiment-analysis/";
        fetch(url, {
        method: "post",
        mode:'cors',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },

        
        body: JSON.stringify({
            body: text.trim()
        })
        })
        
        .then(response => response.json())
        
        .then(json =>{ 
          setfetched(json)
        })
        .catch(err=>console.log(err));
     }
   
return (
   
    <div>
      {
        props.mode==='dark'?
        <div className="px-5 pt-3 pb-3" style={{boxShadow: '#5a6269  0px 2px 8px',borderRadius: '0.75rem'}}>
          <div style={{color:'white'}}>
              <h1><label htmlFor="exampleFormControlTextarea1" className="form-label font">{props.head}</label></h1>
              <textarea className="form-control opacity-50" autoFocus id="exampleFormControlTextarea1" value={text} onKeyDown={handleKey} onChange={changedvalue}  style={{backgroundColor:'black',color:'white'}} rows="8"></textarea>
              <button type="button" className="button-4 my-3" disabled={text.trim().length===0?true:false} style={{ cursor:text.trim().length===0?'not-allowed':'pointer' }} onClick={show}>Know the Sentiment</button>
            <h1 className='font'>Sentiment:</h1> 
            <p className='font'style={{ fontSize: '20px' }}>{display}</p>
            {fetched===null?<></>:<div>
            {fetched['probabilities'].map((element,i)=>{
            return(
            <div key={i}>
                <div className="progress my-2" style={{height: '4px',width:'80%'}} >
                  <div className="progress-bar bg-info" role="progressbar" style={{width: `${element*100}%`}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div style={{color:'white',float:'right' }}><BsArrowRightSquare/><span className='mx-2'>{element}</span></div>
                <div style={{color:'white'}}>{`${i===0?'Negative':i===1?'Positive':'Neutral'}`}</div>
            </div>)})}</div>}
          </div>
        </div>

        :

        <div className="px-5 pt-3 pb-3" style={{boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',borderRadius: '0.75rem'}}>
            <h1><label htmlFor="exampleFormControlTextarea1" className="form-label font">{props.head}</label></h1>
            <textarea className="form-control" autoFocus id="exampleFormControlTextarea1" value={text} onKeyDown={handleKey} onChange={changedvalue} rows="8"></textarea>
            <button type="button" className="button-4 my-3" disabled={text.trim().length===0?true:false} style={{ cursor:text.trim().length===0?'not-allowed':'pointer' }} onClick={show}>Know the Sentiment</button>
           <h1 className='font'>Sentiment:</h1> 
           <p className='font' style={{ fontSize: '20px' }}>{display}</p>
           {fetched===null?<></>:<div>
            {fetched['probabilities'].map((element,i)=>{
            return(
            <div key={i}>
                <div className="progress my-2" style={{height: '4px',width:'80%'}} >
                  <div className="progress-bar bg-info" role="progressbar" style={{width: `${element*100}%`}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div style={{color:'black',float:'right' }}><BsArrowRightSquare/><span className='mx-2'>{element}</span></div>
                <div>{`${i===0?'Negative':i===1?'Positive':'Neutral'}`}</div>
            </div>)})}</div>}
        </div>
}
    </div>
    
  )
}
