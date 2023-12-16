import imgChooser from '/src/assets/image/img-chooser.png'
import upload from '/src/image/upload.png'
function ComplaintFrom() {

	return (<>
		<section className="flex justify-center mt-12">

			<form className="bg-slate-100 p-10 flex items-center gap-10 flex-wrap w-fit relative shadow-lg rounded-lg">
				<div className="p-1 sm:w-[700px] lg:w-[700px] ">
					<div className="mt-3">
						<span className="text-input-discription">Contact</span>
						<span className='text-[13px] text-gray-500 ml-2'>Kindly provide a phone number where <br/> we can reach you in case we have trouble locating the problem area. </span>
						<input className="text-input" placeholder="+94 00 000 0000" type="text" />
					</div>
					<div className="mt-5">
						<span className="text-input-discription">Address </span>
						<span className='text-[13px] text-gray-500 block ml-2'>The address of the problem area</span>
						<input className="text-input m-3" placeholder="street" type="text" />
						<input className="text-input m-3" placeholder="lane" type="text" />
						<input className="text-input m-3" placeholder="city" type="text" />
					</div>
					<div className="mt-5">
						<span className="text-input-discription">Discription</span>
						<span className='text-[13px] text-gray-500 block ml-2'>please describe your issue</span>
						<textarea className="w-[90%] 
									p-4
									text-[20px]
									rounded-md
									border-2
									border-slate-200
									placeholder-slate-400
									bg-[#E8E7E7]
									ml-2 m-3
									align-text-top
									" placeholder="type her" rows={4} ></textarea>
					</div>

				</div>
				<div className="p-1">

					<div className=" p-1 h-[300px] w-[300px] relative border-[4px] rounded-xl border-[#FFE66F] border-dashed flex justify-center" >
						<input className="absolute h-[99%] w-[99%]  outline-none indent-[-210px]" type="file" />
						<div className='flex flex-wrap justify-center flex-col items-center'>
							<img className='w-[50px]' src={upload} alt="upload image" />
						<span className='text-gray-500 font-semibold text-[17px]'>choose your image</span>
						</div>
						<img className='h-[100%] absolute' src="" alt="" />
					</div>
					<span className='text-[13px] text-gray-500 block ml-2'>please upload proof in location with a animal</span>



				</div>
				<button className='flex flex-wrap p-1 gap-4 bg-[#FFE66F] items-center pr-4 pl-4 rounded-[8px] drop-shadow-lg absolute bottom-2'>
					<span>Submit</span>
				</button>
				<button 
				type='button'
				 className='flex flex-wrap p-1 gap-4 bg-[#FFE66F] items-center pr-4 pl-4 rounded-[8px] drop-shadow-lg absolute top-2 right-2'>
					X	
				</button>
			</form>
		</section>
	</>)
}

export default ComplaintFrom;