import complaintAni from '/src/image/complaintAni.png'
import buttonArrow from '/src/image/button-arrow.png'
import ComplaintFrom from '../ComplaintFrom/ComplaintFrom';

import { useState } from 'react';

function Complaint() {


	const [show,setShow] =useState(false);

	const visible = () =>{
		setShow(true);
	}

	return (<>
		<section className='p-[3rem] mb-12'>
			<div className="flex flex-wrap gap-5 justify-center">
				<div className='w-[350px] relative'>

					<button
					type='button'
					onClick={visible}
					 className='flex flex-wrap p-1 gap-4 bg-[#FFE66F] items-center pr-4 pl-4 rounded-[8px] drop-shadow-lg absolute top-12' >
						<span>FIND</span>
						<img className='h-[40px]' src={buttonArrow} alt="" />
					</button>
					<img src={complaintAni} alt="" />
				</div>
				<div className='w-[60%]'>
					<h1 className='text-[35px] font-extrabold text-[#53524D] mb-5 mt-[5px]'>Complaint</h1>
					<p className='ml-5 text-[20px]'>With Best Friends, you are working to save the lives of cats and dogs all across America, giving pets second chances and happy homes.</p>

				</div>

			</div>

			{
				(() => {
                    if(show) {
					return	<ComplaintFrom/>
					}
                })() 
			}
				
				
			

			

		</section>
	</>)
}
export default Complaint;