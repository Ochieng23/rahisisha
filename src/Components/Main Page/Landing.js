import React from 'react'
import NavPanel from '../Landingpage/NavPanel'
import Welcome from '../Landingpage/Welcome'
import Jobs from '../Landingpage/Jobs'
import Topics from '../Landingpage/Topics'
import Post from '../Landingpage/Post'
import Testimonals from '../Landingpage/Testimonals'
import Connect from '../Landingpage/Connect'
import Join from '../Landingpage/Join'
import Footer from '../Landingpage/Footer'
import Footersection from '../Landingpage/Footersection'

const Landing = () => {
  return (
    <>
        <NavPanel />
        <Welcome />
        <Jobs />
        <Topics />
        <Post />
        {/* <Testimonals /> */}
        <Connect /> 
        <Join />
        <Footer />
        <Footersection />
    </>
  )
}

export default Landing