import React, { useEffect, useState } from "react";


//create your first component
const Home = () => {

	//Link de la api
	const todosApi = 'https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/abarrelier_bg'
	const [inputValue, setInputValue] = useState("");
	const [activity, setActivity] = useState([]);

	//Funcion para ejecutar el eliminar del boton
	const sendActivity = (i) => {
		putActivitys()
		setActivity([{label: updatedActivity, done: false},...activity]);
	}

	//Funcion para recorrer el map
	const addActivity = () => {
		setActivity(activity.concat(inputValue));
		setInputValue("");
	}

	// Fetch  GET API
	const getActivitys = () => {
		fetch(todosApi)
			.then((response) => {
				if (response.ok)
					return response.json()
				else postApi()
			})
			.then((data) => setActivity(data))
			.catch((err) => console.log(err));
	}

	//POST API Todos

	const postApi = () => {

		fetch(todosApi, {
			method: 'POST',
			body: JSON.stringify([]),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(err => err)
	}

	//put

	const putActivitys = () => {

		var raw = JSON.stringify([{ label: activity, done: false }, ...activity]); // recorrer el arreglo completo y lo agrega
		let options = {
			method: 'PUT',
			body: raw,
			headers: {
				'Content-Type': 'aplication/json'
			}
		}
		fetch(todosApi, options)
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(err => err)
	}



	//Para que se cargue cuando se renderiza el componente
	useEffect(() =>
		getActivitys()
	)














	//Aqui empieza el todo-list//
	return (
		<div className="container-fluid">
			<h1>Todos</h1>
			<div className="container-task">
				<input className="input"
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							addActivity()

						}
					}}
					placeholder="¿What do you need?"
				/>
				<ul className="list-group list-group-flush">
					{activity.map((t, i) => {
						return (
							<li className="list-group-item" key={i}>
								<label>{t}</label>
								<button className="button-task" onClick={() => {
									sendActivity(i)
								}}><i className="fas fa-times"></i></button>
							</li>
						)
					})}
				</ul>
				<hr />
				<div className="pendientes">{activity.length == 0 ? "No tasks, add a tasks items left" :
					activity.length + " Items left"}</div>
			</div>
		</div>
	);
};

export default Home;


  //Falta la propiedad key: Dentro del método map en el elemento <li>, faltaba agregar la propiedad key para cada elemento de la lista.
  //activity: Es la matriz de datos sobre la cual se va a iterar.
//map: Es el método de la matriz que llama a una función para cada elemento de la matriz y devuelve un nuevo array con los resultados.
//(t, i) => ...: Es la función de devolución de llamada (callback) que se ejecuta para cada elemento de activity. Aquí, t representa cada elemento de activity en cada iteración, y i representa el índice del elemento actual.
//<li key={i}>...</li>: Es el elemento JSX que se crea en cada iteración. La propiedad key={i} se utiliza para ayudar a React a identificar de forma única cada elemento de la lista y mejorar el rendimiento del renderizado.
//<li key={i}>{t} //Si quiero que la cuente i+1//</li>