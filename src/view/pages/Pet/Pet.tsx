import petAni from '/src/image/petAni.png'
import buttonArrow from '/src/image/button-arrow.png'
import {Link} from 'react-router-dom';
import {useState} from "react";

function Pet() {

    return (<>

        <section className='p-[3rem]'>
            <div className="flex flex-wrap gap-5 justify-center">
                <div className='w-[350px]'><img src={petAni} alt=""/></div>
                <div className='w-[60%]'>
                    <h1 className='text-[35px] font-extrabold text-[#53524D] mb-5 mt-[5px]'>How<span
                        className='text-[22px] ml-3'>help them</span></h1>
                    <p className='ml-5 text-[20px]'>With Best Friends, you are working to save the lives of cats and
                        dogs all across America, giving pets second chances and happy homes.</p>
                    <button>

                        <Link to="/pets"
                              className='
						flex
						flex-wrap
						p-1 gap-4
						bg-[#FFE66F]
						items-center
						pr-4 pl-4
						rounded-[8px]
						drop-shadow-lg'
                        >

                            <span>FIND</span>
                            <img className='h-[40px] rotate-180' src={buttonArrow} alt=""/>
                        </Link>


                    </button>
                </div>

            </div>

        </section>

    </>)
}

export default Pet;