import React from 'react';
import { Upload, Wand2, Download, ArrowRight } from 'lucide-react';

// Mock data for demo
const steps = [
    {
        step: "Step 1",
        title: "Upload Your Image",
        description: "Simply drag and drop your image or click to browse. We support JPG, PNG, and other popular formats."
    },
    {
        step: "Step 2",
        title: "AI Magic Happens",
        description: "Our advanced AI instantly detects and removes the background with precision, preserving every detail."
    },
    {
        step: "Step 3",
        title: "Download Result",
        description: "Get your perfectly edited image in high resolution. Download instantly or continue editing."
    }
];

const BgRemovalSteps = () => {
    const icons = [Upload, Wand2, Download];

    return (
        <div className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-purple-300">Simple Process</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        Remove backgrounds in
                        <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              three easy steps
            </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        No design skills required. Just upload, process, and download your perfect image.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="relative">
                    {/* Connection Lines - Hidden on mobile */}
                    <div className="hidden lg:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent -translate-y-1/2 mx-auto" style={{width: 'calc(100% - 200px)', left: '100px'}}></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {steps.map((item, index) => {
                            const Icon = icons[index];
                            return (
                                <div key={index} className="relative group">
                                    {/* Card */}
                                    <div className="relative bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
                                        {/* Step Number Badge */}
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                                            <span className="text-white font-bold text-lg">{index + 1}</span>
                                        </div>

                                        {/* Icon */}
                                        <div className="mt-8 mb-6 flex justify-center">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                                <div className="relative bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10">
                                                    <Icon className="w-10 h-10 text-purple-400" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="text-center space-y-3">
                                            <h3 className="text-2xl font-bold text-white">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Hover Arrow */}
                                        {index < steps.length - 1 && (
                                            <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowRight className="w-6 h-6 text-purple-400" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                        <div className="flex-1 text-left">
                            <h4 className="font-bold text-white mb-1">Ready to get started?</h4>
                            <p className="text-sm text-gray-400">Join thousands of satisfied users today</p>
                        </div>
                        <button className="whitespace-nowrap bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-3 rounded-xl hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                            Try It Free
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BgRemovalSteps;