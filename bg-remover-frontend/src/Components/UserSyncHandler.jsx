import {useAuth, useUser} from "@clerk/clerk-react";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../Context/AppContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const UserSyncHandler = () => {
    const {isLoaded, isSignedIn, getToken} = useAuth();

    const {user} = useUser();
    const [synced, setSynced] = useState(false);
    const {backendurl,loadUserCredit} = useContext(AppContext);

    useEffect(() => {
        const saveUser = async () => {
            if (!isLoaded || !isSignedIn || !user) {
                return;
            }
            try {
                const token = await getToken();
                const userData = {
                    clerkId: user.id,
                    email: user.primaryEmailAddress.emailAddress,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    photoUrl:user.imageUrl
                };
                await axios.post(backendurl + "/users", userData, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                setSynced(true); // Prevent Reposting
                await loadUserCredit();
            } catch (error) {
                console.error("Error saving user:", error);
                toast.error("User Sync Failed , Please try again later");
            }
        }
        saveUser();
    }, [isLoaded, isSignedIn, getToken, user, synced]);
    return null;
}

export default UserSyncHandler;