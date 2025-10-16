import Navbar from "../components/Navbar";
import './About.css';
import about1 from '../assets/about1.png';
import about2 from '../assets/about2.png';
import about3 from '../assets/about3.png';
import arrow from '../assets/arrow.svg';
import { Link } from 'react-router-dom';
import line from "../assets/line.svg";
import Footer from '../components/Footer';
import NavbarWidth from '../components/NavbarWidth';
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import skill1 from "../assets/skill1.png";
import skill2 from "../assets/skill2.png";
import skill3 from "../assets/skill3.png";
import skill4 from "../assets/skill4.png";
import skill5 from "../assets/skill5.png";
import skill6 from "../assets/skill6.png";
import skill7 from "../assets/skill7.png";
import skill8 from "../assets/skill8.png";
import skill9 from "../assets/skill9.png";
import skill10 from "../assets/skill10.png";
import skill11 from "../assets/skill11.png";
import skill12 from "../assets/skill12.png";
import skill13 from "../assets/skill13.png";
import skill14 from "../assets/skill14.png";
import skill15 from "../assets/skill15.png";
import skill16 from "../assets/skill16.png";
import skill17 from "../assets/skill17.png";
import skill18 from "../assets/skill18.png";
import skill19 from "../assets/skill19.png";

import motionill from "../assets/motionill.png";
import designill from "../assets/designill.png";
import codeill from "../assets/codeill.png";

