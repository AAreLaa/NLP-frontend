import React from 'react'


export default function Card(props) {
  return (
    <div>
            <div className="card text-center" style={{ width: '18rem' }}>
            <div className="card-body ">
              <span style={{ fontSize:'50px' }}><props.icon/></span>
              <h5 className="card-title mt-4">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="/" className="btn btn-primary">Go somewhere</a>
            </div>
            </div>
    </div>
  )
}
