import NavbarLight from "../components/NavbarLight"
import FooterLight from "../components/FooterLight"
import './Playground.css'
import playgroundimg from "../assets/playgroundimg.png"
import arrow from '../assets/arrow.svg'
import line from '../assets/line.svg'
import PlaygroundList from "../components/PlaygroundList"
import { useEffect, useState } from "react";
import fetchApi from "../lib/strapi";
import { Link } from "react-router-dom"
import NavbarWidth from "../components/NavbarWidth"

function Playground() {

    const [playgrounds, setPlaygrounds] = useState([]);

    useEffect(() => {
        async function loadPlaygrounds() {
            try {
                const data = await fetchApi({
                    endpoint: "playgrounds",
                    wrappedByKey: "data",
                    query: { populate: "*" },
                });
                setPlaygrounds(data);
            } catch (err) {
                console.error("Failed to fetch playground", err);
            }
        }
        loadPlaygrounds();
    }, []);

    return (
        <>
            <NavbarLight />

            <div className='navbar-width'>
                <NavbarWidth />
            </div>
            <div className='layout layout-playground'>
                <div className='layout-section  '>
                    <h2 className="keyboard">
                        <span className="key">P</span>
                        <span className="key">L</span>
                        <span className="key">A</span>
                        <span className="key">Y</span>
                        <span className="key">G</span>
                        <span className="key">R</span>
                        <span className="key">O</span>
                        <span className="key">U</span>
                        <span className="key">N</span>
                        <span className="key">D</span>
                    </h2>
                    <img className="full-width-img playground-img" src={playgroundimg} alt="" />
                    <div className="layout-section--playground">
                        <img className='line-element--playground' src={line} alt="svg line element" />
                        <p>My creative ideas, and visions gather in this place</p>
                        <button className='primary'><Link className='Link-secondary' to="/projects">Real projects</Link><img src={arrow} alt="arrow svg" /> </button>
                    </div>
                </div>
                <div className="layout-section">

                    <PlaygroundList playgrounds={playgrounds} />
                </div>
                <p className="light">These might not all be finished projects... Some are just experiments. That’s why I call this my playground. It’s important to keep experimenting and nurturing your <span className="bold-dark">creative side!</span></p>


                <FooterLight />
            </div>
        </>
    )
}

export default Playground
