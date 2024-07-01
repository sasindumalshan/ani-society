import React, { useState, useEffect } from "react";
import axios from "axios";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]);

    const fetchOrders = async (page) => {
        try {
            const response = await axios.get(`http://localhost:3000/animal-orders?page=${page}&limit=10`);
            setOrders(response.data.animalOrders);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section>
            <div className='flex flex-col items-start h-screen'>
                <div className='w-100 p-10 font-bold text-[20px] pb-0'>Orders</div>
                <div className='w-100 flex justify-center p-10'>
                    <table className="table-fixed w-[100%]">
                        <thead>
                        <tr className='text-left rounded-[8px] bg-red border-b-2 border-t-2'>
                            <th className='p-[10px]'>Customer Name</th>
                            <th className='p-[10px]'>Contact Number</th>
                            <th className='p-[10px]'>Address</th>
                            <th className='p-[10px]'>Animals</th>
                        </tr>
                        </thead>
                        <tbody className='relative'>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td className='p-[10px]'>{order.name.firstName} {order.name.lastName}</td>
                                <td className='p-[10px]'>{order.contactNumber}</td>
                                <td className='p-[10px]'>{order.address.city}, {order.address.lane}, {order.address.street}</td>
                                <td className='p-[10px]'>
                                    <table className="table-fixed w-[100%]">
                                        <thead>
                                        <tr className='text-left rounded-[8px] bg-red border-b-2 border-t-2'>
                                            <th className='p-[10px]'>Id</th>
                                            <th className='p-[10px]'>Name</th>
                                            <th className='p-[10px]'>Location</th>
                                            <th className='p-[10px]'>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody className='relative'>
                                        {order.pets.map((pet, petIndex) => (
                                            <tr key={petIndex}>
                                                <td className='p-[10px]'>{pet.id}</td>
                                                <td className='p-[10px]'>{pet.name}</td>
                                                <td className='p-[10px]'>{pet.catcher_location}</td>
                                                <td className='p-[10px]'>{pet.available_status}</td>
                                                <td className='p-[10px]'>
                                                    <button className='bg-blue-200 p-2 rounded'>
                                                        Confirm
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </td>
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
    );
}

export default Orders;
