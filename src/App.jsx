import React from "react"
import Header from "./components/Header"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"
import Footer from "./components/Footer"
import Jobs from "./components/Jobs/Jobs"
import Requirements from "./components/Requirements/Requirements"
import Contact from "./components/Contact/Contact"
import { ToastContainer } from "react-toastify"
import JobsAdmin from "./components/Admin/JobsAdmin"
import ReqAdmin from "./components/Admin/ReqAdmin"

function App() {
  
  return (
    <Router>
      <ToastContainer />
      <div className="min-h-screen flex flex-col justify-between">
        <div className="fixed w-full top-0 bg-white shadow-md z-50">
          <Header />
        </div>

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/jobs" element={<Jobs />}/>
          <Route path="tomodachi/jobs" element={<JobsAdmin />}/>
          <Route path="/requirements" element={<Requirements />}/>
          <Route path="tomodachi/requirements" element={<ReqAdmin />}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
