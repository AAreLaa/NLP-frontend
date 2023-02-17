import React,{useState} from 'react'

export default function WordProbability(props) {

    const [fetcheddata,setfetcheddata] = useState({"Predicted Tokens":[['',0]]});
    const [control,setControl]=useState(null);
 
    const [visi,setvisi] = useState(1);
    const [text,settext] = useState("");
    const [display,setdisplay] = useState("Enter something to show you some probable words...");
    const changedvalue =(event)=>{
        settext(event.target.value);
    }
    const show=()=>{
        setdisplay("Here are some probable words for you..."); 
        setvisi(0);
        if(control){
            clearTimeout(control);
            console.log(control)
            setControl(null);
        }
        
        let x=setTimeout(() => {
            setdisplay("Try some other text as well..."); 
        }, 12000);
        setControl(x);

    postreq();
  }
    const postreq=()=>{
        let url="/api/n-gram/";
        fetch(url, {
        method: "post",
        mode:'cors',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },

        
        body: JSON.stringify({
            body: text.trim(),
            n_from_ngram: 0
        })
        })
        
        .then(response => response.json())
        
        .then(json =>{ 
        console.log(json)
        setfetcheddata(json)})
        .catch(err=>console.log(err))
     }

return (
   
    <div>
        <div className="mb-3" style={{color:'white'}}>
            <h1><label htmlFor="exampleFormControlTextarea1" className="form-label font">{props.head}</label></h1>
            <textarea className="form-control opacity-50" id="exampleFormControlTextarea1" value={text} onChange={changedvalue}  style={{backgroundColor:'#443c52',color:'white'}} rows="8"></textarea>
            <button type="button" className="btn btn-light my-3" disabled={text.trim().length===0?true:false} onClick={show}>Check Next Word Probability</button>
           <h1 className='font'>Probable Words Preview:</h1> 
           <p className='font'style={{ fontSize: '20px' }}>{display}</p>

            <table className="table table-hover table-striped table-bordered border-primary" style={{width:'40%',visibility:visi?'hidden':'visible'}}>
            <thead>
                <tr className='table-dark table-bordered border-dark-subtle'>
                <th scope="col">SN</th>
                <th scope="col">Next Probable Words</th>
                <th scope="col">Probability</th>
                
                </tr>
            </thead>
            <tbody>
            {fetcheddata['Predicted Tokens'].map((element,i)=>{
                return(
                <tr key={i} className='table-info table-bordered border-dark'>
                <th scope="row">{i+1}</th>
                <td>{element[0]}</td>
                <td>{element[1].toFixed(7)*100+'%'}</td>
                </tr>)
        
    })}
            </tbody>
            </table>
        </div>
    </div>
    
  )
}
