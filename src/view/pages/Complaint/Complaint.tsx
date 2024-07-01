import complaintAni from '/src/image/complaintAni.png'
import buttonArrow from '/src/image/button-arrow.png'
import ComplaintFrom from '../ComplaintFrom/ComplaintFrom';

import {useEffect, useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import axios from "axios";

function Complaint() {

	const navigate = useNavigate()
	const [show,setShow] =useState(false);

	const [complaints,setComplaints]=useState([]);

	useEffect(() => {
		fetchComplaints();
	},[])

	const visible = () =>{
		if (localStorage.getItem('auth')==null){
			navigate('/signin');
		}else {
			navigate('/from');
		}
		setShow(true);
	}

	const fetchComplaints = async () => {
		var item:string ;
		item= localStorage.getItem('auth') as string;
		let user_name = JSON.parse(item).username;
		const url = `http://localhost:3000/complaint/complaints?user=${user_name}`;

		try {
			const response = await axios.get(url);
			setComplaints(response.data)
		} catch (error) {
			console.error('Error fetching complaints:', error);
			throw error;
		}
	};

	return (<>
		<section className='p-[3rem] mb-12'>
			<div className="flex flex-wrap gap-5 justify-center">
				<div className='w-[350px] relative'>

						<button
						type='button'
						onClick={visible}
						className='flex flex-wrap p-1 gap-4 bg-[#FFE66F] items-center pr-4 pl-4 rounded-[8px] drop-shadow-lg absolute top-12' >
							<span>Compliant</span>
							<img className='h-[40px]' src={buttonArrow} alt="" />
						</button>

					<img src={complaintAni} alt="" />
				</div>
				<div className='w-[60%]'>
					<h1 className='text-[35px] font-extrabold text-[#53524D] mb-5 mt-[5px]'>Complaint</h1>
					<p className='ml-5 text-[20px]'>Animas Street is dedicated to advocating for the welfare and rights of street animals worldwide. We believe that every animal deserves compassion, care, and a chance to live a safe and healthy life. Through our platform, we raise awareness about the challenges faced by street animals, promote responsible pet ownership, and encourage adoption from shelters and rescue organizations. Our mission is to create a world where street animals are valued and protected, where communities come together to support their well-being, and where every animal has a loving home.</p>

				</div>
				<Outlet></Outlet>
			</div>
		</section>

		{
			complaints.map(compliant=>{
				return (
					<section className='pr-[20%] pl-[20%] flex flex-col gap-[10px] mb-[20px]'>
						<div className='flex flex-row justify-between bg-white p-[10px] rounded-[8px] drop-shadow-md'>
							<div>
								<img className='rounded-[8px] w-[100px]' src={compliant.base64Image} alt=""/>
							</div>
							<div className='flex flex-col'>
								<h1 className='text-[20px] font-extrabold text-[#53524D] mb-2 mt-[5px]'>Complaint</h1>
								<p className='ml-5 text-[12px]'>{compliant.description}</p>
								<h1 className='text-[15px] font-semibold text-[#53524D] mb-2 mt-[5px]'>Location : <span>{compliant.street +", "+compliant.lane+", "+compliant.city}</span></h1>
								<h1 className='text-[15px] font-semibold text-[#53524D] mb-2 mt-[5px]'>Contact Number : <span>{ compliant.contact } </span></h1>
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
				)
			})
		}
	</>)
}
export default Complaint;