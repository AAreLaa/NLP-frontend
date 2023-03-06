import React from 'react'
import { FaBeer } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md'
import Card from './Card';
import { contents } from './CardContent.js';
import Footer from './Footer';
export default function DarkHome() {
  const heading = {
    fontSize: '50px',
    fontWeight: "700",
    fontFamily: 'Arial',
    color: 'white'
  }
  return (
    <>
      <div className="container my-3">
        <div className="container" style={{ paddingBlock: "15rem", textAlign: 'center' }}>
          <span style={heading}>Nepali Language Processing </span>
          <p style={{ fontFamily: 'cursive', fontSize: '20px', color: 'white' }} >Find everything in a single place  <FaBeer /></p>
        </div>

        <div className="container my-5" style={{ textAlign: 'center' }}>
          <span style={heading} >What We Offer  <MdLocalOffer /></span>
        </div>
        <div className="row my-3">

          {contents.map((element) => {
            return (
              <div key={element.title} className="col-md-4 my-3">
                <Card icon={element.icon} title={element.title} text={element.text}></Card>
              </div>)
          })}
        </div>
      </div>
      <Footer />

    </>

  )
}
