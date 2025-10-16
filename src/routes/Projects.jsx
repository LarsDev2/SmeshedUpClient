import ProjectList from "../components/ProjectList";
import { useEffect, useState } from "react";
import fetchApi from "../lib/strapi";
import NavbarLight from "../components/NavbarLight";
import "./Projects.css";
import line from "../assets/line.svg";
import FooterLight from "../components/FooterLight";
import NavbarWidth from "../components/NavbarWidth";

function Projects() {
    const [projects, setProjects] = useState(null); // null triggers loader
    const [filter, setFilter] = useState("school"); // default filter
    const [loading, setLoading] = useState(true); // control loader timing

    useEffect(() => {
        const startTime = Date.now();

        async function loadProjects() {
            try {
                const data = await fetchApi({
                    endpoint: "projects",
                    wrappedByKey: "data",
                    query: { populate: "*" },
                });
                setProjects(data);

                const elapsed = Date.now() - startTime;
                const remainingTime = Math.max(500 - elapsed, 0); // ensure at least 1s
                setTimeout(() => setLoading(false), remainingTime);
            } catch (err) {
                console.error("Failed to fetch projects", err);
                setLoading(false);
            }
        }

        loadProjects();
    }, []);

    // Show loader until loading is false
    if (loading) {
        return (
            <div className="loader-overlay">
                <div className="spinner"></div>
                <p>loading projects, <br />this can take a minute...</p>
            </div>
        );
    }

    const filteredProjects = (projects || []).filter(
        (p) => p && p.type === filter
    );

    return (
        <>
            <NavbarLight />
            <div className='navbar-width'>
                <NavbarWidth />
            </div>
            <div className="layout-projects">
                <div className="center">
                    <h2>Projects</h2>
                    <img
                        className="line-element--playground"
                        src={line}
                        alt="svg line element"
                    />
                </div>

                <div className="project-list--andbuttons">
                    <div className="filter-buttons">
                        <button
                            className={filter === "school" ? "active" : ""}
                            onClick={() => setFilter("school")}
                        >
                            School
                        </button>
                        <button
                            className={filter === "client" ? "active" : ""}
                            onClick={() => setFilter("client")}
                        >
                            Client
                        </button>
                    </div>

                    <ProjectList projects={filteredProjects} />
                </div>

                <FooterLight />
            </div>
        </>
    );
}

export default Projects;
