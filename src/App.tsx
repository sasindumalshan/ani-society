import MainContent from "./view/common/MainContent/MainContent"
import {AuthProvider} from "./connection/AuthContext";

import './css.css'

import {BrowserRouter} from "react-router-dom"


function App() {


    return (
        <AuthProvider>
            <BrowserRouter>
                <MainContent/>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
