import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Logo from "./assets/Deliveroo_logo.png";

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
			<div className="header">
				<img className="logo" src={Logo} alt="" />
			</div>

			<div className="intro">
				<div className="left">
					<h1>{data.restaurant.name}</h1>
					<p>{data.restaurant.description}</p>
				</div>

				<img
					className="img-intro"
					src={data.restaurant.picture}
					alt=""
				/>
			</div>

			<div className="main">
				{/* <h2>{data.categories.description}</h2> */}

				{data.categories.map((item, index) => {
					// console.log(item);
					return (
						// pour chaque élément du tableau MoviesList, on retourne un composant Section
						// on passe en props au composant Section : category -> item.category et images -> item.images
						// <Section key={index} category={item.category} images={item.images} />

						<div class="category" key={index}>
							<h2 className="category-title">{item.name}</h2>
							{item.meals.map((item, index) => {
								return (
									<>
										<div class="category-item" key={index}>
											<div
												class="category-item-left"
												key={index}
											>
												<h3 className="category-item-title">
													{item.title}
												</h3>
												<p className="category-item-desc">
													{item.description}
												</p>
												<p className="category-item-price">
													{item.price + " €"}
												</p>
											</div>
											<img
												className="category-item-img"
												src={item.picture}
												alt=""
											/>
										</div>
									</>
								);
							})}
						</div>
					);
				})}
			</div>

			{/* {MoviesList.map((item, index) => {
        return (
          // pour chaque élément du tableau MoviesList, on retourne un composant Section
          // on passe en props au composant Section : category -> item.category et images -> item.images
          <Section key={index} category={item.category} images={item.images} />
        );
      })} */}
		</div>
	);
}

export default App;
