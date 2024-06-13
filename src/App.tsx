import Footer from "./view/common/Footer/Footer"
import Header from "./view/common/Header/Header"
import MainContent from "./view/common/MainContent/MainContent"
import Main from "./view/pages/Main/Main"

import './css.css'

import { BrowserRouter } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <MainContent/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
