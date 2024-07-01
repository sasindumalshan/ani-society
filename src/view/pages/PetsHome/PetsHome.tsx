import img from '/src/image/Home-img.svg';
import homeAni from '/src/image/homeAni.png'
import petAni from '/src/image/petAni.png'
import {useState} from "react";
import {Link} from "react-router-dom";
import buttonArrow from "../../../image/button-arrow.png";
import {f} from "vite/dist/node/types.d-aGj9QkWt";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import axios from "axios";


function PetsHome({selected_count,selected_animals,removeAnimal,reset_selected_animal_list,reset_selected_count}) {

    const [isHovered, setIsHovered] = useState(false);

    const [show_from, setShow_from] =useState(false)

    const handleClick = (event) => {
        const dataId = event.currentTarget.getAttribute('data-id');
        removeAnimal(dataId);
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        city: '',
        lane: '',
        street: ''
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const initialFormData = {
        firstName: '',
        lastName: '',
        contactNumber: '',
        city: '',
        lane: '',
        street: ''
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var requestBody={
            name:{
                firstName: formData.firstName,
                lastName:  formData.lastName,
            },
            contactNumber:  formData.contactNumber,
            address :{
                city: formData.city,
                lane: formData.lane,
                street: formData.street
            },
            pets: selected_animals
        }

        axios.post('http://localhost:3000/animal-orders', requestBody)
            .then(response => {
                console.log('Response:', response.data);
                if (response.data!=null){
                    alert("Request Successfully send")
                    reset_selected_animal_list();
                    reset_selected_count();
                }
            })
            .catch(error => {
                alert("Request send Fail")
            });

        setShow_from(false)
        setFormData(initialFormData);
    };

    if (selected_count == 0) {
        return (<>
            <section className="pl-[3rem] pr-[3rem] pt-12 pb-12 mt-12">

                <div className='flex flex-wrap gap-11 justify-center'>
                    <div className='relative h-[450px] w-[650px]'>
                        <img className='top-0 mt-0 absolute z-[-1]' src={img} alt=""/>
                        <img className='h-[250px] mt-12' src={petAni} alt=""/>
                        <h1 className='absolute z-10 text-[40px] top-[7%] right-[22%] font-semibold text-gray-500'>7+</h1>
                        <h1 className='absolute z-10 text-[40px] top-[42%] right-[10%] font-semibold text-gray-500'>21+</h1>
                        <h1 className='absolute z-10 text-[35px] bottom-[16%] right-[23%] font-semibold text-gray-500'>3+</h1>

                    </div>
                    <div className='relative w-[650px]'>
                        <h1 className='text-[95px] font-extrabold h-[85px] text-[#53524D] mt-10'>FIND</h1>
                        <h1 className='text-[95px] font-extrabold text-[#53524D] '>MY<span className='text-[45px] ml-6'>future pet</span>
                        </h1>
                        <p className='ml-5'>With Best Friends, you are working to save the lives of cats and dogs all
                            across Sri lanka, giving pets second chances and happy homes.</p>
                    </div>
                </div>
            </section>
        </>)
    } else {
        if (show_from){
            return (<>
                <section className="pl-[3rem] pr-[3rem] pt-12 pb-12 mt-12">
                    <div className='flex flex-wrap gap-11 justify-center'>
                        <div className='relative h-[450px] w-[650px]'>
                            <img className='top-0 mt-0 absolute z-[-1]' src={img} alt=""/>
                            <img className='h-[250px] mt-12' src={petAni} alt=""/>
                            <h1 className='absolute z-10 text-[40px] top-[7%] right-[22%] font-semibold text-gray-500'>7+</h1>
                            <h1 className='absolute z-10 text-[40px] top-[42%] right-[10%] font-semibold text-gray-500'>21+</h1>
                            <h1 className='absolute z-10 text-[35px] bottom-[16%] right-[23%] font-semibold text-gray-500'>3+</h1>

                        </div>
                        <div className='relative w-[650px]'>
                            <h1 className='text-[95px] font-extrabold h-[85px] text-[#53524D] mt-10'>I FIND </h1>
                            <h1 className='text-[95px] font-extrabold text-[#53524D] '>{selected_count}<span
                                className='text-[45px] ml-6'>future pets</span></h1>
                            <div className='w-100 flex'>
                                {
                                    selected_animals.map(v=>{
                                        return(
                                            <button
                                                key={v.id}
                                                className='w-[100px] h-[100px] relative'
                                                onMouseEnter={() => setIsHovered(true)}
                                                onMouseLeave={() => setIsHovered(false)}
                                                data-id={v.id}
                                                onClick={handleClick}
                                            >
                                                <img src={v.imgsrc} alt='White Dog' />
                                                {isHovered && <span className='hover-text'>Remove</span>}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <span
                                className='block p-[15px]'>fill the your details for request your selected pests</span>

                            {/*<section>
                                <div className='w-[520px] flex items-end gap-[15px] flex-col'>
                                    <form className="w-full max-w-lg">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-first-name">
                                                    First Name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                    id="grid-first-name" type="text" placeholder="Jane"/>

                                            </div>
                                            <div className="w-full md:w-1/2 px-3">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-last-name">
                                                    Last Name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-last-name" type="text" placeholder="Doe"/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-password">
                                                    Contact Number
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-password" type="text" placeholder="+94 77 *** ****"/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-2">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-city">
                                                    City
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-city" type="text" placeholder="city"/>
                                            </div>

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-city">
                                                    Lane
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-lane" type="text" placeholder="lane"/>
                                            </div>

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-zip">
                                                    Street
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-street" type="text" placeholder="street"/>
                                            </div>
                                        </div>
                                    </form>
                                    <button
                                        onClick={event => {
                                            setShow_from(false)
                                            handleChange(event)
                                            submitRequest()
                                        }}
                                        className='flex flex-wrap p-1 gap-4 bg-[#FFE66F] items-center pr-4 pl-4 rounded-[8px] drop-shadow-lg h-[44px] w-[180px]'>
                                        <span className='font-semibold text-[20px]'>Send Request</span>

                                    </button>
                                </div>
                            </section>*/}
                            <section>
                                <div className='w-[520px] flex items-end gap-[15px] flex-col'>
                                    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="firstName">
                                                    First Name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                    id="firstName" type="text" placeholder="Jane" value={formData.firstName} onChange={handleChange}/>
                                            </div>
                                            <div className="w-full md:w-1/2 px-3">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="lastName">
                                                    Last Name
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="lastName" type="text" placeholder="Doe" value={formData.lastName} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="contactNumber">
                                                    Contact Number
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="contactNumber" type="text" placeholder="+94 77 *** ****" value={formData.contactNumber} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-2">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="city">
                                                    City
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="city" type="text" placeholder="City" value={formData.city} onChange={handleChange}/>
                                            </div>
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="lane">
                                                    Lane
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="lane" type="text" placeholder="Lane" value={formData.lane} onChange={handleChange}/>
                                            </div>
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="street">
                                                    Street
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="street" type="text" placeholder="Street" value={formData.street} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className='flex flex-wrap p-1 gap-4 bg-[#FFE66F] items-center pr-4 pl-4 rounded-[8px] drop-shadow-lg h-[44px] w-[180px]'>
                                            <span className='font-semibold text-[20px]'>Send Request</span>
                                        </button>
                                    </form>
                                </div>
                            </section>


                        </div>
                    </div>
                </section>
            </>)
        }
        else {
            return (<>
                <section className="pl-[3rem] pr-[3rem] pt-12 pb-12 mt-12">

                    <div className='flex flex-wrap gap-11 justify-center'>
                        <div className='relative h-[450px] w-[650px]'>
                            <img className='top-0 mt-0 absolute z-[-1]' src={img} alt=""/>
                            <img className='h-[250px] mt-12' src={petAni} alt=""/>
                            <h1 className='absolute z-10 text-[40px] top-[7%] right-[22%] font-semibold text-gray-500'>7+</h1>
                            <h1 className='absolute z-10 text-[40px] top-[42%] right-[10%] font-semibold text-gray-500'>21+</h1>
                            <h1 className='absolute z-10 text-[35px] bottom-[16%] right-[23%] font-semibold text-gray-500'>3+</h1>

                        </div>
                        <div className='relative w-[650px]'>
                            <h1 className='text-[95px] font-extrabold h-[85px] text-[#53524D] mt-10'>I FIND </h1>
                            <h1 className='text-[95px] font-extrabold text-[#53524D] '>{selected_count}<span className='text-[45px] ml-6'>future pets</span></h1>

                            <div className='w-100 flex'>
                                {
                                    selected_animals.map(v=>{
                                        return(
                                            <button
                                                key={v.id}
                                                className='w-[100px] h-[100px] relative'
                                                onMouseEnter={() => setIsHovered(true)}
                                                onMouseLeave={() => setIsHovered(false)}
                                                data-id={v.id}
                                                onClick={handleClick}
                                            >
                                                <img src={v.imgsrc} alt='White Dog' />
                                                {isHovered && <span className='hover-text'>Remove</span>}
                                            </button>
                                        )
                                    })
                                }
                            </div>

                            <span className='block p-[15px]'>fill the your details for request your selected pests</span>
                            <button
                                className='
						flex
						flex-wrap
						p-1 gap-4
						bg-[#FFE66F]
						items-center
						pr-4 pl-4
						rounded-[8px]
						drop-shadow-lg
						h-[44px]'

                                onClick={event => {
                                    setShow_from(true)
                                }}
                            >

                                <span className='font-semibold text-[20px]'>Request</span>


                            </button>


                        </div>
                    </div>
                </section>
            </>)
        }
    }
}

export default PetsHome;