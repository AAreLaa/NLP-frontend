import React from 'react'
import {Link} from 'react-router-dom'
export default function Navbar(props) {
  return (
    <div>
       
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">{props.title1}</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/ToNepali" >{props.title2}</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/ProbableWords" >{props.title3}</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/KnowTheSentiment" >{props.title4}</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/WordEmbeddings" >{props.title5}</Link>
            </li>
            {/* <li className="nav-item dropdown">  
            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
            </a>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/">Action</a></li>
                <li><a className="dropdown-item" href="/">Another action</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="/">Something else here</a></li>
            </ul>
            </li>
            <li className="nav-item">
            <a className="nav-link disabled" href="/">Disabled</a>
            </li> */}
        </ul>
        
        </div>
        </div>
        </nav> 
  </div>
  )
}

