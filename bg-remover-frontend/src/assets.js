import logo from "./assets/logo.png";
import dollar from "./assets/dollar.png"
import video_banner from "./assets/home-page-banner.mp4"
import people from "./assets/people.png"
import people_org from "./assets/people-org.png"
import slide_icon from "./assets/slide_icon.svg"

export const assets = {
    logo,
    dollar,
    video_banner,
    people,
    people_org,
    slide_icon
}

export const steps = [
    {
        step: "Step 1",
        title: "Select an Image",
        description: `
        First, choose the image you want to remove background
         from by clicking on "Start from a photo". Your image format can be PNG or JPG.
         We support all image dimensions
        `
    },
    {
        step: "Step 2",
        title: "Let magic remove the background",
        description: `
        Our tool automatically removes the background from your image.
        Next, you can choose a background color.
        Our most popular options are white and transparent backgrounds,
        but you can pick any color you like
        `
    },
    {
        step: "Step 3",
        title: "Download Your Image",
        description: `
        After Selecting a new background color, download your photo and you're done!
        You can also save your picture in the Photoroom App by creating an account
        `
    }
]

export const categories = ["People", "Products", "Animals", "Cars", "Graphics"];

export const plans = [
    {
        id: "Basic",
        name: "Basic Package",
        price: 499,
        credit: "300 Credits",
        description: "Best For Personal Use",
        popular: false
    },
    {
        id: "Premium",
        name: "Premium Package",
        price: 899,
        credit: "800 Credits",
        description: "Best For Small Business",
        popular: true
    },
    {
        id: "Ultimate",
        name: "Ultimate Package",
        price: 1499,
        credit: "1500 Credits",
        description: "Best For Enterprise Use",
        popular: false
    }
]

export const testimonials = [
    {
        id: 1,
        quote: "We are impressed by the AI and think it's the best choice on the market.",
        author: "Anthony Walker",
        handle: "@_webarchitect_",
    },
    {
        id: 2,
        quote: "ClearifyPro is a game-changer for our e-commerce business. The background removal is flawless and saves us so much time.",
        author: "Sarah Johnson",
        handle: "@sarahj_designs",
    },
    {
        id: 3,
        quote: "The quality of the background removal is outstanding. It's like magic!",
        author: "Mitchel Johnson",
        handle: "@technical_mitchel",
    }
]

export const FOOTER_CONSTANTS = [
    {
        url: "https://www.facebook.com/",
        logo: "https://img.icons8.com/fluent/30/000000/facebook-new.png"
    },
    {
        url: "https://www.instagram.com/",
        logo: "https://img.icons8.com/fluent/30/000000/instagram-new.png"
    },
    {
        url: "https://www.linkedin.com/",
        logo: "https://img.icons8.com/fluent/30/000000/linkedin.png"
    },
    {
        url: "https://www.twitter.com/",
        logo: "https://img.icons8.com/fluent/30/000000/twitter.png"
    },
]