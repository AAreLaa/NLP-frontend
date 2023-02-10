import React,{useState} from 'react'

export default function Form(props) {
  let demo ={
    "Predicted Tokens": [
        [
            "जलस्रोत",
            0.000371089642888067
        ],
        [
            "र",
            0.00016080551191816238
        ],
        [
            "क्षेत्रमा",
            0.00016080551191816238
        ],
        [
            "संकट",
            0.00013606620239229122
        ],
        [
            "मन्त्री",
            8.658758334054896e-05
        ]
    ]
};
 
  const [visi,setvisi] = useState(1);
  const [text,settext] = useState("");
  const [display,setdisplay] = useState("Nothing to show right now...");
  const changedvalue =(event)=>{
    settext(event.target.value);
  }

  const show=()=>{
    setdisplay("Button clicked"); 
    setvisi(0);
    setTimeout(() => {
        setdisplay("Nothing to show right now..."); 
        setvisi(0);
    }, 3000);
    }

    // for (const key in demo) {
    //     console.log(`${key} -> ${demo[key]}`)
    //     console.log(`${demo[key]}`);
    //     demo[key].map((element)=>{
    //         console.log(element);
    //     })
    // }
    // demo['Predicted Tokens'].map((element)=>{
    //     console.log(element);
    // })
   
return (
   
    <div>
        <div className="mb-3" style={{color:'white'}}>
            <h1><label htmlFor="exampleFormControlTextarea1" className="form-label">{props.head}</label></h1>
            <textarea className="form-control" id="exampleFormControlTextarea1" value={text} onChange={changedvalue}  style={{backgroundColor:'#443c52',color:'white'}} rows="10"></textarea>
            <button type="button" className="btn btn-light my-3" onClick={show}>Check Next Word Probability</button>
           <h1>Probable Words Preview:</h1> 
           <p>{display}</p>

            <table className="table table-hover table-striped table-bordered border-primary" style={{width:'40%',visibility:visi?'hidden':'visible'}}>
            <thead>
                <tr className='table-dark table-bordered border-dark-subtle'>
                <th scope="col">SN</th>
                <th scope="col">Next Probable Words</th>
                <th scope="col">Probability</th>
                
                </tr>
            </thead>
            <tbody>
            {demo['Predicted Tokens'].map((element,i)=>{
                return(
                <tr key={i} className='table-info table-bordered border-dark'>
                <th scope="row">{i+1}</th>
                <td>{element[0]}</td>
                <td>{element[1].toFixed(6)*100+'%'}</td>
                </tr>)
        
    })}
            </tbody>
            </table>
        </div>
    </div>
    
  )
}
