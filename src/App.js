import "./App.css"
import axios from "axios"
import { useState, useEffect } from "react"
import Logo from "./assets/Deliveroo_logo.png"
import Header from "./components/Header"
import Intro from "./components/Intro"
import Category from "./components/Category"

import { library } from "@fortawesome/fontawesome-svg-core"
import {
	faStar,
	faHome,
	faPlusCircle,
	faMinusCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
library.add(faStar, faHome, faPlusCircle, faMinusCircle)

function App() {
	console.log("Render !")
	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)
	const [basket, setBasket] = useState([])

	let subTotal = 0

	// à chaque modification d'un état, ce morceau de code est relancé
	basket.forEach((basketItem) => {
		console.log(basketItem)
		subTotal = subTotal + Number(basketItem.price) * basketItem.quantity
	})

	let total = subTotal + 2.5

	useEffect(() => {
		console.log("useEffect est déclenchée...")
		const fetchData = async () => {
			const response = await axios.get(
				"https://deliveroo-backend-manuelf.herokuapp.com/"
			)
			// const response = await axios.get("http://localhost:3200/");

			// console.log(response.data);
			// Sotcker response.data dans un state
			setData(response.data)
			setIsLoading(false)
		}

		fetchData()
	}, [])

	const addBasket = (meal) => {
		// //AUTRE FACON DE FAIRE POUR DETECTER SI UN ELEMENT EXISTE ET INCREMENTTER LA QUANTITE
		// //rechercher dans newBasket, si le produits n' a pas deja été ajouté
		// for (let i = 0; i < basket.length; i++) {
		// 	//on se sert de l'id car unique
		// 	if (basket[i].id === meal.id) {
		// 		newBasket[i].quantity++
		// 		//le break sert a interrompre la boucle
		// 		break
		// 	}else (newBasket.push(meal))
		// }

		// push un 0 dans counters

		// Créer une copie de counters
		const newBasket = [...basket]
		// Est-ce que meal est déjà présent dans cart ?
		const exist = newBasket.find((elem) => elem.id === meal.id)

		if (exist) {
			// incrémenter exist.quantity
			exist.quantity++
		} else {
			// ajouter une clé quantity dans meal
			meal.quantity = 1
			newBasket.push(meal)
		}

		// newBasket.push(meal);
		// Mettre à jour l'état avec la copie
		setBasket(newBasket)
	}

	const substractFromCart = (meal) => {
		const newBasket = [...basket]

		// On cherche dans newCart l'objet pour lequel on veut décrémenter la quantité
		const exist = newBasket.find((elem) => elem.id === meal.id)
		if (exist.quantity === 1) {
			// supprimer l'élément du tableau
			// trouver l'index de l'élément à supprimer
			const index = newBasket.indexOf(exist)
			newBasket.splice(index, 1)
		} else {
			exist.quantity--
		}

		setBasket(newBasket)
	}

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
									<Category
										key={index}
										category={category}
										addBasket={addBasket}
									/>
								)
							)
						})}
					</div>
					<div className="panier">
						<div className="container-panier ">
							<button
								className={`btn-panier ${
									basket.length > 0
										? "btn-panier--validate"
										: "btn-panier--disable"
								}`}
							>
								Valider mon paniers
							</button>
							<div className="panier-content">
								{basket.length === 0 && <span>Votre panier est vide</span>}
								<div className={basket.length > 0 && "cartItems"}>
									{basket.map((elem, index) => {
										return (
											<div className="cartLine" key={elem.id}>
												<div className="cartLine--counter">
													<span
														className="cartLine--icon"
														onClick={() => substractFromCart(elem)}
													>
														<FontAwesomeIcon icon="minus-circle" />
													</span>
													<span className="cartLine--quantity">
														{elem.quantity}
													</span>
													<span
														className="cartLine--icon"
														onClick={() => addBasket(elem)}
													>
														<FontAwesomeIcon icon="plus-circle" />
													</span>
												</div>
												<span className="cartLine--name"> {elem.title}</span>
												<span className="cartLine--price">
													{" "}
													{(elem.price * elem.quantity).toFixed(2)} €
												</span>
											</div>
										)
									})}
								</div>
								{basket.length > 0 && (
									<>
										<div className="cartLineResult">
											<span className="cartLineResult--line">
												<span className="cartLineResult--item1">
													Sous-total
												</span>
												<span className="cartLineResult--item2">
													{subTotal.toFixed(2)} €
												</span>
											</span>
											<span className="cartLineResult--line">
												<span className="cartLineResult--item1">
													Frais de livraison
												</span>
												<span className="cartLineResult--item2">2.50 €</span>
											</span>
										</div>
										<span className="cartLineTotal">
											<span className="cartLineTotal--item1">Total </span>
											<span className="cartLineTotal--item2">
												{total.toFixed(2)} €
											</span>
										</span>
									</>
								)}
							</div>
						</div>
						{/* panier*/}
					</div>
					{/* container-main */}
				</div>
				{/* main */}
			</div>
		</div> //App
	)
}

export default App
