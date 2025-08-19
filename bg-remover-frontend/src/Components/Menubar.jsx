import {useState} from "react";
import {assets} from "../assets.js";
import {Menu, X} from "lucide-react";
import {Link} from "react-router-dom";
import {SignedIn, SignedOut, useAuth, useClerk, UserButton, useUser} from "@clerk/clerk-react";

const Menubar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const {openSignIn, openSignUp} = useClerk();
    const {user} = useUser();
    const {getToken} = useAuth();
    const openRegister = () => {
        setMenuOpen(false);
        openSignUp({});
    }
    const openLogin = () => {
        setMenuOpen(false);
        openSignIn({});
    }
    const getData = async () => {
        const token = await getToken();
        console.log(token);
        console.log(user.id);
    }
    return (
        <nav className="bg-white px-8 py-4 flex justify-between items-center">
            {/* Logo Section + Text*/}
            <Link to="/" className="flex items-center space-x-2">
                <img
                    src={assets.logo}
                    alt="logo"
                    className="h-8 w-8 object-contain cursor-pointer"
                />
                <span className="text-2xl font-semibold text-indigo-700 cursor-pointer">
                    Clearify<span className="text-gray-400 cursor-pointer">Pro</span>
                </span>
            </Link>

            {/* Right Side : Action Buttons */}
            <div className="hidden md:flex items-center space-x-4 justify-between">
                <SignedOut>
                    <button className="text-gray-700 hover:text-blue-500 font-medium cursor-pointer"
                            onClick={openLogin}>
                        Login
                    </button>
                    <button
                        className="bg-gray-100 hover:bg-gray-200 font-medium px-4 py-2 rounded-full transition-all cursor-pointer"
                        onClick={openRegister}>
                        Sign Up
                    </button>
                </SignedOut>
                <SignedIn>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            className="flex items-center gap-2 bg-blue-100 px-4 sm:px-5 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-500 cursor-pointer">
                            <img src={assets.dollar} alt="credit" height={24} width={24}/>
                            <p className="text-xs sm:text-sm font-medium text-gray-600">
                                Credits: 0
                            </p>
                        </button>
                        <button onClick={getData}>
                            Get data
                        </button>
                        <p className="text-gray-600 max-sm:hidden">
                            Hi, <span className="text-blue-500 font-semibold">{user ? user.fullName : user}</span>
                        </p>
                    </div>
                    <UserButton/>
                </SignedIn>
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden">
                <button
                    className="cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28}/> : <Menu size={28}/>}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-16 right-8 bg-white shadow-md rounded-md flex flex-col space-y-4 w-40 p-4">
                    <SignedOut>
                        <button className="text-gray-700 hover:text-blue-500 font-medium cursor-pointer"
                                onClick={openLogin}
                        >
                            Login
                        </button>
                        <button
                            className="bg-gray-100 hover:bg-gray-200 font-medium px-4 py-2 rounded-full transition-all text-center cursor-pointer"
                            onClick={openRegister}
                        >
                            Sign Up
                        </button>
                    </SignedOut>
                    <SignedIn>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                                className="flex items-center gap-2 bg-blue-100 px-4 sm:px-5 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-500 cursor-pointer">
                                <img src={assets.dollar} alt="credit" height={24} width={24}/>
                                <p className="text-xs sm:text-sm font-medium text-gray-600">
                                    Credits: 0
                                </p>
                            </button>
                        </div>
                        <UserButton/>
                    </SignedIn>
                </div>
            )}
        </nav>
    );
};

export default Menubar;
