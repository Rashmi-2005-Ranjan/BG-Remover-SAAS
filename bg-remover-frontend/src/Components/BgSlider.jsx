import {useState} from "react";
import {assets, categories} from "../assets.js";

const BgSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [activeCategory, setActiveCategory] = useState('People');

    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value);
    }
    return (
        <div className="mb-16 position-relative">
            {/*    Section Title*/}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Stunning Quality
            </h2>
            {/*    Category Selector*/}
            <div className="flex justify-center mb-10 flex-wrap">
                <div className="inline-flex gap-4 bg-gray-100 p-2 rounded-full flex-wrap justify-center">
                    {
                        categories.map((category) => (
                            <button key={category}
                                    className={`px-6 py-2 rounded-full font-medium cursor-pointer ${activeCategory === category ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                                    onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))
                    }
                </div>
            </div>
            {/*    Image Comparison Slider*/}
            <div className="relative w-full max-w-4xl m-auto rounded-xl shadow-lg">
                <img src={assets.people_org} alt="orig_img"
                     style={{clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)`}}/>
                <img className="absolute top-0 left-0 w-full h-full" src={assets.people} alt="new_img"
                     style={{clipPath: `inset(0 0 0 ${100.2 - sliderPosition})`}}/>
                <input type="range"
                       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider"
                       min={0} max={100}
                       onChange={handleSliderChange}
                       value={sliderPosition}
                />
            </div>
        </div>
    )
}

export default BgSlider;