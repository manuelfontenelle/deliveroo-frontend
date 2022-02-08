const Category = ({ category }) => {
	return (
		<>
			<h2 className="category-title">{category.name}</h2>
			<div class="category">
				{category.meals.map((meal, index) => {
					return (
						<>
							<div class="category-item" key={index}>
								<div class="category-item-left" key={index}>
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
					);
				})}
			</div>
		</>
	);
};

export default Category;
