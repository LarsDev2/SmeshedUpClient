import './Home.css'
import Navbar from '../components/Navbar'
import finalrenderios from '../assets/heroimg.mov'
import imgfallback from '../assets/finalrender.png'
import arrow from '../assets/arrow.svg'
import avatar from '../assets/avatar.png'
import line from '../assets/line.svg'
import img from '../assets/latestprojectimg.png'
import img2 from '../assets/latestprojectimg2.png'
import externlink from '../assets/externlink.png'
import playground from '../assets/playgroundbg.png'
import whitearrow from '../assets/whitearrow.svg'
import Footer from '../components/Footer'
import vzwzonnebeke from '../assets/vzwzonnebeke.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import NavbarWidth from '../components/NavbarWidth'

function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const startTime = Date.now();

    // Preload all images
    const images = [img, img2, avatar, line, externlink, playground, whitearrow, imgfallback];
    let loadedCount = 0;

    images.forEach((src) => {
      const image = new Image();
      image.src = src;
      image.onload = image.onerror = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(1500 - elapsed, 0); // ensure 1.5s minimum load
          setTimeout(() => setLoading(false), remaining);
        }
      };
    });

    const video = document.createElement('video');
    video.src = finalrenderios;
    video.onloadeddata = () => { };

  }, []); // 🔹 Preload effect runs only once

  // 🔹 Run GSAP animations only after loading is finished
  useEffect(() => {
    if (loading) return; // prevents GSAP from running before DOM is ready

    const ctx = gsap.context(() => {

      // --- Testimonials animation ---
      gsap.set(".card-testimonial", { y: "10vh", opacity: 0 });
      gsap.to(".card-testimonial", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-wrapper",
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      });

      // --- Animate h3 headings ---
      gsap.utils.toArray("h3").forEach((el) => {
        gsap.from(el, {
          y: "5vh",
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
            immediateRender: false,
          },
        });
      });

      // --- Latest project grid animation ---
      gsap.set(".latest-project--grid", { y: "10vh", opacity: 0 });
      gsap.to(".latest-project--grid", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".latest-project--grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

    });

    return () => ctx.revert(); // cleanup GSAP context when component unmounts

  }, [loading]);

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className='navbar-width'>
        <NavbarWidth />
      </div>
      <div className='hero'>
        <span className='testimonials--link'>Real testimonials from clients</span>
        <div className='grid-item--1'>
          <h1>Code, <br /> Design & 3D</h1>
          <span className='tagline'>I don't do boring.</span>
        </div>
        <video className='updown' autoPlay loop muted playsInline preload="auto" poster={imgfallback}>
          <source src={finalrenderios} type="video/mp4" />
        </video>
        <div className='contact-wrapper'>
          <div className='contact-flex'>
            <img className='contact-avatar' src={avatar} alt="photo of me" />
            <div>
              <p className='contact-name'>Lars Pieters</p>
              <p className='contact-company'>A.K.A. SmeshedUp</p>
            </div>
          </div>
          <button className='primary contact-button--home'><Link className='letschat-button' to="https://www.instagram.com/smeshedup/">Let's chat <img src={arrow} alt="arrow svg" /></Link> </button>
        </div>
      </div>

      <div className='layout layout-home'>
        <img className='line-element--1' src={line} alt="svg line element" />
        <div className='layout-section center testimonial-wrapper '>
          <h3 className='text-center'>testimonials from <span>clients</span></h3>
          <div className='card-testimonial'>
            <div className='card-testimonial--wrapper-text'>
              <img src={vzwzonnebeke} alt="" />
              <div>
                <p className='testimonial-person'>Lars Courtens</p>
                <p className='testimonial-company'>VZW Zonnebeke</p>
              </div>
            </div>
            <p className='text-center'>A young, driven man who knows how to tackle things. I received a very clear briefing beforehand with targeted questions and answers, and I was equally pleased with the result. Beautiful layout, lovely colors... In short, a top-notch designer!
            </p>
            <span>''</span>
          </div>
        </div>



        <div className='layout-section'>
          <h3>latest <span>project</span></h3>
          <span className='project-date'>• 22 AUGUST 2025</span>
          <div className='latest-project--grid'>
            <div className='latest-project--text'>
              <span className='latest-project--title'>brief</span>
              <p >“Create a social-media advertisement for a new streetsoccer tournament”</p>
            </div>
            <img className='latest-project--img' src={img} alt="Image of latest project." />
            <img className='latest-project--img2' src={img2} alt="Image of latest project." />
            <div className='latest-project--text2'>
              <span className='latest-project--title'>client</span>
              <p>VZW Zonnebeke</p>
            </div>
          </div>
          <div className='project-button--wrapper'>
            <button className='primary'><Link className='Link-secondary' to="/Projects/street-soccer-event">Full project</Link><img src={arrow} alt="Arrow svg." /> </button>
            <button className='secondary-button'><Link className='Link' to="/projects">
              All projects
            </Link><img src={externlink} alt="Extern link icon." /></button>
          </div>
        </div>

        <div className='layout-section'>
          <div className="carousel full-width-img">
            <div className="track">
              <h4>Motion Design</h4>
              <h4>3D Animations</h4>
              <h4>Branding</h4>
              <h4>3D Models/Scenes</h4>
              <h4>Web Development</h4>
              <h4>Web Design</h4>
              <h4>Logo Design</h4>
              <h4>Illustrations</h4>
              <h4>Motion Design</h4>
              <h4>3D Animations</h4>
              <h4>Branding</h4>
              <h4>3D Models/Scenes</h4>
              <h4>Web Development</h4>
              <h4>Web Design</h4>
              <h4>Logo Design</h4>
              <h4>Illustrations</h4>
            </div>
          </div>
        </div>

        <div className='layout-section playground'>
          <img className='full-width-img' src={playground} alt="" />
          <div className='playground-text'>
            <span>playground</span>
            <p>“Creative place where my visions and ideas come together”</p>
            <button className='secondary-button'><Link className='Link' to="/playground">
              <img src={whitearrow} alt="arrow svg" />
            </Link></button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Home
