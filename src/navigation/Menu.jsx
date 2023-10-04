import { Outlet, NavLink } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="main-layout">
      <header className="header">
        <nav>
          <h1 className="mx-auto" id="appName" data-cy="appName">
            <span className="vertical-text">Lost</span>
            <span className="nu-logo">
              <img src="src/images/nu-logo.jpg" alt="N" />
            </span>
            <span className="vertical-text">Found</span>
          </h1>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <nav>
          <NavLink to="foundpage" id="feedButton">
            Found
          </NavLink>
          <NavLink to="lostpage">Lost</NavLink>
          <NavLink to="postpage">Post</NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default Menu;
