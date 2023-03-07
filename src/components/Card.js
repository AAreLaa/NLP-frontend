import React from 'react'


export default function Card(props) {
  return (
    <div>
      <div className="card text-center pb-4" style={{ width: '18rem' }}>
        <div className="card-body " >
          <span style={{ fontSize: '50px' }}><props.icon /></span>
          <h5 className="card-title mt-4">{props.title}</h5>
          <p className="card-text">{props.text}</p>
        </div>
      </div>
    </div>
  )
}
