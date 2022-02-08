import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Logo from "./assets/Deliveroo_logo.png";
import Header from "./components/Header";
import Intro from "./components/Intro";
import Category from "./components/Category";

function App() {
	console.log("Render !");
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		console.log("useEffect est déclenchée...");
		const fetchData = async () => {
			const response = await axios.get(
				"https://deliveroo-backend-manuelf.herokuapp.com/"
			);
			// const response = await axios.get("http://localhost:3200/");

			// console.log(response.data);
			// Sotcker response.data dans un state
			setData(response.data);
			setIsLoading(false);
		};

		fetchData();
	}, []);

	return isLoading ? (
		<div>En cours de chargement...</div>
	) : (
		<div className="App">
			<Header logo={Logo} />
			<Intro restaurant={data.restaurant} />
			<div className="main">
				<div className="container-main">
					<div className="container-categories">
						{data.categories.map((category, index) => {
							return (
								category.meals.length > 0 && (
									<Category key={index} category={category} />
								)
							);
						})}
					</div>
					<div className="panier">
						<div class="container-panier ">
							<button class="btn-panier--validate btn-panier--disable">
								Valider mon panier
							</button>
							<div className="panier-content">
								<span>Votre panier est vide</span>
							</div>
						</div>
					</div>
					{/* container-main */}
				</div>
				{/* main */}
			</div>
		</div> //App
	);
}

export default App;
