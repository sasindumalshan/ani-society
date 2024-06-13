import img from '/src/image/Home-img.svg';
import homeAni from '/src/image/homeAni.png'
function Home() {
	return (<>
		<section className="pl-[3rem] pr-[3rem] pt-12 pb-12 mt-12">

			<div className='flex flex-wrap gap-11 justify-center'>
				<div className='relative w-[650px]'>
					<img className='top-0 mt-0 absolute z-[-1]' src={img} alt="" />
					<img className='h-[400px] mb-12' src={homeAni} alt="" />
					<h1 className='absolute z-10 text-[40px] top-[7%] right-[22%] font-semibold text-gray-500'>7+</h1>
					<h1 className='absolute z-10 text-[40px] top-[42%] right-[10%] font-semibold text-gray-500'>21+</h1>
					<h1 className='absolute z-10 text-[35px] bottom-[16%] right-[23%] font-semibold text-gray-500'>3+</h1>

				</div>
				<div className='relative w-[650px]'>
					<h1 className='text-[95px] font-extrabold h-[85px] text-[#53524D] mt-10'>WE<span className='text-[45px] ml-6' >will</span></h1>
					<h1 className='text-[95px] font-extrabold text-[#53524D] '>HELP<span className='text-[45px] ml-6' >them</span></h1>
					<p className='ml-5'>With Best Friends, you are working to save the lives of cats and dogs all across America, giving pets second chances and happy homes.</p>
				</div>
			</div>
		</section>
	</>)
}
export default Home;