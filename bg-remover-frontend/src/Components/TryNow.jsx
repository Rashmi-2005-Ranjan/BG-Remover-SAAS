import {useContext} from "react";
import {AppContext} from "../Context/AppContext.jsx";

const TryNow = () => {
    const {removeBg} = useContext(AppContext);
    return (
        <div className="py-20">
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center">
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                {/* Content */}
                <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Remove Image Backgrounds
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Get a transparent background for any image
                    </p>

                    <div className="inline-flex flex-col items-center gap-4">
                        <input type="file" id="upload2" hidden accept="image/*"
                               onChange={(e) => removeBg(e.target.files[0])}/>
                        <label htmlFor="upload2"
                               className="inline-flex items-center justify-center gap-3 bg-white text-purple-600 font-semibold px-10 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            Upload Image
                        </label>
                        <p className="text-white/80 text-sm">
                            or Drop a file, Paste Image <span className="underline cursor-pointer font-semibold">URL</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TryNow;