import {createContext, useState} from "react";
import {useAuth, useClerk, useUser} from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [credit, setCredit] = useState(false);
    const {getToken} = useAuth();
    const [image, setImage] = useState(false);
    const [resultImage, setResultImage] = useState(false);
    const {isSignedIn} = useUser();
    const {openSignIn} = useClerk();
    const navigate = useNavigate();
    const removeBg = async (selectedImage) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }
            setImage(selectedImage);
            setResultImage(false);
            // Navigate to result page
            navigate("/result");
            const token = await getToken();
            const formData = new FormData();
            selectedImage && formData.append("file", selectedImage);
            const {data: base64Image} = await axios.post(backendurl + "/images/remove-background", formData, {headers: {Authorization: `Bearer ${token}`}})
            setResultImage(`date:image/png;base64,${base64Image}`);
            setCredit(credit - 1);
        } catch (e) {
            console.error("Error While Removing The Background", e);
            return openSignIn();
        }
    }
    const loadUserCredit = async () => {
        try {
            const token = await getToken();
            const response = await axios.get(backendurl + "/users/credits", {headers: {Authorization: `Bearer ${token}`}});
            if (response.data.success) {
                setCredit(response.data.data.credits);
            } else {
                toast.error("Error Loading Credit:");
            }
        } catch (error) {
            toast.error("Error Loading Credit:");
            console.error("Error loading user credit:", error);
        }
    }


    const contextValue = {
        credit,
        setCredit,
        backendurl,
        loadUserCredit,
        image, setImage,
        resultImage, setResultImage,
        removeBg
    }


    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;