import './Footer.css';
import LogoBig from "../assets/logobig.png"
import { Link } from "react-router-dom";
import Bigline from "../assets/linebig.png"


function Footer() {

    return (
        <div className='footer'>
            <img src={Bigline} alt="" className='full-width-img footer-line' />
            <ul>
                <li><a href="www.lars-pieters.be" className='footer-link'><span className='gradient'>www</span>.lars-pieters.be</a></li>
                <li><a href="mailto:larspieters@telenet.be" className='footer-link'>larspieters@telenet.be</a></li>
                <li><a href="https://www.instagram.com/smeshedup/" className='footer-link'>Instagram</a></li>
            </ul>
            <Link to="/">
                <img className='menu-logobig' src={LogoBig} alt="" />
            </Link>
        </div>
    );
}

export default Footer;
