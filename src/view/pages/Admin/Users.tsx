import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const fetchUsers = async (page) => {
        try {
            const response = await axios.get(`http://localhost:3000/users?page=${page}&limit=10`);
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <section>
            <div className='flex flex-col items-start h-screen'>
                <div className='w-100 p-10 font-bold text-[20px] pb-0'>User</div>
                <div className='w-100 flex justify-center p-10'>
                    <table className="table-fixed w-[100%]">
                        <thead>
                        <tr className='text-left rounded-[8px] bg-red border-b-2 border-t-2'>
                            <th className='p-[10px]'>Name</th>
                            <th className='p-[10px]'>Username</th>
                            <th className='p-[10px]'>Role</th>
                            <th className='p-[10px]'>Password</th>
                        </tr>
                        </thead>
                        <tbody className='relative'>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className='p-[10px]'>{user.fullname}</td>
                                <td className='p-[10px]'>{user.username}</td>
                                <td className='p-[10px]'>{user.role}</td>
                                <td className='p-[10px]'>********</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-between w-full px-10'>
                    <button
                        onClick={handlePreviousPage}
                        disabled={page === 1}
                        className='p-2 bg-blue-500 text-white rounded'
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                        className='p-2 bg-blue-500 text-white rounded'
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Users;
