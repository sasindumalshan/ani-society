import {Link, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function Complaint() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page] = useState(5); // Number of animals to display per page
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/complaint/comp?page=${currentPage}&limit=${page}`);
                setComplaints(response.data.complaints);
                console.log(response)
                setTotalPages(response.data.total/page);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchComplaints();
    }, [currentPage,page]);

    function vewData(id) {
        localStorage.setItem("id", id);
        // alert(localStorage.getItem("id"))
    }




    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (<>
        <section>
            <div className='flex flex-col items-start h-screen'>
                <div className='w-100 p-10 font-bold text-[20px] pb-0'>Complaint</div>
                <Outlet></Outlet>
                <div className='w-100 flex  justify-center pl-[40px] pr-[40px] pt-[10px] pb-[10px]'>
                    <table className="table-fixed w-[100%]   ">
                        <thead>
                        <tr className='text-left rounded-[8px] bg-red border-b-2 border-t-2'>
                            <th className='p-[10px]'>Compliant </th>
                            <th className='p-[10px]'>Contact Number</th>
                            <th className='p-[10px]'>Location</th>
                        </tr>
                        </thead>
                        <tbody className='relative'>
                        {complaints.map((complaint) => (
                            <tr key={complaint._id} data-id={complaint._id}>
                                <td className='p-[10px]'>{complaint.description}</td>
                                <td className='p-[10px]'>{complaint.contact}</td>
                                <td className='p-[10px]'>{`${complaint.street}, ${complaint.lane}, ${complaint.city}`}</td>
                                <Link to='detail'>
                                    <button onClick={event => vewData(complaint._id)}>
                                        <img src="/src/image/ce9c4e4f06e724a10b3766845f93a051.png" height='20px' width={'20px'} alt="details icon"/>
                                    </button>
                                </Link>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination w-[100%] flex justify-center gap-3 mt-[30px]">
                    <button
                        onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>{currentPage} / {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    </>)
}

export default Complaint;