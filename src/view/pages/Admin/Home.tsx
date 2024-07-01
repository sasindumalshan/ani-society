import {ChangeEvent, useEffect, useRef, useState} from "react";
import image from "../../../image/img-chooser.png";
import axios from "axios";
import {Link} from "react-router-dom";

function Home() {
    const initialFormData = {
        id: "A001",
        name: "",
        available_status: "",
        description: "",
        imgsrc: "",
        catcher_location: "",
        catcher_date: "",
        damage: "",
        age: "",
        category: ""
    };
    const [selectedImage, setSelectedImage] = useState(image);
    const [formData, setFormData] = useState(initialFormData);
    const [compCount,setCompCount]=useState(0)
    const [userCount, setUserCount] = useState<number | null>(null);

    const imgRef = useRef(null);
    const [dateTime, setDateTime] = useState({
        date: '',
        time: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const jsonData = {};

        for (let [key, value] of formData.entries()) {
            jsonData[key] = value;
        }

        if (title == "Add Animal") {
            // Convert file to base64
            const file = formData.get('file');
            if (file) {
                const base64 = await convertFileToBase64(file);
                jsonData['file'] = base64;
            }

            jsonData['id'] = 'A09';
            try {
                const response = await axios.post('http://localhost:3000/animals', jsonData);
                console.log('Response:', response.data);
                alert("Animal Register to System Successful")
                clearAll()
            } catch (error) {
                console.error('Error:', error);
                alert("Complained failed")
            }
        }
    };
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = (reader.result as string).split(',')[1];
                setFormData((prevData) => ({
                    ...prevData,
                    imgsrc: base64String
                }));
                setSelectedImage(URL.createObjectURL(file));
            };
            reader.readAsDataURL(file);
        }
    };

    const [title, setTitle] = useState("Add Animal");

    const clearAll = () => {
        setTitle("Add Animal");
        setFormData(initialFormData);
        setSelectedImage(image);
    };


    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://localhost:3000/complaint/comp?page=1&limit=3');
                setComplaints(response.data.complaints);
                setCompCount(response.data.total)
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }


        //    date and time


            const updateDateTime = () => {
                const now = new Date();
                const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = now.toLocaleDateString(undefined, options);
                const formattedTime = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                setDateTime({
                    date: formattedDate,
                    time: formattedTime
                });
            };

            updateDateTime();
            const intervalId = setInterval(updateDateTime, 1000); // Update every second

            return () => clearInterval(intervalId); // Cleanup interval on component unmount

        };
        // get user count >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        const fetchUserCount = async () => {
            try {
                const response = await fetch('http://localhost:3000/users/count'); // Adjust the URL to your endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(response)
                setUserCount(data.totalUsers);
            } catch (error) {
                console.error('Failed to fetch user count:', error);
            }
        };

        fetchUserCount();
        fetchComplaints();
    }, []);

    return (<>
        <section className='flex flex-col h-screen'>
            <section className='flex flex-row justify-center items-center gap-[60px] mt-[40px]'>
                <div
                    className='h-[200px] w-[300px] shadow-lg rounded-xl flex flex-col flex-wrap justify-center items-center p-[30px] '>
                    <div className='w-[100%]'>
                        <span className='text-[20px] flex justify-start font-bold'>New Order</span>
                    </div>
                    <span className='text-[40px] font-bold'>0+</span>
                </div>
                <div
                    className='h-[200px] w-[300px] shadow-lg rounded-xl flex flex-col flex-wrap justify-center items-center p-[30px] '>
                    <div className='w-[100%]'>
                        <span className='text-[20px] flex justify-start font-bold'>New Complaint</span>
                    </div>
                    <span className='text-[40px] font-bold'>{compCount+"+"}</span>
                </div>
                <div className='h-[200px] w-[300px] shadow-lg rounded-xl flex flex-col flex-wrap justify-center items-center p-[30px]'>
                    <div className='w-[100%]'>
                        <span className='text-[20px] flex justify-start font-bold'>Total End Users In Site</span>
                    </div>
                    <span className='text-[40px] font-bold'>{userCount !== null ? userCount+'+' : 'Loading...'}</span>
                </div>
                <div className='h-[200px] w-[300px] shadow-lg rounded-xl flex flex-col flex-wrap justify-center items-center p-[30px]'>
                    <div className='w-[100%]'>
                        <span className='text-[22px] flex justify-start font-bold'>{dateTime.date}</span>
                    </div>
                    <span className='text-[30px] font-bold'>{dateTime.time}</span>
                </div>
            </section>
            <section className='mt-[20px]'>
                <h1 className='ml-[40px] mt-[20px] mb-[10px] text-[20px] font-bold'>New Complaint</h1>
                <div className='w-100 flex  justify-center pl-[40px] pr-[40px] pt-[10px] pb-[10px]'>
                    <table className="table-fixed w-[100%]   ">
                        <thead>
                        <tr className='text-left rounded-[8px] bg-red border-b-2 border-t-2'>
                            <th className='p-[10px]'>Compliant </th>
                            <th className='p-[10px]'>Contact Number</th>
                            <th className='p-[10px]'>Location</th>
                        </tr>
                        </thead>
                        <tbody className='relative'>
                        {complaints.map((complaint) => (
                            <tr key={complaint._id}>
                                <td className='p-[10px]'>{complaint.description}</td>
                                <td className='p-[10px]'>{complaint.contact}</td>
                                <td className='p-[10px]'>{`${complaint.street}, ${complaint.lane}, ${complaint.city}`}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <section className='flex justify-center items-center mx-[40px] '>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold mb-6">{title}</h1>
                    <form onSubmit={handleSubmit} className="flex flex-row flex-wrap items-center">
                        <div>
                            <div className='flex flex-row space-[20px]'>
                                <div className='w-[400px] px-[20px]'>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        name={'name'}
                                        onChange={handleChange}
                                        className="mt-1 p-2 block w-full sm:text-sm border-2 border-gray-100 rounded-md"
                                        placeholder='Name of the Animal'
                                        required
                                    />
                                </div>
                                <div className='w-[200px] px-[20px]'>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">Funded
                                        Date</label>
                                    <input
                                        type="date"
                                        value={formData.catcher_date}
                                        name={'catcher_date'}
                                        onChange={handleChange}
                                        className="mt-1 p-2 block w-full sm:text-sm border-2 border-gray-100 rounded-md"
                                        required
                                    />
                                </div>
                                <div className='w-[200px] px-[20px]'>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">Age</label>
                                    <input
                                        type="number"
                                        min="1" max="150"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="mt-1 p-2 block w-full sm:text-sm border-2 border-gray-100 rounded-md"
                                        placeholder='Name of the Animal'
                                        required
                                        name={'age'}
                                    />
                                </div>
                                <div className='w-[200px] px-[20px]'>
                                    <label
                                        className="block text-sm font-medium text-gray-700 capitalize">Category</label>
                                    <select
                                        onChange={handleChange}
                                        value={formData.category}
                                        name="category" id="category"
                                        className="mt-1 p-2 block w-full sm:text-sm border-2 border-gray-100 rounded-md">
                                        <option value="Cat">Cat</option>
                                        <option value="Dog">Dog</option>
                                        <option value="Bird">Bird</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className='w-[200px] px-[20px]'>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">Available
                                        Status</label>
                                    <select
                                        onChange={handleChange}
                                        value={formData.available_status}
                                        name="available_status" id="available_status"
                                        className="mt-1 p-2 block w-full sm:text-sm border-2 border-gray-100 rounded-md">
                                        <option value="Available">Available</option>
                                        <option value="UnAvailable">UnAvailable</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-row space-[20px]'>
                                <div className='w-[400px] px-[20px]'>
                                    <label
                                        className="block text-sm font-medium text-gray-700 capitalize">Description</label>
                                    <textarea
                                        value={formData.description}
                                        name={'description'}
                                        onChange={handleChange}
                                        className="mt-1 p-2 h-[100px] block w-full sm:text-sm border-2 border-gray-100 rounded-md"
                                        placeholder='Write the Something in Animal'
                                        required
                                    />
                                </div>
                                <div className='w-[400px] px-[20px]'>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">Damage</label>
                                    <textarea
                                        value={formData.damage}
                                        onChange={handleChange}
                                        className="mt-1 p-2 h-[100px] block w-full sm:text-sm border-2 border-gray-100 rounded-md"
                                        placeholder='Damage in you funded animal'
                                        name={'damage'}
                                        required
                                    />
                                </div>
                                <div className='w-[400px] px-[20px]'>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">Catch
                                        Location</label>
                                    <textarea
                                        value={formData.catcher_location}
                                        onChange={handleChange}
                                        className="mt-1 p-2 h-[100px] block w-full sm:text-sm border-2 border-gray-100 rounded-md"
                                        placeholder='Location in Animal'
                                        name={'catcher_location'}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className='w-[300px] h-[200px] border-dashed border-2 border-gray-800 rounded-lg overflow-hidden relative flex justify-center'>
                                {selectedImage &&
                                <img ref={imgRef} className='h-[200px]' src={selectedImage} alt="Selected"/>}
                                <input onChange={handleFileChange} name={'file'}
                                       className='absolute inset-y-[-32px] h-[232px]' type='file'/>
                            </div>
                        </div>
                        <div className='w-[100%] flex justify-end px-[40px] pt-[20px] gap-[20px]'>
                            <button onClick={event => clearAll()} type="submit"
                                    className="w-[200px] text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Cancel
                            </button>
                            <button type="submit"
                                    className="w-[300px] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </section>
    </>)
}

export default Home;