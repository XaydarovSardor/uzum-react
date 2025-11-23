import assets from "../assets"
import { useEffect, useState } from "react"
import { Korzina } from "./Korzina"
import { getCartItems, removeFromCart, updateQuantity } from "../services"
import "./cart.css"
import { Link } from "react-router-dom"
export const Cart = () => {
    const [carts, setCarts] = useState([])
    useEffect(() => {
        try {
            const getAllCarts = async () => {
                const cartData = await getCartItems()
                setCarts(cartData)
            }
            getAllCarts()
        } catch (error) {
            console.log(error);
        }
    }, [])
    const increase = (id,e) =>{
        e.preventDefault()
        const updated = updateQuantity("increase", id)
        setCarts([...updated])
    }
    const decrease = (id,e) =>{
        e.preventDefault()
        const updated = updateQuantity("decrease", id)
        setCarts([...updated])
    }
    return (
        <div className="container carts-container m-5 flex flex-col gap-y-5 justify-center items-center">
            {carts?.length ? carts.map(item => (
                <Link to={`/products/${item.id}`} className="bg-white p-6 rounded-lg border border-[rgba(54,55,64,.2)] w-full mx-auto" key={item.id}>

                    <div className="text-gray-500 text-sm mb-2">На складе Uzum Market</div>
                    <div className="text-lg font-bold text-gray-900">Доставим с <span className="text-purple-600">4 февраля</span></div>

                    <div className="flex items-center mt-4">
                        <div className="w-[90px] h-[120px] bg-[#F2F4F7] flex items-center justify-center" >
                            <img className="w-[70px] h-[60px]" src={item.image} alt={item.title} />
                        </div>
                        <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <button onClick={(e) => removeFromCart(carts, setCarts, item.id, e)} className="flex gap-2 items-center">
                                    <img className="w-6 h-6" src={assets.remove} alt="remove" />
                                    <span>Удалить</span>
                                </button>
                            </div>
                            <p className="text-gray-500 text-sm max-w-[800px]">{item.description}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-2 border border-[#e5e7eb] p-2 rounded-[4px]">
                            <button onClick={(e)=>decrease(item.id,e)} className="px-3 py-1 border rounded-lg text-xl text-gray-500 text-[30px]">−</button>
                            <span className="text-lg font-semibold">{item.quantity}</span>
                            <button onClick={(e)=>increase(item.id,e)} className="px-3 py-1 text-gray-500 text-[30px] border rounded-lg">+</button>
                        </div>


                        <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">{item.price * item.quantity}$</p>
                            <p className="text-gray-400"><span className="line-through">{item.price * 2 * item.quantity }$</span></p>
                        </div>
                    </div>
                </Link>
            )) : <Korzina />}
        </div>
    )
}
