import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ComplaintData() {
    const initialComplaint = {
        "_id": "",
        "contact": "",
        "street": "",
        "lane": "",
        "city": "",
        "user": "",
        "description": "",
        "file": "",
        "__v": 0,
        "base64Image": ""
    };

    const [complaints, setComplaints] = useState(initialComplaint);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/complaint/complaint-details/${localStorage.getItem("id")}`);
                setComplaints(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <section className='flex flex-row gap-4 ml-[40px] mt-[20px] shadow p-6'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col flex-wrap w-[500px]'>
                        <span className='font-bold'>Description</span>
                        <span>{complaints.description}</span>
                    </div>
                    <div className='flex flex-col flex-wrap w-[500px]'>
                        <span className='font-bold'>Contact Number</span>
                        <span>{complaints.contact}</span>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col flex-wrap w-[500px]'>
                        <span className='font-bold'>User</span>
                        <span>{complaints.user}</span>
                    </div>
                    <div className='flex flex-col flex-wrap w-[500px]'>
                        <span className='font-bold'>Location</span>
                        <span>{complaints.city +", "+complaints.lane+", "+complaints.street}</span>
                    </div>
                </div>
                <div className='w-[300px] h-[300px] rounded-lg shadow'>
                    {complaints.base64Image && (
                        <img src={complaints.base64Image} alt="Complaint" className='w-full h-full object-cover' />
                    )}
                </div>
            </section>
            <div className='flex justify-end px-[40px] pt-[20px]'>
                <Link to='/admin/compliant/view'>
                    <button type="submit" className="w-[300px] text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Cancel</button>
                </Link>
            </div>
        </>
    );
}

export default ComplaintData;
