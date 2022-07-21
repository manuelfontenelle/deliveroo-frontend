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
  const [basket, setBasket] = useState([]);

  let subTotal = 0;

  // à chaque modification d'un état, ce morceau de code est relancé
  basket.forEach((basketItem) => {
    console.log(basketItem);
    subTotal = subTotal + Number(basketItem.price) * basketItem.quantity;
  });

  let total = subTotal + 2.5;

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

  const addBasket = (meal) => {
    // push un 0 dans counters

    // Créer une copie de counters
    const newBasket = [...basket];
    // Est-ce que meal est déjà présent dans cart ?
    const exist = newBasket.find((elem) => elem.id === meal.id);

    if (exist) {
      // incrémenter exist.quantity
      exist.quantity++;
    } else {
      // ajouter une clé quantity dans meal
      meal.quantity = 1;
      newBasket.push(meal);
    }

    // newBasket.push(meal);
    // Mettre à jour l'état avec la copie
    setBasket(newBasket);
  };

  const substractFromCart = (meal) => {
    const newBasket = [...basket];
    // On cherche dans newCart l'objet pour lequel on veut décrémenter la quantité
    const exist = newBasket.find((elem) => elem.id === meal.id);
    if (exist.quantity === 1) {
      // supprimer l'élément du tableau
      // trouver l'index de l'élément à supprimer
      const index = newBasket.indexOf(exist);
      newBasket.splice(index, 1);
    } else {
      exist.quantity--;
    }

    setBasket(newBasket);
  };

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
              );
            })}
          </div>
          <div className="panier">
            <div className="container-panier ">
              <button className="btn-panier--validate btn-panier--disable">
                Valider mon paniersss
              </button>
              <div className="panier-content">
                <span>Votre panier est vide</span>

                {basket.map((elem, index) => {
                  return (
                    <div key={elem.id} style={{ display: "flex" }}>
                      <div>
                        <button onClick={() => substractFromCart(elem)}>
                          -
                        </button>
                        <span>{elem.quantity}</span>
                        <button onClick={() => addBasket(elem)}>+</button>
                      </div>
                      <span> {elem.title}</span>
                      <span> {Number(elem.price) * elem.quantity}</span>
                    </div>
                  );
                })}

                <div>
                  <p>Sous-total : {subTotal.toFixed(2)} €</p>
                  <p>Frais de livraison : 2.50€</p>
                  <p>Total : {total}</p>
                </div>
              </div>
            </div>
            {/* panier*/}
          </div>
          {/* container-main */}
        </div>
        {/* main */}
      </div>
    </div> //App
  );
}

export default App;
