import './App.css';
import Navbar from './components/Navbar';
import Form from './components/Form';

function App() {
  document.body.style.backgroundColor = '#443c52'
  return (
   <>
   <Navbar title = "NLP-Web" title1 = "Home" title2 = "About" />
   <div className="container my-3">
   <Form head = 'Enter the text to analyze'/>
   </div>
   </>
  );
}

export default App;
