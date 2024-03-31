import React from 'react'
import './App.css'
import { Navbar, Footer, Welcome, Transactions, Services } from './components'
const App = () => {
  return (
    <>
      <div className="screen">
        <Navbar />
        <Welcome/>
        <Services/>
        <Transactions/>
        <Footer/>
      </div>
    </>
  )
}

export default App
