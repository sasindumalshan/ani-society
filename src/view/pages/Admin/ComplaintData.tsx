import {Link} from "react-router-dom";

function ComplaintData() {
    return (
        <>
            <section className='flex flex-row gap-4 ml-[40px] mt-[20px] shadow p-6'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col flex-wrap w-[500px]'>
                        <span className='font-bold'>Description</span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium cum maiores quae quaerat quia, unde voluptates.</span>
                    </div>
                    <div className='flex flex-col flex-wrap w-[500px]'>
                        <span className='font-bold'>Contact Number</span>
                        <span>+94 77 343 3434</span>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col flex-wrap w-[500px]'>
                        <span className='font-bold'>Description</span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium cum maiores quae quaerat quia, unde voluptates.</span>
                    </div>
                    <div className='flex flex-col flex-wrap w-[500px]'>
                        <span className='font-bold'>Contact Number</span>
                        <span>+94 77 343 3434</span>
                    </div>
                </div>
                <div className='w-[300px] h-[300px] rounded-lg shadow'>

                </div>
            </section>
            <div className='flex justify-end px-[40px] pt-[20px]'>
                <Link to='/admin/compliant'>
                    <button type="submit" className="w-[300px] text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Cancel</button>
                </Link>
            </div>
        </>
    )
}

export default ComplaintData;