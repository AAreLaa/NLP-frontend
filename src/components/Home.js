import React from 'react'
import { FaBeer} from 'react-icons/fa';
import {MdLocalOffer } from 'react-icons/md'
export default function Home(props) {
  console.log(props.mode)
  
  const heading={
    fontSize:'50px',
    fontWeight:"700",
    fontFamily:'Arial',
  }

  return (
    <>

    <div className="container" style={{ paddingBlock:"15rem", textAlign:'center' }}>
      <span style={heading}>Nepali Language Processing </span>
      <p style={{ fontFamily:'cursive',fontSize:'20px',color:'GrayText'}} >Find everything in a single place  <FaBeer/></p>
    </div>

    <div className="container my-5" style={{ textAlign:'center' }}>
      <span style={heading} >What We Offer  <MdLocalOffer/></span>
    </div>

    <div className="row ">
      <div className="col-md-3">
        <div class="card text-center" style={{ width: '18rem' }}>
        <div class="card-body ">
          <FaBeer/>
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="/" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
      </div>
      <div className="col-md-3">
        <div class="card text-center" style={{ width: '18rem' }}>
        <div class="card-body ">
          <FaBeer/>
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="/" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
      </div>
      <div className="col-md-3">
        <div class="card text-center" style={{ width: '18rem' }}>
        <div class="card-body ">
          <FaBeer/>
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="/" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
      </div>
      <div className="col-md-3">
        <div class="card text-center" style={{ width: '18rem' }}>
        <div class="card-body ">
          <FaBeer/>
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="/" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
      </div>
    
    
    </div>
    </>
    
  )
}
