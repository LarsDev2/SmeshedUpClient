import './Footer.css';
import { Link } from "react-router-dom";
import Bigline from "../assets/linebig.png"
import Logo from "../assets/logodark.png"


function Footer() {

    return (
        <div className='footer-light'>
            <img src={Bigline} alt="" className='full-width-img footer-line' />
            <ul>
                <li><a href="www.smeshedup.studio" className='footer-link--light'><span className='gradient'>www</span>.smeshedup.studio</a></li>
                <li><a href="mailto:larspieters@telenet.be" className='footer-link--light'>larspieters@telenet.be</a></li>
                <li><a href="https://www.instagram.com/smeshedup/" className='footer-link--light'>Instagram</a></li>
            </ul>
            <Link to="/">
                <img className='menu-logobig-light' src={Logo} alt="" />
            </Link>
        </div>
    );
}

export default Footer;
