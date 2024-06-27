import axios from "axios";
import {ChangeEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import image from '/src/image/img-chooser.png'

function Animal() {
    const initialFormData = {
        id: "A001",
        name: "",
        available_status: "",
        description: "",
        imgsrc:"",
        catcher_location: "",
        catcher_date: "",
        damage: "",
        age: "",
        category: ""
    };
    const [selectedImage, setSelectedImage] = useState(image);

    const [formData, setFormData] = useState(initialFormData);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        /*axios.post("http://localhost:3000/animals", JSON.stringify(formData))
            .then(response => {
                console.log("Success:", response.data);
                setFormData(initialFormData)
            })
            .catch(error => {
                console.error("Error:", error);
            });*/

        const formData = new FormData(event.target);
        const jsonData = {};

        for (let [key, value] of formData.entries()) {
            jsonData[key] = value;
        }

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
            alert("Complained to Ani Society team")
        } catch (error) {
            console.error('Error:', error);
            alert("Complained failed")
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

    const [animals, setAnimals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [animalsPerPage] = useState(4); // Number of animals to display per page
    const [totalPages, setTotalPages] = useState(0);

  /*  useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/animals');
                setAnimals(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once after initial render*/

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/animals?page=${currentPage}&limit=${animalsPerPage}`);
                setAnimals(response.data.animals);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentPage, animalsPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (<>
        <div className='flex flex-col items-start h-screen'>
            <div className='w-100 p-10 font-bold text-[20px] pb-0'>Animals</div>
            <section className='flex justify-center items-center mx-[40px] mt-[20px]'>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold mb-6">Add Animal</h1>
                    <form onSubmit={handleSubmit} className="flex flex-row flex-wrap items-center">
                        <div>
                            <div className='flex flex-row space-[20px]'>
                                <div className='w-[400px] px-[20px]'>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">Name</label>
                                    <input
                                        type="text"
                                        value={formData[formData.name]}
                                        name={'name'}
                                        onChange={handleChange}
                                        className="mt-1 p-2 block w-full sm:text-sm border-2 border-gray-100 rounded-md"
                                        placeholder='Name of the Animal'
                                        required
                                    />
                                </div>
                                <div className='w-[200px] px-[20px]'>
                                    <label className="block text-sm font-medium text-gray-700 capitalize">Funded Date</label>
                                    <input
                                        type="date"
                                        value={formData[formData.catcher_date]}
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
                                        value={formData[formData.age]}
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
                                        value={formData[formData.category]}
                                        name="category" id="category" className="mt-1 p-2 block w-full sm:text-sm border-2 border-gray-100 rounded-md">
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
                                        value={formData[formData.available_status]}
                                        name="available_status" id="available_status" className="mt-1 p-2 block w-full sm:text-sm border-2 border-gray-100 rounded-md">
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
                                        value={formData[formData.description]}
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
                                        value={formData[formData.damage]}
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
                                        value={formData[formData.catcher_location]}
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
                                {selectedImage && <img className='h-[200px]' src={selectedImage} alt="Selected" />}
                                <input onChange={handleFileChange} name={'file'} className='absolute inset-y-[-32px] h-[232px]' type='file'/>
                            </div>
                        </div>
                        <div className='w-[100%] flex justify-end px-[40px] pt-[20px]'>
                            <button type="submit"
                                    className="w-[300px] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <div className='w-100 flex  justify-center p-10'>
                <table className="table-fixed w-[100%]   ">
                    <thead>
                    <tr className='text-left rounded-[8px] bg-red border-b-2 border-t-2'>
                        <th className='p-[10px]'>Name</th>
                        <th className='p-[10px]'>Date</th>
                        <th className='p-[10px]'>Age</th>
                        <th className='p-[10px]'>Category</th>
                        <th className='p-[10px]'>Status</th>
                        <th className='p-[10px]'>Description</th>
                        <th className='p-[10px]'>Damage</th>
                        <th className='p-[10px]'>Location</th>
                        <th className='p-[10px]'><img width='20px' src='/src/image/1654371_three%20dots_icon.png'/></th>
                    </tr>
                    </thead>
                    <tbody>
                   {/* <tr>
                        <td className='p-[10px]'>Name</td>
                        <td className='p-[10px]'>Date</td>
                        <td className='p-[10px]'>Age</td>
                        <td className='p-[10px]'>Category</td>
                        <td className='p-[10px]'>Status</td>
                        <td className='p-[10px]'>Description</td>
                        <td className='p-[10px]'>Damage</td>
                        <td className='p-[10px]'>Location</td>
                        <button>
                            <img width='40px' className='p-3' src='/src/image/pen-to-square-regular.svg'/>
                        </button>
                        <button>
                            <img width='40px' className='p-3' src='/src/image/trash-solid.svg'/>
                        </button>
                    </tr>
                    <tr>
                        <td className='p-[10px]'>Name</td>
                        <td className='p-[10px]'>Date</td>
                        <td className='p-[10px]'>Age</td>
                        <td className='p-[10px]'>Category</td>
                        <td className='p-[10px]'>Status</td>
                        <td className='p-[10px]'>Description</td>
                        <td className='p-[10px]'>Damage</td>
                        <td className='p-[10px]'>Location</td>
                        <button>
                            <img width='40px' className='p-3' src='/src/image/pen-to-square-regular.svg'/>
                        </button>
                        <button>
                            <img width='40px' className='p-3' src='/src/image/trash-solid.svg'/>
                        </button>
                    </tr>*/}
                   {animals.map(animal => (
                       <tr key={animal._id.$oid}>
                           <td className='p-[10px]'>{animal.name}</td>
                           <td className='p-[10px]'>{animal.catcher_date}</td>
                           <td className='p-[10px]'>{animal.age}</td>
                           <td className='p-[10px]'>{animal.category}</td>
                           <td className='p-[10px]'>{animal.available_status}</td>
                           <td className='p-[10px]'>{animal.description}</td>
                           <td className='p-[10px]'>{animal.damage}</td>
                           <td className='p-[10px]'>{animal.catcher_location}</td>
                           <td className='p-[10px]'>
                               <button>
                                   <img width='40px' className='p-3' src='/src/image/pen-to-square-regular.svg' alt="Edit" />
                               </button>
                               <button>
                                   <img width='40px' className='p-3' src='/src/image/trash-solid.svg' alt="Delete" />
                               </button>
                           </td>
                       </tr>
                   ))}

                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            <div className="pagination w-[100%] flex justify-center gap-3">
                <button
                    onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            </div>
    </>)
}

export default Animal;