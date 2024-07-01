import img from "../../image/Home-img.svg";
import homeAni from "../../image/homeAni.png";
import {Link} from "react-router-dom";
import React from "react";

function NoAcess() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#F9F5E4]">
            <img className='h-[400px] mb-12' src={homeAni} alt="" />
            <p className="text-[95px] font-extrabold h-[85px] text-[#53524D]">This Page Can Access Only Admin</p>
            <Link to='/'>
                <button className='mt-[100px]'> Go to Home</button>
            </Link>
        </div>
    );

}
export default NoAcess;