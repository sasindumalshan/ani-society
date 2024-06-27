import { Route, Routes } from "react-router-dom";
import Main from "../../pages/Main/Main";
import PetsPage from "../../pages/PetsPage/PetsPage";
import ComplaintFrom from "../../pages/ComplaintFrom/ComplaintFrom";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import AdminDashboard from "../../pages/Admin/AdminDashboard";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Animal from "../../pages/Admin/Animal";
import Users from "../../pages/Admin/Users";
import Complaint from "../../pages/Admin/Complaint";
import ComplaintData from "../../pages/Admin/ComplaintData";
function MainContent() {
    return (
    <Routes>
        <Route path="/" Component={Main}>
            <Route path="register" Component={Register}/>
            <Route path="signin" Component={Login}/>
            <Route path="from" Component={ComplaintFrom}/>
        </Route>
        <Route path="/pets" Component={PetsPage}></Route>
        <Route path="/admin" Component={ AdminDashboard}>
            <Route path='animal' Component={Animal}></Route>
            <Route path='user' Component={Users}></Route>
            <Route path='compliant' Component={Complaint}>
                <Route path='detail' Component={ComplaintData}></Route>
            </Route>
        </Route>
    </Routes>
    );
}

export default MainContent;