import logo from '/src/image/logo.svg';
import upArrow from '/src/image/Up arrow.svg';
function Footer() {
	return (
		<>
			<footer className="bg-[#585750] pl-12 pr-12">
				<div className='flex flex-wrap justify-between gap-12 mr-7 ml-7'>
					<div className='p-3 flex justify-center items-center'>
						<a href="" className='inline bg-slate-200 p-2 rounded-md' >
							<img src={logo} alt="logo" />
						</a>
					</div>
					<div className='p-8'>
						<h5 className='mb-4 text-xl text-white'>123 Market<br />
							Charlottesville, California<br />
							44635</h5>
						<h4 className='mb-4 text-lg text-white'>+94 770659786</h4>
						<h4 className='text-lg text-white'>sasindu.malshan@gmail.com</h4>
					</div>
					<div className='flex flex-wrap justify-center items-center'>
						<ul className='flex flex-col gap-2 text-[#b4b4b4] text-sm font-normal'>
							<a className=' hover:text-white hover:font-bold transition-all' href="">Home</a>
							<a className=' hover:text-white hover:font-bold transition-all' href="">Home</a>
							<a className=' hover:text-white hover:font-bold transition-all' href="">Home</a>
							<a className=' hover:text-white hover:font-bold transition-all' href="">Home</a>
						</ul>
					</div>
					<div  className='flex flex-wrap justify-center items-center'>
						<ul className='flex flex-col gap-2 text-[#b4b4b4] text-sm font-normal'>
							<a className=' hover:text-white hover:font-bold transition-all' href="">Home</a>
							<a className=' hover:text-white hover:font-bold transition-all' href="">Home</a>
							<a className=' hover:text-white hover:font-bold transition-all' href="">Home</a>
							<a className=' hover:text-white hover:font-bold transition-all' href="">Home</a>
						</ul>
					</div>
					<div className='p-3 flex flex-wrap items-center justify-center'>
						<a href="" className='inline' >
							<img src={upArrow} alt="logo" />
						</a>
					</div>
				</div>
				<div className='flex justify-center p-3 text-white'>
					<span >&copy;2023 Ani Society. All rights reserved.</span>
				</div>


			</footer>
		</>
	)
}
export default Footer;