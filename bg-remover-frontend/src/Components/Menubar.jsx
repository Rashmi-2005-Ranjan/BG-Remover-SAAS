import {useContext, useState} from "react";
import {assets} from "../assets.js";
import {Menu, X} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {SignedIn, SignedOut, useClerk, UserButton, useUser} from "@clerk/clerk-react";
import {AppContext} from "../Context/AppContext.jsx";

const Menubar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const {openSignIn, openSignUp} = useClerk();
    const {user} = useUser();
    const {credit} = useContext(AppContext)
    const openRegister = () => {
        setMenuOpen(false);
        openSignUp({});
    }
    const openLogin = () => {
        setMenuOpen(false);
        openSignIn({});
    }
    return (
        <nav className="backdrop-blur-md border-b border-white/10 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
            {/* Logo Section + Text*/}
            <Link to="/" className="flex items-center space-x-2">
                <img
                    src={assets.logo}
                    alt="logo"
                    className="h-8 w-8 object-contain cursor-pointer invert"
                />
                <span className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer">
                    Clearify<span className="text-gray-400 cursor-pointer">Pro</span>
                </span>
            </Link>

            {/* Right Side : Action Buttons */}
            <div className="hidden md:flex items-center space-x-4 justify-between">
                <SignedOut>
                    <button className="text-gray-300 hover:text-purple-400 font-medium cursor-pointer transition-colors duration-300"
                            onClick={openLogin}>
                        Login
                    </button>
                    <button
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-2 rounded-full transition-all cursor-pointer hover:shadow-lg hover:shadow-purple-500/50"
                        onClick={openRegister}>
                        Sign Up
                    </button>
                </SignedOut>
                <SignedIn>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button onClick={() => navigate("/pricing")}
                                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 sm:px-5 py-1.5 sm:py-2.5 rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer">
                            <img src={assets.dollar} alt="credit" height={24} width={24} className="brightness invert"/>
                            <p className="text-xs sm:text-sm font-medium text-gray-300">
                                Credits: <span className="text-purple-400 font-semibold">{credit}</span>
                            </p>
                        </button>
                        <p className="text-gray-300 max-sm:hidden">
                            Hi, <span className="text-purple-400 font-semibold">{user ? user.fullName : user}</span>
                        </p>
                    </div>
                    <UserButton/>
                </SignedIn>
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden">
                <button
                    className="cursor-pointer text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28}/> : <Menu size={28}/>}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-16 right-8 bg-gray-900/95 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl flex flex-col space-y-4 w-48 p-4">
                    <SignedOut>
                        <button className="text-gray-300 hover:text-purple-400 font-medium cursor-pointer transition-colors duration-300"
                                onClick={openLogin}
                        >
                            Login
                        </button>
                        <button
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-full transition-all text-center cursor-pointer"
                            onClick={openRegister}
                        >
                            Sign Up
                        </button>
                    </SignedOut>
                    <SignedIn>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => navigate("/pricing")}
                                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer">
                                <img src={assets.dollar} alt="credit" height={20} width={20} className="brightness-0 invert"/>
                                <p className="text-xs font-medium text-gray-300">
                                    Credits: <span className="text-purple-400 font-semibold">{credit}</span>
                                </p>
                            </button>
                            <div className="flex justify-center">
                                <UserButton/>
                            </div>
                        </div>
                    </SignedIn>
                </div>
            )}
        </nav>
    );
};

export default Menubar;