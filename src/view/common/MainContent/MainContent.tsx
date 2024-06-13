import { Route, Routes } from "react-router-dom";
import Main from "../../pages/Main/Main";
import PetsPage from "../../pages/PetsPage/PetsPage";
import ComplaintFrom from "../../pages/ComplaintFrom/ComplaintFrom";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
function MainContent() {
    return (
    <Routes>
        <Route path="/" Component={Main}>
            <Route path="register" Component={Register}/>
            <Route path="signin" Component={Login}/>
            <Route path="from" Component={ComplaintFrom}/>
        </Route>
        <Route path="/pets" Component={PetsPage}></Route>
    </Routes>

    //<Main></Main>
    
    );
}

export default MainContent;