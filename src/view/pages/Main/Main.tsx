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

function Main() {
       return(
               <>
               <Home/>
                   <Outlet context={Register}></Outlet>
                   <Outlet context={Login}></Outlet>
               <How/>
               <Pet/>
               <Complaint/>
               </>
       )        
}
export default Main;