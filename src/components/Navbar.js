import React from 'react'
import {Link} from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="nav-color">
			<div className="container">
				<div className="nav-wrapper">
					<Link to="/" className="brand-logo">CRUD</Link>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><Link to="/">Inicio</Link></li>
						<li><Link to="/about">Acerca de</Link></li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar;