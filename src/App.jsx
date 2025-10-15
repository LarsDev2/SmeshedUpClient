// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home.jsx";
import About from "./routes/About.jsx";
import Playground from "./routes/Playground.jsx";
import Projects from "./routes/Projects.jsx";
import ProjectDetail from "./routes/ProjectDetail.jsx";
import PlaygroundDetail from "./routes/PlaygroundDetail.jsx";
import ScrollToTop from "./ScrollToTop.jsx";


export default function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Playground" element={<Playground />} />
                <Route path="/Playground/:slug" element={<PlaygroundDetail />} />
                <Route path="/Projects" element={<Projects />} />
                <Route path="/Projects/:slug" element={<ProjectDetail />} />
            </Routes>
        </>
    );
}
