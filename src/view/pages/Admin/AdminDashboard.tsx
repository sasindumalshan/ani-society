import logo from "../../../image/logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link,Outlet} from "react-router-dom";
import Animal from "./Animal";
import Users from "./Users";
import Complaint from "./Complaint";
import NoAcess from "../NoAcess";


function AdminDashboard() {
    try {
        if (localStorage.getItem("role")=="admin"){
            return (
                <>
                    <section className='flex bg-white'>
                        <div className='flex w-64 flex-col shadow-lg'>
                            <a href="" className='inline p-10' >
                                <img src={logo} alt="logo" />
                            </a>
                            <Link to='home'>
                                <button  className='h-12 text-left pl-10 pb-5 font-bold text-[16px] text-slate-700'>Home</button>
                            </Link>
                            <Link to='animal'>
                                <button  className='h-12 text-left pl-10 pb-5 font-bold text-[16px] text-slate-700'>Animals</button>
                            </Link>
                            <Link to='user'>
                                <button className='h-12 text-left pl-10 pb-5 font-bold text-[16px] text-slate-700'>Users</button>
                            </Link>
                            <Link to='compliant/view'>
                                <button className='h-12 text-left pl-10 pb-5 font-bold text-[16px] text-slate-700'>Complaint</button>
                            </Link>
                            <Link to='orders'>
                                <button className='h-12 text-left pl-10 pb-5 font-bold text-[16px] text-slate-700'>Orders</button>
                            </Link>
                        </div>
                        <div className='flex-1 '>
                            <Outlet ></Outlet>
                        </div>
                    </section>
                </>
            )
        }else {
            return (<NoAcess></NoAcess>)
        }
    }catch (e){
        return (<NoAcess></NoAcess>)
    }



}

export default AdminDashboard;