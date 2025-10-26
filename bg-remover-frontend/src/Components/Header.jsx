import {assets} from "../assets.js";
import {useContext} from "react";
import {AppContext} from "../Context/AppContext.jsx";

const Header = () => {
    const {removeBg} = useContext(AppContext);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Section Video Banner */}
            <div className="order-2 md:order-1 flex justify-center">
                <div className="shadow-[0_25px_50px_-12px_rgba(147,51,234,0.3)] rounded-3xl overflow-hidden border border-white/10">
                    <video
                        src={assets.video_banner}
                        autoPlay
                        loop
                        muted
                        className="w-full max-w-[400px] h-auto object-cover"
                    />
                </div>
            </div>
            {/* Text Content*/}
            <div className="order-1 md:order-2">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    The Fastest <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">background eraser.</span>
                </h1>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                    Give Your Photos a Fresh Look with Our Background Remover! Focus on your subject, erase the
                    background, and replace it with endless creative possibilities. Instantly place your subject into
                    stunning new scenes and designs. Start now and explore a whole new world for your images!
                </p>
                <div>
                    <input type="file" accept="image/*" id="upload1" hidden
                           onChange={(e) => removeBg(e.target.files[0])}/>
                    <label
                        className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium px-8 py-4 rounded-full hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 text-lg inline-block"
                        htmlFor="upload1"
                    >
                        Upload Your Image
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Header;