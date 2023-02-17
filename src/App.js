import './App.css';
import React from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import ToNepali from './components/ToNepali';
import WordProbability from './components/WordProbability';
import KnowTheSentiment from './components/KnowTheSentiment';
import WordEmbeddings from './components/WordEmbeddings';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  document.body.style.backgroundColor = '#443c52'
  return (
   <>
   <Router>
   <Navbar title = "NLP-Web" title1 = "Home" title2 = "Translate To Nepali" title3="Probable Words" title4="Know The Sentiment" title5="Word Embeddings"/>
   <div className="container my-3">
   <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/ToNepali" element={<ToNepali head = 'Enter the text to translate it to Nepali'/>}/>
          <Route path="/ProbableWords" element={<WordProbability head = 'Enter the text to see the next probable words'/>}/>
          <Route path="/KnowTheSentiment" element={<KnowTheSentiment head = 'Enter the text to see its Sentiment'/>}/>
          <Route path="/WordEmbeddings" element={<WordEmbeddings head = 'Enter the text to see its Sentiment'/>}/>
        </Routes>   
   </div>
   </Router>
   </>
  );
}

export default App;
