import {assets, FOOTER_CONSTANTS} from "../assets.js";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-black/20">
            <div className="flex items-center justify-between gap-4 px-4 lg:px-44 py-6">
                <img src={assets.logo} alt="logo" width={32} className="invert"/>
                <p className="flex-1 border-l border-white/10 pl-4 text-gray-400 max-sm:hidden">
                    &copy; {new Date().getFullYear()}@rashmiranjan | All Rights Reserved
                </p>
                <div className="flex gap-3">
                    {
                        FOOTER_CONSTANTS.map((item, index) => (
                            <a
                                key={index}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                            >
                                <img src={item.logo} alt="logo" width={32} className="invert opacity-60 hover:opacity-100 transition-opacity duration-300"/>
                            </a>
                        ))
                    }
                </div>
            </div>
        </footer>
    )
}

export default Footer;