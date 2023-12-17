import React, { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Navbar(props) {

    const [active, setActive] = useState('click1');



    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
                <div className="container-fluid font">
                    <Link onClick={() => setActive('click1')} className="navbar-brand" to="/">{props.title}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item mx-1">
                                <Link onClick={() => setActive('click1')} className={`nav-link ${props.mode} active ${active === 'click1' ? props.mode + '-active' : ''} `} aria-current="page" to="/">{props.title1}</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link onClick={() => setActive('click2')} className={`nav-link ${props.mode} active ${active === 'click2' ? props.mode + '-active' : ''}`} to="/Transformers" >{props.title2}</Link>
                            </li>
                            {/* <li className="nav-item mx-1">
                                <Link onClick={() => setActive('click3')} className={`nav-link ${props.mode} active ${active === 'click3' ? props.mode + '-active' : ''}`} to="/ProbableWords" >{props.title3}</Link>
                            </li> */}
                            {/* <li className="nav-item mx-1">
                                <Link onClick={() => setActive('click4')} className={`nav-link ${props.mode} active ${active === 'click4' ? props.mode + '-active' : ''}`} to="/KnowTheSentiment" >{props.title4}</Link>
                            </li> */}
                            {/* <li className="nav-item mx-1">
                                <Link onClick={() => setActive('click5')} className={`nav-link ${props.mode} active ${active === 'click5' ? props.mode + '-active' : ''}`} to="/WordEmbeddings" >{props.title5}</Link>
                            </li> */}
                            <li className="nav-item mx-1">
                                <Link onClick={() => setActive('click6')} className={`nav-link ${props.mode} active ${active === 'click6' ? props.mode + '-active' : ''}`} to="/SpellChecker" >{props.title6}</Link>
                            </li>
                        </ul>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" onClick={props.toggle} id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Toggle Modes</label>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

