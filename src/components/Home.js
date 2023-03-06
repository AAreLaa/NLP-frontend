import React from 'react'
import DarkHome from './DarkHome'
import LightHome from './LightHome'

export default function Home(props) {


  return (
    <>
      {props.mode === "light" ? <LightHome /> : <DarkHome />}
    </>

  )
}
