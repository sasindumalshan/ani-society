import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
    const initialFormData = {
        fullname: "",
        username: "",
        password: ""
    };

    const [formData, setFormData] = useState(initialFormData);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData)
        axios.post("http://localhost:3000/register", formData)
            .then(response => {
                alert("Your  Registration Successfully complied")
                setFormData(initialFormData);
                navigate('/signin');
            })
            .catch(error => {
                alert("Registration Fail")
            });
    };

    return (
        <>
            <section className='w-screen h-screen fixed top-[100px] z-10'>
                <section className="flex flex-col items-center pt-6">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <Link to='/'>
                            <button className='p-4'>
                                <img width='15px' src='/src/image/xmark-solid.svg' alt="Close" />
                            </button>
                        </Link>
                        <div className="p-6 pt-0 space-y-4 md:space-y-6">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                        Your full name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="Emelia Erickson"
                                        required
                                        value={formData.fullname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="emelia_erickson24"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-black bg-[#FFE66F] hover:bg-[#FFD200] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Create an account
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    Already have an account?
                                    <Link className="font-medium text-blue-600 hover:underline" to="/signin">
                                        Sign in here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}

export default Register;
