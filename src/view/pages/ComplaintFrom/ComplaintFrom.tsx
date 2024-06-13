import { Link  } from 'react-router-dom';
import imgChooser from '/src/assets/image/img-chooser.png'
import upload from '/src/image/upload.png'

import '/src/index.css'
import axios from "axios";

function ComplaintFrom() {

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const jsonData = {};

		for (let [key, value] of formData.entries()) {
			jsonData[key] = value;
		}

		// Convert file to base64
		const file = formData.get('file');
		if (file) {
			const base64 = await convertFileToBase64(file);
			jsonData['file'] = base64;
		}

		try {
			const response = await axios.post('http://localhost:3000/complaint/submit', jsonData);

			console.log('Response:', response.data);
			alert("Complained to Ani Society team")
		} catch (error) {
			console.error('Error:', error);
			alert("Complained failed")
		}

		// Reset form fields
		event.target.reset();

		// Navigate to another page
	};

	const convertFileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};

	return (
		<>
			<section className="flex justify-center mt-12 custom-animation">
				<form onSubmit={handleSubmit} className="bg-slate-100 p-10 flex items-center gap-10 flex-wrap w-fit relative shadow-lg rounded-lg">
					<div className="p-1 sm:w-[700px] lg:w-[700px] ">
						<div className="mt-3">
							<span className="text-input-discription">Contact</span>
							<span className='text-[13px] text-gray-500 ml-2'>Kindly provide a phone number where <br/> we can reach you in case we have trouble locating the problem area. </span>
							<input name="contact" className="text-input" placeholder="+94 00 000 0000" type="text" />
						</div>
						<div className="mt-5">
							<span className="text-input-discription">Address </span>
							<span className='text-[13px] text-gray-500 block ml-2'>The address of the problem area</span>
							<input name="street" className="text-input m-3" placeholder="street" type="text" />
							<input name="lane" className="text-input m-3" placeholder="lane" type="text" />
							<input name="city" className="text-input m-3" placeholder="city" type="text" />
						</div>
						<div className="mt-5">
							<span className="text-input-discription">Description</span>
							<span className='text-[13px] text-gray-500 block ml-2'>Please describe your issue</span>
							<textarea name="description" className="w-[90%]
                                    p-4
                                    text-[20px]
                                    rounded-md
                                    border-2
                                    border-slate-200
                                    placeholder-slate-400
                                    bg-[#E8E7E7]
                                    ml-2 m-3
                                    align-text-top
                                    " placeholder="type here" rows={4} >
              </textarea>
						</div>
					</div>
					<div className="p-1">
						<div className=" p-1 h-[300px] w-[300px] relative border-[4px] rounded-xl border-[#FFE66F] border-dashed flex justify-center" >
							<input  type="file" name="file" className="absolute h-[99%] w-[99%]  outline-none indent-[-210px]"  />
							<div className='flex flex-wrap justify-center flex-col items-center'>
								<img className='w-[50px]' src={upload} alt="upload image" />
								<span className='text-gray-500 font-semibold text-[17px]'>choose your image</span>
							</div>
							<img className='h-[100%] absolute' src="" alt="" />
						</div>
						<span className='text-[13px] text-gray-500 block ml-2'>please upload proof in location with an animal</span>
					</div>
					<button type='submit' className='flex flex-wrap p-1 gap-4 bg-[#FFE66F] items-center pr-4 pl-4 rounded-[8px] drop-shadow-lg absolute bottom-2'>
						<span>Submit</span>
					</button>
					<Link to={'/'}>
						<button
							type='button'
							className='flex flex-wrap p-1 gap-4 bg-[#FFE66F] items-center pr-4 pl-4 rounded-[8px] drop-shadow-lg absolute top-2 right-2'>
							X
						</button>
					</Link>
				</form>
			</section>
		</>
	);
}

export default ComplaintFrom;