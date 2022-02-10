{
	basket.map((elem, index) => {
		return (
			<div key={elem.id} style={{ display: "flex" }}>
				<div>
					<button onClick={() => substractFromCart(elem)}>-</button>
					<span>{elem.quantity}</span>
					<button onClick={() => addBasket(elem)}>+</button>
				</div>
				<span> {elem.title}</span>
				<span> {Number(elem.price) * elem.quantity}</span>
			</div>
		)
	})
}
