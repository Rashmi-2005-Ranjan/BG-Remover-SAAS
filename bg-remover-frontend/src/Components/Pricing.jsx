import {plans} from "../assets.js";
import {useAuth, useClerk} from "@clerk/clerk-react";
import {placeOrder} from "../Service/OrderService.js";
import {useContext} from "react";
import {AppContext} from "../Context/AppContext.jsx";

const Pricing = () => {
    const {isSignedIn, getToken} = useAuth();
    const {openSignIn} = useClerk();
    const {loadUserCredit, backendurl} = useContext(AppContext);
    const handleOrder = (planId) => {
        if (!isSignedIn) {
            return openSignIn();
        }
        placeOrder({
                planId,
                getToken,
                onSuccess: () => {
                    loadUserCredit();
                }, backendurl
            }
        );
    }
    return (
        <div className="py-20 md:px-20 lg:px-20">
            <div className="container mx-auto px-4">
                {/*    Section Title*/}
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Choose Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Perfect Plan</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
                        Select From Our Carefully Curated Packages Designed to Meet Your Needs and Budget
                    </p>
                </div>
                {/*    Section Body*/}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {
                        plans.map((plan) => (
                            <div key={plan.id}
                                 className={`relative ${plan.popular ? 'md:-translate-y-4' : ''}`}>
                                {plan.popular && (
                                    <div
                                        className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 text-white text-sm font-semibold shadow-lg shadow-purple-500/50">
                                        Most Popular
                                    </div>
                                )}
                                <div className={`relative bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm p-8 rounded-3xl border ${
                                    plan.popular ? 'border-purple-500 shadow-2xl shadow-purple-500/20' : 'border-white/10'
                                } hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2`}>
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                                        <div className="mb-4">
                                            <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                &#8377; {plan.price}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mb-8">
                                        <ul className="space-y-4">
                                            <li className="flex items-center gap-3 text-gray-300">
                                                <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                <span>{plan.credit}</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-gray-300">
                                                <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                <span>{plan.description}</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-gray-300">
                                                <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                <span>HD Quality Export</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-gray-300">
                                                <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                <span>24/7 Support</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <button
                                        className={`w-full py-4 px-6 text-center cursor-pointer text-white font-semibold rounded-2xl transition-all duration-300 ${
                                            plan.popular
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105'
                                                : 'bg-white/5 border border-white/20 hover:bg-white/10 cursor-pointer'
                                        }`}
                                        onClick={() => handleOrder(plan.id)}
                                    >
                                        Choose Plan
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Pricing;