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
import Home from "../../pages/Admin/Home";
import DonationForm from "../DonationForm";
import CompliantDescription from "../../pages/Admin/CompliantDescription";
import Orders from "../../pages/Admin/Orders";
import NotFound from "../../pages/NotFound";
function MainContent() {
    return (
    <Routes>
        <Route path="/" Component={Main}>
            <Route path="register" Component={Register}/>
            <Route path="signin" Component={Login}/>
            <Route path="from" Component={ComplaintFrom}/>
            <Route path="/donation" Component={DonationForm}></Route>
        </Route>
        <Route path="/pets" Component={PetsPage}></Route>
        <Route path="/admin" Component={ AdminDashboard}>
            <Route path='animal' Component={Animal}></Route>
            <Route path='user' Component={Users}></Route>
            <Route path='home' Component={Home}></Route>
            <Route path='orders' Component={Orders}></Route>
            <Route path='compliant' Component={Complaint}>
                <Route path='detail' Component={ComplaintData}></Route>
                <Route path='view' Component={CompliantDescription}></Route>
            </Route>
        </Route>
        <Route path="*" Component={NotFound}></Route>
    </Routes>
    );
}

export default MainContent;