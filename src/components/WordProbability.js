import React, { useState } from 'react'
import { BsArrowRightSquare } from 'react-icons/bs'
export default function WordProbability(props) {

    const [fetcheddata, setfetcheddata] = useState({ "Predicted Tokens": [['', 0]] });
    const [control, setControl] = useState(null);
    const [visi, setvisi] = useState(0);
    const [text, settext] = useState("");
    const [display, setdisplay] = useState("Enter something to show you some probable words...");
    const changedvalue = (event) => {
        settext(event.target.value);
        console.log(event.target.value);
        console.log(text)
    }

    const handleKey = (e) => {
        if (e.key === " " || e.key === "Enter") {
            const lang = 'ne';
            const url = `https://www.google.com/inputtools/request?ime=transliteration_en_${lang}&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=${text}`;
            fetch(url)
                .then(res => res.json()
                    .then(data => {
                        settext(data[1][0][1][0] + " ");
                    }))
                .catch(err => console.log(err));
        }
    }

    const show = () => {
        setdisplay("Here are some probable words for you...");
        if (control) {
            clearTimeout(control);
            setControl(null);
        }

        let x = setTimeout(() => {
            setdisplay("Try some other text as well...");
        }, 12000);
        setControl(x);

        postreq();
    }

    const postreq = () => {
        console.log("post", text)

        let url = "/api/n-gram/";
        fetch(url, {
            method: "post",
            mode: 'cors',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },


            body: JSON.stringify({
                body: text.trim(),
                n_from_ngram: 0
            })
        })

            .then(response => response.json())

            .then(json => {
                setfetcheddata(json);
                setvisi(1);
            })
            .catch(err => console.log(err))
    }



    return (
        <div className="container my-3">

            {props.mode === "dark" ?
                <div>
                    <div className="mb-3">
                        <div className="px-5 pt-3 pb-3" style={{ boxShadow: '#5a6269  0px 2px 8px', borderRadius: '0.75rem' }}>
                            <h1><label htmlFor="exampleFormControlTextarea1" className="form-label font" style={{ color: 'white' }}>{props.head}</label></h1>
                            <textarea className="form-control opacity-50" autoFocus id="exampleFormControlTextarea1" value={text} onChange={changedvalue} onKeyUp={handleKey} style={{ backgroundColor: 'black', color: 'white' }} rows="8"></textarea>
                            <button type="button" className="button-4 my-3" disabled={text.trim().length === 0 ? true : false} style={{ cursor: text.trim().length === 0 ? 'not-allowed' : 'pointer' }} onClick={show}>Check Next Word Probability</button>
                            <h1 className='font' style={{ color: 'white' }}>Probable Words Preview:</h1>
                            <p className='font' style={{ fontSize: '20px', color: 'white' }}>{display}</p>
                            {visi ?
                                <div>
                                    <h4 className="font" style={{ color: 'white' }}>In Table:</h4>
                                    <table className="table table-hover table-striped table-bordered border-primary" style={{ width: '40%' }}>
                                        <thead>
                                            <tr className='table-dark table-bordered border-dark-subtle'>
                                                <th scope="col">SN</th>
                                                <th scope="col">Next Probable Words</th>
                                                <th scope="col">Probability</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fetcheddata['Predicted Tokens'].map((element, i) => {
                                                return (
                                                    <tr key={i} className='table-info table-bordered border-dark'>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{element[0]}</td>
                                                        <td>{(element[1] * 100).toFixed(4) + '%'}</td>
                                                    </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                </div> : <></>}
                            {visi ? <div>
                                <h4 className="font" style={{ color: 'white' }}>Visualization:</h4>
                                {fetcheddata['Predicted Tokens'].map((element, i) => {
                                    return (
                                        <div key={i}>
                                            <div className="progress my-2" style={{ height: '4px', width: '80%' }} >
                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${(element[1] * 10000).toFixed(4)}%` }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div style={{ color: 'white', float: 'right' }}><BsArrowRightSquare /><span className='mx-2'>{(element[1] * 100).toFixed(4)} %</span></div>
                                            <div style={{ color: 'white' }}>{element[0]}</div>
                                        </div>)
                                })}</div> : <></>}
                        </div>
                    </div>
                </div>

                :

                <div>
                    <div className="mb-3" >
                        <div className="px-5 pt-3 pb-3" style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', borderRadius: '0.75rem' }}>
                            <h1><label htmlFor="exampleFormControlTextarea1" className="form-label font">{props.head}</label></h1>
                            <textarea className="form-control" autoFocus id="exampleFormControlTextarea1" value={text} onChange={changedvalue} onKeyUp={handleKey} rows="8"></textarea>
                            <button type="button" className="button-4 my-3 mt-3" disabled={text.trim().length === 0 ? true : false} style={{ cursor: text.trim().length === 0 ? 'not-allowed' : 'pointer' }} onClick={show}>Check Next Word Probability</button>

                            <div className="mt-2" >
                                <h1 className='font'>Probable Words Preview:</h1>
                                <p className='font' style={{ fontSize: '20px' }}>{display}</p>
                                {visi ?
                                    <div>
                                        <h4 className="font">In Table:</h4>
                                        <table className="table table-hover table-striped table-bordered border-primary" style={{ width: '40%' }}>
                                            <thead>
                                                <tr className='table-dark table-bordered border-dark-subtle'>
                                                    <th scope="col">SN</th>
                                                    <th scope="col">Next Probable Words</th>
                                                    <th scope="col">Probability</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {fetcheddata['Predicted Tokens'].map((element, i) => {
                                                    return (
                                                        <tr key={i} className='table-info table-bordered border-dark'>
                                                            <th scope="row">{i + 1}</th>
                                                            <td>{element[0]}</td>
                                                            <td>{(element[1] * 100).toFixed(4) + '%'}</td>
                                                        </tr>)
                                                })}
                                            </tbody>
                                        </table>
                                    </div> : <></>}
                                {visi ? <div>
                                    <h4 className="font">Visualization:</h4>
                                    {fetcheddata['Predicted Tokens'].map((element, i) => {
                                        return (
                                            <div key={i}>
                                                <div className="progress my-2" style={{ height: '4px', width: '80%' }} >
                                                    <div className="progress-bar bg-info" role="progressbar" style={{ width: `${(element[1] * 10000).toFixed(4)}%` }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <div style={{ color: 'black', float: 'right' }}><BsArrowRightSquare /><span className='mx-2'>{(element[1] * 100).toFixed(4)} %</span></div>
                                                <div >{element[0]}</div>
                                            </div>)
                                    })}</div> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
