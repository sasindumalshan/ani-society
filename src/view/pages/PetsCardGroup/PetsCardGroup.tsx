import { useEffect, useState } from "react";
import AnimalCard from "../../common/AnimalCard/AnimalCard";
import axios from 'axios';

function PetsCardGroup({increment_selected_count,setAnimalData}) {
    const [animal, setAnimal] = useState([]);

    useEffect(() => {
       /* const fetchData = async () => {
            fetch('./animal.json')
                .then(response => response.json())
                .then(res => {
                    setAnimal(res);
                })
                .catch(error => {
                    console.error('Error fetching animal data:', error);
                });
        };

        fetchData();*/

        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/animals');
                const data = response.data;
                setAnimal(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div className="flex justify-center">
                <div className="gap-9 p-12 flex flex-wrap justify-center">
                    {
                        animal.map(value => (
                            <AnimalCard key={value.id} props={value} increment_selected_count={increment_selected_count} setAnimalData={setAnimalData}></AnimalCard>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default PetsCardGroup;