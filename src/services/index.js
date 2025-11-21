import axios from "axios";
import { useState } from "react";
import API_URL from "./api";

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