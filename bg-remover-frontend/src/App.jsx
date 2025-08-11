import Menubar from "./Components/Menubar.jsx";
import Home from "./Pages/Home.jsx";
import Footer from "./Components/Footer.jsx";
import {Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";

const App = () => {
    return (
        <div>
            <Menubar/>
            <Toaster/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}
export default App;