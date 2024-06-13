import buttonArrow from '/src/image/button-arrow.png'
import {useState} from "react";

function AnimalCard({props,increment_selected_count,setAnimalData}) {

    const [animal, setAnimal] = useState(props);

    return (<>
        <div className=" w-[350px] bg-white rounded-xl shadow-xl p-3">

            <div className="bg-slate-300 rounded-lg">
                <img className="h-[200px]" src={animal.imgsrc || ''} alt=""/>
            </div>
            <div className="bg-[#FFE66F] p-2 rounded-lg mt-1">
                <div className='flex flex-row justify-between items-center p-2'>
                    <h2 className="text-gray-600 font-semibold text-[20px]">{animal.name || animal.id} <span
                        className="text-[#303030]-400 text-[12px]">{animal.available_status}</span></h2>
                    <button
                        onClick={
                            ()=>{
                            setAnimalData(props.imgsrc,props.name,props.id)
                            increment_selected_count()
                            }
                        }
                        className='flex flex-wrap p-1 gap-4 bg-white items-center pr-4 pl-4 rounded-[8px] drop-shadow-lg'>
                        <img className='h-[40px] rotate-180' src={buttonArrow} alt=""/>
                    </button>
                </div>
                <div className="p-3 rounded-lg bg-white">
                    <p className="text-[12px]">{animal.description}</p>
                </div>
            </div>
        </div>
    </>)
}

export default AnimalCard;