function About() {

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Fade in top 3 images sequentially
            gsap.utils.toArray([
                ".about-grid--img1",
                ".about-grid--img2",
                ".about-grid--img3"
            ]).forEach((img, i) => {
                gsap.from(img, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    delay: i * 0.3,
                    ease: "power3.out",
                });
            });

            // Intro text fade in on scroll
            gsap.utils.toArray(".about-intro--text > *").forEach((el, i) => {
                gsap.from(el, {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    delay: i * 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    }
                });
            });

            // Animate all h3 elements on scroll
            gsap.utils.toArray("h3").forEach((el) => {
                gsap.from(el, {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    }
                });
            });

            // Skillset wrapper fade in + skill items sequential
            gsap.from(".about-skillset--wrapper", {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-skillset--wrapper",
                    start: "top 80%",
                    toggleActions: "play none none none",
                    onEnter: () => {
                        gsap.utils.toArray(".skill-item").forEach((item, i) => {
                            gsap.from(item, {
                                opacity: 0,
                                y: 20,
                                duration: 0.6,
                                delay: i * 0.1,
                                ease: "power3.out"
                            });
                        });
                    }
                }
            });

            // Fade in .about-list items from Services section
            gsap.from(".services-section .about-list", {
                scrollTrigger: {
                    trigger: ".services-section",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
                opacity: 0,
                x: -50, // from left
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });

            // Fade in .about-list items from Why Choose Me section
            gsap.from(".choose-section .about-list", {
                scrollTrigger: {
                    trigger: ".choose-section",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
                opacity: 0,
                x: -50, // from left
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });

        });

        return () => ctx.revert();
    }, []);

    const skillCategories = [
        {
            category: "Design",
            skills: [
                { name: "Figma", image: skill1 },
                { name: "Blender", image: skill2 },
                { name: "After Effects", image: skill3 },
                { name: "Illustrator", image: skill4 },
                { name: "Audition", image: skill5 },
                { name: "Photoshop", image: skill6 },
                { name: "Premiere Pro", image: skill7 },
            ],
        },
        {
            category: "Code",
            skills: [
                { name: "VS Code", image: skill8 },
                { name: "HTML", image: skill9 },
                { name: "CSS", image: skill10 },
                { name: "JavaScript", image: skill11 },
                { name: "React", image: skill12 },
                { name: "PHP", image: skill13 },
                { name: "Vite", image: skill14 },
                { name: "Astro", image: skill15 },
                { name: "Strapi", image: skill16 },
                { name: "GSAP", image: skill17 },
                { name: "GitHub", image: skill18 },
                { name: "Arduino", image: skill19 },
            ],
        },
    ];

    return (
        <>
            <Navbar />
            <div className='navbar-width'>
                <NavbarWidth />
            </div>

            <div className="layout layout-about--top">
                <div className="about-grid">
                    <p>Hi, I am</p>
                    <h2>Lars Pieters</h2>
                    <img className="about-grid--img1" src={about1} alt="" />
                    <img className="about-grid--img2" src={about2} alt="" />
                    <img className="about-grid--img3" src={about3} alt="" />
                </div>
            </div>

            <div className="layout layout-about">
                <div className="about-intro--text">
                    <p>  Hi, I’m Lars. A 20-year-old Belgian student at <span className="bold">Devine</span>.<br /><br />
                        I’m passionate about 3D design and using visuals to make a real <span className="bold">impact</span>, not just to look good.<br /><br />
                        Outside of design, I love travelling, playing football, skiing, and discovering new music.</p>
                    <img className="line-element--about" src={line} alt="svg line element" />
                    <button className='primary'><Link className='Link-secondary letschat-button' to="https://www.instagram.com/smeshedup/">Let's chat<img src={arrow} alt="Arrow svg." /></Link></button>
                </div>

                <div className="about-skillset--wrapper">
                    <h3><span>skill</span> set</h3>
                    {skillCategories.map((category) => (
                        <div key={category.category} className="skill-category">
                            <p className="dark">{category.category}</p>
                            <ul className="skill-list">
                                {category.skills.map((skill) => (
                                    <li key={skill.name} className="skill-item">
                                        <img className="skill-img" src={skill.image} alt={skill.name} />
                                        <span className="skill-name">{skill.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Services Section */}
                <div className="layout-section about services-section">
                    <h3>my <span>services</span></h3>
                    <div className="about-list--wrapper">
                        <div className="about-list">
                            <p className="about-list--title">Design</p>
                            <img src={designill} alt="" />
                            <ul>
                                <li>branding</li>
                                <li>web/app design</li>
                                <li>advertisements</li>
                                <li>Illustrations</li>
                                <li>3D scene (static)</li>
                                <li>character design 2D/3D</li>
                            </ul>
                        </div>
                        <div className="about-list">
                            <p className="about-list--title">Code</p>
                            <img src={codeill} alt="" />
                            <ul>
                                <li>web development</li>
                                <li>small application</li>
                            </ul>
                        </div>
                        <div className="about-list">
                            <p className="about-list--title">Motion</p>
                            <img src={motionill} alt="" />
                            <ul>
                                <li>2D animation</li>
                                <li>3D animation</li>
                                <li>logo animation</li>
                                <li>product advertisement</li>
                            </ul>
                        </div>
                        <div className="note-about">
                            <p>Have an idea? And you don’t see it in the offers above? Don’t hesitate to contact me, so we can look together what’s possible.</p>
                            <div className="at-wrapper"><span className="at">@</span></div>
                        </div>
                    </div>
                </div>

                {/* Why choose me Section */}
                <div className="layout-section about choose-section">
                    <h3>Why <span>choose</span> me?</h3>
                    <div className="about-list--wrapper">
                        <div className="about-list">
                            <p className="about-list--title"><span className="brackets">[01]</span> Communication</p>
                            <p className="motivation-text"><span className="bold">Communication is key. </span>
                                The first thing I do is listen to your ideas.
                                Next, I establish clear communication.
                                The faster we can consult, the more time there is to focus on <span className="bold">your ideas! </span>
                                That’s why I prefer just chatting on Instagram.</p>
                        </div>
                        <div className="about-list">
                            <p className="about-list--title"><span className="brackets">[02]</span> Pricing</p>
                            <p className="motivation-text">The industry I work in is large. As a student, I am able to reduce the overall cost of a project.</p>
                        </div>
                        <div className="about-list">
                            <p className="about-list--title"><span className="brackets">[03]</span> Personal</p>
                            <p className="motivation-text">When I work with clients, I like to keep things <span className="bold">personal.</span> That helps create a better <span className="bold">understanding</span> between us.</p>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default About;
