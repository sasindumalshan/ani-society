import PetsCardGroup from "../PetsCardGroup/PetsCardGroup";
import PetsHome from "../PetsHome/PetsHome";
import {useState} from "react";
import axios from "axios";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";

function PetsPage() {

	const [selected_count, setSelected_count] = useState(0);
	const [selected_animals, setSelected_animals] = useState([]);

	const setAnimalData=(image:string,name:string,id:string)=>{
		axios.get(`http://localhost:3000/animals/${id}`)
			.then(response => {
				setSelected_animals(prevAnimals => [
					...prevAnimals,
					response.data
				]);
			})
			.catch(error => {
				alert(error)
			});

	}

	const removeAnimal = (animalId) => {
		setSelected_animals(selected_animals.filter(animal => animal.id !== animalId));
		decrement_selected_count()
	};

	const increment_selected_count=()=>{
		setSelected_count(selected_count+1)
	}

	const decrement_selected_count=()=>{
		setSelected_count(selected_count-1)
	}

	const reset_selected_animal_list=()=>{
		setSelected_animals([]);
	}
	const reset_selected_count=()=>{
		setSelected_count(0)
	}

	return (<>
		<Header></Header>
		<PetsHome
			key={selected_count}
			selected_count={selected_count}
			selected_animals={selected_animals}
			removeAnimal={removeAnimal}
			reset_selected_animal_list={reset_selected_animal_list}
			reset_selected_count={reset_selected_count}
		>
		</PetsHome>
		<PetsCardGroup increment_selected_count={increment_selected_count} setAnimalData={setAnimalData} />
		<Footer></Footer>
	</>)
}

export default PetsPage;