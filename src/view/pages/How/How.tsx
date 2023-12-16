import howAni from '/src/image/howAni.png'

function How() {
	return (<>
		<section className="flex justify-center">
			<div className="w-[75%] relative">
				<img className='h-[200px] right-0 absolute z-[1]' src={howAni} alt="" />
				<div className="bg-white rounded-[8px] p-10 mt-[150px] drop-shadow-lg">
					<h1 className='text-[35px] font-extrabold text-[#53524D] mb-5 mt-[5px]'>How<span className='text-[22px] ml-3' >help them</span></h1>
					<p className='ml-5 text-[20px]'>With Best Friends, you are working to save the lives of cats and dogs all across America, giving pets second chances and happy homes.</p>
				</div>
			</div>
		</section>
	</>)
}

export default How;