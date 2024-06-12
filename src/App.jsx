import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Hero from "./Components/Hero.jsx";
import VideoPage from "./Components/VideoPage.jsx";


function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Hero/>}/>
                    <Route path="/videos" element={<VideoPage/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
