import React, { useEffect, useState } from "react";
//Para que se cargue cuando se renderiza el componente: useEffect(() => {
// Para enviar una lista vacía al servidor cuando el componente se monte por primera vez: postApi();
//Obtener datos del servidor al cargar el componente: getActivitys();}, []);



//create your first component
const Home = () => {
	const todosApi = 'https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/abarrelier_bg' //Link de la api
	const [inputValue, setInputValue] = useState("");
	const [activity, setActivity] = useState([]);


	//Funcion para ejecutar el eliminar del botton
	const sendActivity = (id) => {
		let newTasksList = activity.filter((to, index) => to.id !== id)
		let options = {
			method: 'PUT',
			body: JSON. stringify(newTasksList),
			headers: {
				"Content-Type": "application/json"
			}
		}
		fetch(todosApi, options)
			.then(response => response.json())
			.then(data => getActivitys())
			.catch(err => err)
		
	}

	//Funcion para recorrer el map
	const addActivity = () => {
		setActivity([{ label: inputValue, done: false }, ...activity]);
		setInputValue("");
		putActivities();
	}

	// Counter Tasks
	function TasksCounter() {
		if (activity.length === 0) return "No pending tasks";
		else if (activity.length === 1) return "You have 1 pending task";
		else return "You have " + activity.length + " pending tasks";
	}

	// Funcion para que el boton limpie todo de la lista
	function clearList() {
		setActivity([]); // Frontend
		putActivities(); // Backend
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
	// (Add & Delete) Update the API with fetch


	const putActivities = () => {

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		//var raw = JSON.stringify([{ label: inputValue, done: false }, ...activity]); // recorrer el arreglo completo y lo agrega
		 var raw = JSON.stringify(activity);
		let options = {
			method: 'PUT',
			body: raw,
			headers: myHeaders
		}
		fetch(todosApi, options)
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(err => err)
	}


	// Fetch  GET API
	const getActivitys = () => {
		fetch(todosApi)
			.then((response) => {
				if (response.ok) return response.json();
				else postApi();
			})
			.then((data) => setActivity(data))
			.catch((err) => console.log(err));
	};


	//Para que se cargue cuando se renderiza el componente
	useEffect(() => {
		getActivitys();
	}, []);


	//Aqui empieza el to-do-list//
	return (
		<div className="container-fluid">
			<h1>To Do List </h1>
			<div className="container-task">
				<div className="pendientes">
					{TasksCounter()}
				</div>
				<input className="input"
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							addActivity()
						}
					}}
					placeholder="Add a new task"
				/>
				<ul className="list-group list-group-flush">
					{activity.map((t, i) => {
						return (
							<li className="list-group-item" key={i}>
								<label>{t.label}</label>
								<button className="button-task" onClick={() => {
									sendActivity(t.id)
								}}><i className="fas fa-times"></i></button>
							</li>
						)
					})}
				</ul>
				<hr />
				<button className="btn btn-danger mt-2"
					onClick={() => {
						clearList();
					}}
				>
					Delete All Tasks
				</button>
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