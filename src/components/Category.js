const Category = ({ category, addBasket }) => {
	return (
		<>
			<h2 className="category-title">{category.name}</h2>
			<div className="category">
				{category.meals.map((meal, index) => {
					return (
						<>
							<div
								className="category-item"
								key={meal.id}
								onClick={() => {
									addBasket(meal)
								}}
								// onClick={() => {
								// 	console.log(
								// 		"J'ai cliqué sur le produit ====> ",
								// 		meal
								// 	);
								// }}
							>
								<div className="category-item-left">
									<h3 className="category-item-title">
										{meal.title}
									</h3>
									<p className="category-item-desc">
										{meal.description.slice(0, 50)}...
									</p>
									<p className="category-item-price">
										{meal.price + " €"}
									</p>
								</div>
								{meal.picture && (
									<img
										className="category-item-img"
										src={meal.picture}
										alt=""
									/>
								)}
							</div>
						</>
					)
				})}
			</div>
		</>
	)
}

export default Category
