const Header = ({ logo }) => {
	return (
		<div className="container-header">
			<div className="header container">
				<img className="logo" src={logo} alt="" />
			</div>
		</div>
	);
};

export default Header;
