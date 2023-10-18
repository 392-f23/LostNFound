import { Outlet, NavLink } from "react-router-dom";
import "./Menu.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AuthButton from "../components/AuthButton";

const Menu = () => {
	return (
		<div className='main-layout'>
			<header className='header'>
				<nav className='w-100'>
					<h1 className='mx-auto' id='appName' data-cy='appName'>
						<span className='vertical-text'>Lost</span>
						<span className='nu-logo'>
							<img src='/nu-logo.jpg' alt='N' />
						</span>
						<span className='vertical-text'>Found</span>
						<AuthButton />
						{/* Put login component here */}
					</h1>
				</nav>
			</header>
			<main className='main-part'>
				<div style={{ marginTop: "0px" }}>
					<Outlet />
				</div>
			</main>
			<footer>
				<nav>
					<NavLink to='/' className='fl-button'>
						Found
					</NavLink>
					<Fab sx={{ flexBasis: 1 }} color='primary' aria-label='add'>
						<NavLink className='post-button' to='postpage'>
							<AddIcon />
						</NavLink>
					</Fab>
					<NavLink to='lostpage' className='fl-button'>
						Lost
					</NavLink>
				</nav>
			</footer>
		</div>
	);
};

export default Menu;
