import {testimonials} from "../assets.js";

const Testimonial = () => {
    return (
        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                They Love Us. You Will Too!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="flex flex-col max-w-md mx-auto md:mx-0 justify-between rounded-xl shadow hover:shadow-lg transition-shadow"
                    >
                        <div className="flex flex-col px-6 pt-8 mb-10 space-y-5">
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
                            <p className="text-gray-700 m-0" style={{hyphens: "auto"}}>
                                {testimonial.quote}
                            </p>
                        </div>
                        <div className="flex space-x-2 bg-gray-50 px-6 pt-6 pb-5 rounded-b-xl">
                            <div className="flex flex-col justify-center">
                                <p className="font-semibold text-gray-900 m-0">
                                    {testimonial.author}
                                </p>
                                <p className="text-gray-500 text-sm m-0 mt-1">
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
