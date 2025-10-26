import {useState} from "react";
import {assets, categories} from "../assets.js";

const BgSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [activeCategory, setActiveCategory] = useState('People');

    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value);
    }
    return (
        <div className="mb-16 py-20">
            {/*    Section Title*/}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                Stunning <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Quality</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 text-center">See the difference for yourself</p>

            {/*    Category Selector*/}
            <div className="flex justify-center mb-10 flex-wrap">
                <div className="inline-flex gap-3 bg-white/5 backdrop-blur-sm p-2 rounded-full flex-wrap justify-center border border-white/10">
                    {
                        categories.map((category) => (
                            <button key={category}
                                    className={`px-6 py-3 rounded-full font-medium cursor-pointer transition-all duration-300 ${activeCategory === category ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50' : 'text-gray-300 hover:bg-white/10'}`}
                                    onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))
                    }
                </div>
            </div>

            {/*    Image Comparison Slider*/}
            <div className="relative w-full max-w-4xl m-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/20">
                <img src={assets.people_org} alt="orig_img"
                     style={{clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)`}}/>
                <img className="absolute top-0 left-0 w-full h-full" src={assets.people} alt="new_img"
                     style={{clipPath: `inset(0 0 0 ${sliderPosition}%)`}}/>
                <input type="range"
                       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider"
                       min={0} max={100}
                       onChange={handleSliderChange}
                       value={sliderPosition}
                />
                {/* Slider Handle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-purple-500 shadow-lg pointer-events-none" style={{left: `${sliderPosition}%`}}></div>
            </div>
        </div>
    )
}

export default BgSlider;