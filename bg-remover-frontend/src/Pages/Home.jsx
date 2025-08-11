import Header from "../Components/Header.jsx";
import BgRemovalSteps from "../Components/BgRemovalSteps.jsx";
import BgSlider from "../Components/BgSlider.jsx";
import Pricing from "../Components/Pricing.jsx";
import Testimonial from "../Components/Testimonial.jsx";
import TryNow from "../Components/TryNow.jsx";

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-['Outfit']">
            <Header/>
            <BgRemovalSteps/>
            <BgSlider/>
            <Pricing/>
            <Testimonial/>
            <TryNow/>
        </div>
    )
}
export default Home;