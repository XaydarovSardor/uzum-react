import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { addToCart, getProductById } from "../services"
export const Product = () => {
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        try {
            const getproduct = async () => {
                const data = await getProductById(id)
                setProduct(data)
            }
            getproduct()
        } catch (error) {
            console.log(error);
        }
    }, [])
    return (
        <div className='container'>
            <button onClick={() => navigate(-1)} className="px-6 mt-5 py-2 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-semibold 
                    shadow-[0_0_10px_rgba(99,102,241,0.8)] 
                    hover:shadow-[0_0_20px_rgba(99,102,241,1)] 
                    transition-all duration-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"></path>
                </svg>
                Back
            </button>
            <div className="flex my-10 gap-[100px]" key={product.id}>
                <div className="product-info max-w-[700px] w-full">
                    <h1 className="font-semibold text-2xl mb-4 leading-[30px]">{product.title}</h1>
                    <div className="rounded-[8px] h-[400px] w-full bg-[#efefef] overflow-hidden">
                        <img className="w-full h-full py-6 object-contain" src={product.image} alt="tovar" />
                    </div>
                </div>
                <div className="border rounded-xl max-w-[440px] w-full p-5 shadow-lg bg-white">
                    <div className="mb-3">
                        <h2 className="text-2xl font-bold">{product.price} $</h2>
                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                            <span className="line-through">{product.price * 2} $</span>
                            <span className="bg-yellow-300 text-black px-2 py-0.5 rounded-md text-xs">-18%</span>
                            <span className="bg-yellow-300 text-black px-2 py-0.5 rounded-md text-xs">Katta savdo</span>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-lg mb-3">
                        <div className="flex space-x-2 text-sm">
                            <button className="bg-white px-3 py-1 rounded-md font-semibold">24 oy</button>
                            <button className="px-3 py-1 rounded-md text-gray-500">12 oy</button>
                            <button className="px-3 py-1 rounded-md text-gray-500">6 oy</button>
                            <button className="px-3 py-1 rounded-md text-gray-500">3 oy</button>
                        </div>
                        <div className="mt-2 text-gray-500 font-bold text-lg">
                            {Math.floor(product.price / 24)}$<span className="text-gray-500 text-sm">× 24 oy</span>
                        </div>
                    </div>

                    <button className="w-full bg-gray-200 py-3 rounded-lg text-gray-600 mb-2">
                        1 klikda xarid qilish
                    </button>
                    <button onClick={(e) => addToCart(product, e)} className="main-btn w-full bg-[#7000ff] text-white py-3 rounded-lg text-lg font-semibold">
                        Savatga qo‘shish
                    </button>

                    <div className="mt-4 text-sm space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="bg-green-100 text-green-600 p-1 rounded">✔</span>
                            <span>5 dona xarid qilish mumkin</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="bg-yellow-100 text-yellow-600 p-1 rounded">🛍</span>
                            <span>Bu haftada 44 kishi sotib oldi</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
