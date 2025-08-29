import Menubar from "./Components/Menubar.jsx";
import Home from "./Pages/Home.jsx";
import Footer from "./Components/Footer.jsx";
import {Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import UserSyncHandler from "./Components/UserSyncHandler.jsx";
import Result from "./Pages/Result.jsx";
import {RedirectToSignIn, SignedIn, SignedOut} from "@clerk/clerk-react";
import BuyCredits from "./Pages/BuyCredits.jsx";

const App = () => {
    return (
        <div>
            <UserSyncHandler/>
            <Menubar/>
            <Toaster/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/pricing" element={<BuyCredits/>}/>
                {/*Protected Route*/}
                <Route path="/result" element={
                    <>
                        <SignedIn>
                            <Result/>
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn/>
                        </SignedOut>
                    </>
                }/>
            </Routes>
            <Footer/>
        </div>
    )
}
export default App;