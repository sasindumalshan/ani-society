import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {useAuth} from "../../connection/AuthContext";

function Login() {
    const initialFormData = {
        fullname: "no data",
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
        const [username, setUsername] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const { login } = useAuth();


        const handleSubmit = (e) => {
        const obj = {
            username: formData.username,
            password: formData.password
        };
        console.log(obj)
        e.preventDefault();
        axios.post("http://localhost:3000/login", obj)
            .then(response => {
                console.log("Success:", response.data.user.role);
                // Navigate to another page after successful login
                try {
                    if (response.data.user.role=='admin'){
                        navigate('/admin/home');

                        localStorage.setItem('role', 'admin');
                    }else {
                        navigate('/');
                    }
                }catch (e){
                    navigate('/');
                }

                const { token } = response.data;
                login(formData.username, token);


            })
            .catch(error => {
                console.error("Error:", error);
                alert(error.response.data.message)
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
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Login</h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                                    Login
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    Don't have an account?
                                    <Link className="font-medium text-blue-600 hover:underline" to="/register">
                                        Sign up here
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

export default Login;
