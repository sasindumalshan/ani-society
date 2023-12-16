import AnimalCard from "../../common/AnimalCard/AnimalCard";
import Complaint from "../Complaint/Complaint";
import Home from "../Home/Home";
import How from "../How/How";
import PetsPage from "../PetsPage/PetsPage";
import Pet from "../Pet/Pet";

function Main() {
       return(
               <>
               <Home/>
               <How/>
               <Pet/>
               <Complaint/>
               {/* <PetsPage/> */}
               </>
       )        
}
export default Main;