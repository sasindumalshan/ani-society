import {Link, Outlet} from "react-router-dom";

function Users() {
    return(
        <section>
            <div className='flex flex-col items-start h-screen'>
                <div className='w-100 p-10 font-bold text-[20px] pb-0'>User</div>
                <div className='w-100 flex  justify-center p-10'>
                    <table className="table-fixed w-[100%]   ">
                        <thead>
                        <tr className='text-left rounded-[8px] bg-red border-b-2 border-t-2'>
                            <th className='p-[10px]'>Song</th>
                            <th className='p-[10px]'>Artist</th>
                            <th className='p-[10px]'>Year</th>
                        </tr>
                        </thead>
                        <tbody className='relative'>
                        <tr>
                            <td className='p-[10px]'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td className='p-[10px]'>Malcolm Lockyer</td>
                            <td className='p-[10px]'>1961</td>
                            <Link to='detail'>
                                <button>
                                    <img width='40px' className='p-3' src='/src/image/pen-to-square-regular.svg'/>
                                </button>
                            </Link>
                        </tr>
                        <tr>
                            <td className='p-[10px]'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td className='p-[10px]'>Malcolm Lockyer</td>
                            <td className='p-[10px]'>1961</td>
                            <Link to='detail'>
                                <button>
                                    <img width='40px' className='p-3' src='/src/image/pen-to-square-regular.svg'/>
                                </button>
                            </Link>
                        </tr>
                        <tr>
                            <td className='p-[10px]'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td className='p-[10px]'>Malcolm Lockyer</td>
                            <td className='p-[10px]'>1961</td>
                            <Link to='detail'>
                                <button>
                                    <img width='40px' className='p-3' src='/src/image/pen-to-square-regular.svg'/>
                                </button>
                            </Link>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
export default Users;