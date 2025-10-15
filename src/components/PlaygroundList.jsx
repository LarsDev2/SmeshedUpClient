import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlaygroundCard from "./PlaygroundCard";
import './lists.css';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function PlaygroundList({ playgrounds }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray(".project-grid-item").forEach((item) => {
                gsap.from(item, {
                    y: 50,           // slide up from below
                    opacity: 0,      // start invisible
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,      // animate when this item enters viewport
                        start: "top 70%",   // adjust where it starts
                        toggleActions: "play none none none",
                    },
                });
            });
        });

        return () => ctx.revert(); // cleanup
    }, []);

    return (
        <div className="project-grid">
            {playgrounds.map((playground, i) => (
                <div
                    key={playground.id}
                    className={`project-grid-item 
            ${i % 8 === 0 ? "big" : ""}
            ${i % 6 === 0 ? "tall" : ""}
            ${i % 4 === 0 ? "wide" : ""}
            ${hoveredIndex !== null && hoveredIndex !== i ? "grayscale" : ""}
          `}
                >
                    <Link
                        to={`/Playground/${playground.slug}`}
                        className="block h-full"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <PlaygroundCard playground={playground} />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default PlaygroundList;
