import logo from "../../../image/logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link,Outlet} from "react-router-dom";
import Animal from "./Animal";
import Users from "./Users";
import Complaint from "./Complaint";


function AdminDashboard() {

    return (
      <>
          <section className='flex bg-white'>
              <div className='flex w-64 flex-col shadow-lg'>
                  <a href="" className='inline p-10' >
                      <img src={logo} alt="logo" />
                  </a>
                  <Link to='animal'>
                      <button  className='h-12 text-left pl-10 pb-5 font-bold text-[16px] text-slate-700'>Animals</button>
                  </Link>
                  <Link to='user'>
                      <button className='h-12 text-left pl-10 pb-5 font-bold text-[16px] text-slate-700'>Users</button>
                  </Link>
                  <Link to='compliant'>
                      <button className='h-12 text-left pl-10 pb-5 font-bold text-[16px] text-slate-700'>Complaint</button>
                  </Link>
              </div>
              <div className='flex-1 '>
                  <Outlet ></Outlet>
              </div>
          </section>
      </>
    )
}

export default AdminDashboard;