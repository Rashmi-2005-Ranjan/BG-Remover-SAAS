import {testimonials} from "../assets.js";

const Testimonial = () => {
    return (
        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 py-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
                Loved by <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">creators</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 text-center">They love us. You will too!</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="relative bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col"
                    >
                        <div className="flex flex-col px-6 pt-8 mb-6 space-y-5 flex-grow">
                            {/* Star Rating */}
                            <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote Icon */}
                            <svg
                                height="28"
                                width="28"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                x="0px"
                                y="0px"
                                viewBox="0 0 100 125"
                                enableBackground="new 0 0 100 100"
                                xmlSpace="preserve"
                                className="text-purple-400 fill-current"
                            >
                                <g>
                                    <g>
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M6.438,50.5v35.875h35.875V50.5h-20.5
                                            c0-11.321,9.179-20.5,20.5-20.5V14.625
                                            C22.498,14.625,6.438,30.686,6.438,50.5z
                                            M93.562,30V14.625
                                            c-19.814,0-35.875,16.061-35.875,35.875v35.875h35.875V50.5h-20.5
                                            C73.062,39.179,82.241,30,93.562,30z"
                                        />
                                    </g>
                                </g>
                            </svg>

                            <p className="text-gray-300 m-0 leading-relaxed" style={{hyphens: "auto"}}>
                                "{testimonial.quote}"
                            </p>
                        </div>

                        <div className="flex items-center gap-3 px-6 pt-6 pb-6 border-t border-white/10 mt-auto">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex-shrink-0"></div>
                            <div className="flex flex-col justify-center">
                                <p className="font-semibold text-white m-0">
                                    {testimonial.author}
                                </p>
                                <p className="text-gray-400 text-sm m-0 mt-1">
                                    {testimonial.handle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;