import './App.css';
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import Navbar from './components/Navbar';
import Home from './components/Home';
import WordProbability from './components/WordProbability';
import KnowTheSentiment from './components/KnowTheSentiment';
import WordEmbeddings from './components/WordEmbeddings';
import background from './images/bkg.gif';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Transformers from './components/Transformers';

function App() {
  
  const [mode,setMode]=useState("light");
  const toggle=()=>{
      if(mode==='light')
      {
        document.body.style.backgroundColor = 'Black'
        document.body.style.backgroundImage= `url(${background})`
        setMode('dark')
        console.log(mode)
      }
      else
      {
        document.body.style.backgroundImage= 'None'
        document.body.style.backgroundColor = 'White'
        setMode('light')
      }
  }
  return (
   <>
   <Router>
   <Navbar toggle={toggle} mode={mode} title = "NLP-Web" title1 = "Home" title2 = "Transformers" title3="Probable Words" title4="Sentiment Analysis" title5="Word Embeddings"/>
   <div className="container my-3">
   <Routes>
          <Route path="/" element={<Home mode={mode}/>}/>
          <Route path="/Transformers" element={<Transformers mode={mode} head = 'Enter the text to translate it to Nepali'/>}/>
          <Route path="/ProbableWords" element={<WordProbability mode={mode} head = 'Enter the text to see the next probable words'/>}/>
          <Route path="/KnowTheSentiment" element={<KnowTheSentiment mode={mode}  head = 'Enter the text to see its Sentiment'/>}/>
          <Route path="/WordEmbeddings" element={<WordEmbeddings mode={mode} head = 'Enter the text to see its Sentiment'/>}/>
        </Routes>   
   </div>
   </Router>
   </>
  );
}

export default App;
