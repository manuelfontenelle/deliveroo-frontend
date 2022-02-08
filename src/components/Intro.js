const Intro = ({ restaurant }) => {
	return (
		<div className="container">
			<div className="intro">
				<div className="left-intro">
					<h1>{restaurant.name}</h1>
					<p>{restaurant.description}</p>
				</div>

				<img className="img-intro" src={restaurant.picture} alt="" />
			</div>
		</div>
	);
};

export default Intro;
