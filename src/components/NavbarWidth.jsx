import { NavLink } from "react-router-dom";
import './NavBar.css';

function Navbar() {
    const links = [
        { name: "Projects", path: "/Projects" },
        { name: "Playground", path: "/Playground" },
        { name: "About", path: "/About" }
    ];

    return (
        <div>
            <ul className="navbar-width--ul">
                <li>
                    <NavLink
                        to={"/"}
                        className={({ isActive }) =>
                            `navbar-width--li ${isActive ? "active" : ""}`
                        }
                    >
                        <ion-icon name="home"></ion-icon>
                    </NavLink>
                </li>

                {links.map((link, index) => (
                    <li key={index} style={{ "--delay": `${index * 0.15}s` }}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                `navbar-width--li ${isActive ? "active" : ""}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Navbar;
