import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import "./lists.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectList({ projects }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        if (hoveredIndex !== null) {
            gsap.to(`.playground-grid-item:nth-child(${hoveredIndex + 1})`, {
                scale: 0.9,
                duration: 0.1,
                ease: "power3.out"
            });
        } else {
            gsap.utils.toArray(".playground-grid-item").forEach(item => {
                gsap.to(item, { scale: 1, duration: 0.1, ease: "power3.out" });
            });
        }
    }, [hoveredIndex]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray(".playground-grid-item").forEach(item => {
                gsap.from(item, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: { trigger: item, start: "top 50%", toggleActions: "play none none none" }
                });
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="project-grid">
            {projects.map((project, i) => (
                <div
                    key={project.id}
                    className={`playground-grid-item 
                        ${i % 8 === 0 ? "big" : ""}
                        ${i % 6 === 0 ? "tall" : ""}
                        ${i % 4 === 0 ? "wide" : ""}
                        ${hoveredIndex !== null && hoveredIndex !== i ? "grayscale" : ""}
                    `}
                >
                    <Link
                        to={`/projects/${project.slug}`} // ✅ lowercase fixes 404
                        className="block h-full"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <ProjectCard project={project} />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default ProjectList;
