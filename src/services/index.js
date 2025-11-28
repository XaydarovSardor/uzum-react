import axios from "axios";
import API_URL from "./api";
import { toast } from "react-toastify";
import { Product } from "../components/Product";

export const getAllProducts = async () => {
    try {
        const request = axios.get(`${API_URL}/products`)
        return (await request).data
    } catch (error) {
        console.log(error);
        return []
    }
}


export const getProductById = async (id) => {
    try {
        const request = await axios.get(`${API_URL}/products/${id}`)
        return (await request).data
    } catch (error) {
        console.log(error);
    }
}

export const addToCart = async (product, e) => {
    try {
        if (e) e.preventDefault();

        const basketItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const exist = basketItems.find(item => item.id === product.id);

        if (exist) {
            exist.quantity += 1;
            toast.success(`${product.title} savatga qo'shildi`)
        } else {
            basketItems.push({ ...product, quantity: 1 });
            toast.success(`${product.title} savatga qo'shildi`)
        }

        localStorage.setItem("cartItems", JSON.stringify(basketItems));

        window.dispatchEvent(new Event("cartUpdated"));

    } catch (error) {
        console.log(error);
    }
};

export const getCartItems = () => {
    try {
        return JSON.parse(localStorage.getItem("cartItems")) || []
    } catch (error) {
        console.log(error);
    }
}

export const removeFromCart = (basket, setBasket, productId, e) => {
    e.preventDefault()
    const removeProduct = basket.filter(item => item.id !== productId)
    setBasket(removeProduct)
    localStorage.setItem("cartItems", JSON.stringify(removeProduct))
}

export const updateQuantity = (type, id) => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || []
    const product = cart.find(item => item.id === id)
    if (!product) return
    if (type === "increase") {
        product.quantity += 1
    } else if (type === "decrease") {
        if (product.quantity > 1) {
            product.quantity -= 1;
        }
    }
    localStorage.setItem("cartItems", JSON.stringify(cart))
    return cart
}
 
