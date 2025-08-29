import axios from "axios";
import toast from "react-hot-toast";
import {assets} from "../assets.js";


export const placeOrder = async ({planId, getToken, onSuccess, backendurl}) => {
    try {
        const token = await getToken();
        const response = await axios.post(`${backendurl}/orders?planId=${planId}`, {}, {headers: {Authorization: `Bearer ${token}`}})
        if (response.status === 200) {
            initializePayment({order: response.data.data, getToken, onSuccess, backendurl});
        }
    } catch (e) {
        toast.error(e.message);
    }
}

const initializePayment = ({order, getToken, onSuccess, backendurl}) => {
    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits.
        currency: order.currency,
        name: "ClearifyPro", //your business name
        description: "Credit Payment",
        image: assets.logo,
        order_id: order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        receipt: order.receipt,
        handler: async (paymentDetails) => {
            try {
                const token = await getToken();
                const response = await axios.post(`${backendurl}/orders/verify`, paymentDetails, {headers: {Authorization: `Bearer ${token}`}});
                if (response.status === 200) {
                    toast.success("Credits Added Successfully");
                    onSuccess?.();
                }
            } catch (err) {
                toast.error(err.message);
            }
        }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
}