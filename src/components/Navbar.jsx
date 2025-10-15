import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';
import Logo from "../assets/logo.png"
import arrow from '../assets/arrow.svg'


function Navbar() {
    const [active, setActive] = useState(false);

    const toggleHamburger = () => {
        setActive(!active);
    };

    useEffect(() => {
        if (active) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [active]);

    const links = [
        { name: "Projects", path: "/Projects" },
        { name: "Playground", path: "/Playground" },
        { name: "About", path: "/About" }
    ];


    return (
        <nav className={`navbar navbar-dark ${active ? 'menu-open' : ''}`}>
            <ul>
                <li>
                    <Link to="/">
                        <img className='menu-logo' src={Logo} alt="" />
                    </Link>
                </li>
                <li>
                    <label
                        className={`label-hamburger ${active ? "active" : ""}`}
                        htmlFor='menu'
                        tabIndex="0"
                        onClick={toggleHamburger}
                    >
                        <svg viewBox="0 0 100 80" width="40" height="40" className='list-item--hamburger'>
                            <rect width="100" height="10" rx="5" ry="5"></rect>
                            <rect y="30" width="100" height="10" rx="5" ry="5"></rect>
                            <rect y="60" width="100" height="10" rx="5" ry="5"></rect>
                        </svg>
                    </label>
                </li>
            </ul>

            <input id='menu' type='checkbox' checked={active} readOnly />
            <p className='navbar-middletext'><span className='bold-nav--light'>Lars Pieters</span> X <span className='bold-nav--medium'>SMESHEDUP</span></p>
            <button className='primary navbar-button'><Link to="https://www.instagram.com/smeshedup/" className='letschat-button'>Let's chat <img src={arrow} alt="arrow svg" /> </Link></button>


            <ul className={`menu-links ${active ? "open" : ""}`}>
                {links.map((link, index) => (
                    <li key={index} style={{ "--delay": `${index * 0.15}s` }}>
                        <Link className='nav-link' to={link.path}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
