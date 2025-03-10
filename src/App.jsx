import React from "react"
import Header from "./components/Header"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"
import Footer from "./components/Footer"
import Jobs from "./components/Jobs/Jobs"
import Requirements from "./components/Requirements/Requirements"

function App() {
  
  return (
    <Router>
      <div className="fixed w-full top-0 bg-white shadow-md z-50">
        <Header />
      </div>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/jobs" element={<Jobs />}/>
        <Route path="/requirements" element={<Requirements />}/>
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
