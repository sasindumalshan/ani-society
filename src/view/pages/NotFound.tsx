import React from 'react';
import {Link} from "react-router-dom";
import homeAni from "../../image/homeAni.png";
import img from "../../image/Home-img.svg";

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#F9F5E4]">
            <img className='h-[400px] mb-12' src={homeAni} alt="" />
            <h1 className="text-4xl font-bold text-red-500">404</h1>
            <p className="text-[95px] font-extrabold h-[85px] text-[#53524D]">Page Not Found</p>
            <Link to='/'>
                <button className='mt-[100px]'> Go to Home</button>
            </Link>
        </div>
    );
};

export default NotFound;
