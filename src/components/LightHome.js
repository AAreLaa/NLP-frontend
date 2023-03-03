import React from 'react'
import { FaBeer} from 'react-icons/fa';
import { AiFillQuestionCircle} from 'react-icons/ai';
import {MdLocalOffer,MdSentimentVerySatisfied,MdOutlineGeneratingTokens} from 'react-icons/md'
import Card from './Card';
export default function LightHome() {
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
                <Card icon={MdSentimentVerySatisfied}></Card>
            </div>
            <div className="col-md-3">
                <Card icon={AiFillQuestionCircle}></Card>
            </div>
            <div className="col-md-3">
                <Card icon={MdOutlineGeneratingTokens}></Card>
            </div>
            <div className="col-md-3">
                <Card icon={FaBeer}></Card>
            </div>
        </div>
        </>
        
      )
    }
    
