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
                <Route path="/about" element={<About />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/playground/:slug" element={<PlaygroundDetail />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
            </Routes>
        </>
    );
}
