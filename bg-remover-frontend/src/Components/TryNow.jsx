const TryNow = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-white px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-7 text-center">
                Remove Image Backgrounds
            </h2>
            <p className="text-gray-500 mb-8 text-center">
                Get a transparent background For any Image
            </p>
            <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center space-y-4">
                <input type="file" id="upload2" hidden accept="image/*"/>
                <label htmlFor="upload2"
                       className="cursor-pointer bg-indigo-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full text-lg">
                    Upload Image
                </label>
                <p className="text-gray-500 text-sm">
                    or Drop a File , Paste Image <a href="#" className="text-blue-700 underline">URL</a>
                </p>
            </div>
        </div>
    )
}

export default TryNow;