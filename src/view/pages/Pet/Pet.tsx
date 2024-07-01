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
                    <p className='ml-5 text-[20px] mb-[20px]'>At our organization, we believe in the power of love and compassion towards animals. Whether you're an animal lover looking to make a difference or someone ready to welcome a furry friend into your home, there are many ways you can help animals and show them the love they deserve. Volunteering at local shelters, fostering pets, and adopting from rescue organizations are some of the best ways to support animals in need. Many shelters offer pets for free or at a minimal cost, making it easy for you to provide a loving home to an animal. Additionally, donating supplies or funds and spreading awareness about animal adoption can significantly impact their lives. Animals bring joy, companionship, and unconditional love, and by helping them, you're enriching your life as well. Join us in our mission to love and care for animals—every animal deserves love, and together, we can make sure they get it. Adopt a pet today and experience the joy of unconditional love for free!.</p>
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

                            <span>Find My Pet</span>
                            <img className='h-[40px] rotate-180' src={buttonArrow} alt=""/>
                        </Link>


                    </button>
                </div>

            </div>

        </section>

    </>)
}

export default Pet;