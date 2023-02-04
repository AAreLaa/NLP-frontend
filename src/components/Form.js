import React from 'react'

export default function Form(props) {
  return (
    <div>
        <div className="mb-3" style={{color:'white'}}>
            <h1><label htmlFor="exampleFormControlTextarea1" className="form-label">{props.head}</label></h1>
            <textarea className="form-control" id="exampleFormControlTextarea1" style={{backgroundColor:'#443c52',color:'white'}} rows="10"></textarea>
        </div>
    </div>
  )
}
