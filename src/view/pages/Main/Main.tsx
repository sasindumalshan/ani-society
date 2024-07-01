import AnimalCard from "../../common/AnimalCard/AnimalCard";
import Complaint from "../Complaint/Complaint";
import Home from "../Home/Home";
import How from "../How/How";
import PetsPage from "../PetsPage/PetsPage";
import Pet from "../Pet/Pet";
import ComplaintFrom from "../ComplaintFrom/ComplaintFrom";
import Register from "../Register";
import {Outlet} from "react-router-dom";
import Login from "../Login";
import Header from "../../common/Header/Header";
import MainContent from "../../common/MainContent/MainContent";
import Footer from "../../common/Footer/Footer";

function Main() {
       return(
               <>
                   <Header/>
               <Home/>
                   {/*<Outlet context={Register}></Outlet>*/}
                   {/*<Outlet context={Login}></Outlet>*/}
               <How/>
               <Pet/>
               <Complaint/>
                   <Footer/>
               </>
       )        
}
export default Main;