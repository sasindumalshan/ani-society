import complaintAni from '/src/image/complaintAni.png'
import buttonArrow from '/src/image/button-arrow.png'
import ComplaintFrom from '../ComplaintFrom/ComplaintFrom';

import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function Complaint() {


	const [show,setShow] =useState(false);

	const visible = () =>{
		setShow(true);
	}

	return (<>
		<section className='p-[3rem] mb-12'>
			<div className="flex flex-wrap gap-5 justify-center">
				<div className='w-[350px] relative'>
					<Link to={'from'}>
						<button
						type='button'
						onClick={visible}
						className='flex flex-wrap p-1 gap-4 bg-[#FFE66F] items-center pr-4 pl-4 rounded-[8px] drop-shadow-lg absolute top-12' >
							<span>FIND</span>
							<img className='h-[40px]' src={buttonArrow} alt="" />
						</button>
					</Link>
					<img src={complaintAni} alt="" />
				</div>
				<div className='w-[60%]'>
					<h1 className='text-[35px] font-extrabold text-[#53524D] mb-5 mt-[5px]'>Complaint</h1>
					<p className='ml-5 text-[20px]'>With Best Friends, you are working to save the lives of cats and dogs all across America, giving pets second chances and happy homes.</p>

				</div>
				<Outlet></Outlet>
			</div>
		</section>

		<section className='pr-[20%] pl-[20%] flex flex-col gap-[10px] mb-[20px]'>
			<div className='flex flex-row justify-between bg-white p-[10px] rounded-[8px] drop-shadow-md'>
				<div>
					<img className='rounded-[8px] w-[100px]' src="/src/animal/white-dog.png" alt=""/>
				</div>
				<div className='flex flex-col'>
					<h1 className='text-[20px] font-extrabold text-[#53524D] mb-2 mt-[5px]'>Complaint</h1>
					<p className='ml-5 text-[12px]'>With Best Friends, you are working to save the lives of cats and dogs all across America, giving pets second chances and happy homes.</p>
					<h1 className='text-[15px] font-semibold text-[#53524D] mb-2 mt-[5px]'>Location : <span>Galle,Srilanka</span></h1>
					<h1 className='text-[15px] font-semibold text-[#53524D] mb-2 mt-[5px]'>Contact Number : <span>077434 434 43 </span></h1>
				</div>
				<div className='flex items-end'>
					<button  className='bg-red h-[20px] w-[20px]  p-[3px]'>
						<img height='10px' src='/src/image/pen-to-square-regular.svg'/>
					</button>
					<button  className='bg-red h-[20px] w-[20px] p-[3px]'>
						<img height='20px' src='/src/image/trash-solid.svg'/>
					</button>
				</div>
			</div>
		</section>
	</>)
}
export default Complaint;