import PetDetails from '../PetDetails/PetDetails';
import buttonArrow from '/src/assets/image/button-arrow.png'
function AnimalCard() {
	return (<>
		<div className=" w-[350px] bg-white rounded-xl shadow-xl p-3">

			<div className="bg-slate-300 rounded-lg">
				<img className="h-[200px]" src="" alt="" />
			</div>
			<div className="bg-[#FFE66F] p-2 rounded-lg mt-1">
				<div className='flex flex-row justify-between items-center p-2'>
					<h2 className="text-gray-600 font-semibold text-[20px]">Tommy</h2>
					<button className='flex flex-wrap p-1 gap-4 bg-white items-center pr-4 pl-4 rounded-[8px] drop-shadow-lg'>
						<img className='h-[40px] rotate-180' src={buttonArrow} alt="" />
					</button>
				</div>
				<div className="p-3 rounded-lg bg-white">
					<p> With Best Friends, you are working to save the lives of cats and dogs all across America, giving pets second chances and happy homes.</p>
				</div>
			</div>

		</div>
		{/* <Close />
		<PetDetails/> */}
	</>)
}
export default AnimalCard;

function Close() {
	return (
	<>
		<div className='w-screen relative'>
			<button
				type='button'
				className='
				flex 
				flex-wrap 
				p-1 
				gap-4
				bg-[#FFE66F] 
				items-center 
				pr-4 
				pl-4 
				rounded-[8px] 
				drop-shadow-lg 
				absolute 
				top-2 
				right-2'
			>
				X
			</button>
		</div>
	</>)
}
