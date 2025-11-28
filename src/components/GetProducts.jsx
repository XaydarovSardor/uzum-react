import React, { useEffect, useState } from 'react'
import { addToCart, getAllProducts } from '../services'
import assets from '../assets'
import "./getProduct.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../services/api'
export const GetProducts = ({ search }) => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [delayLoading, setDelayLoading] = useState(false)
    const [error, setError] = useState("")
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        const localData = localStorage.getItem("products")

        if (localData) {
            setProducts(JSON.parse(localData))
            setLoading(false)
            return
        }

        const fetchData = async () => {
            const data = await getAllProducts()
            setProducts(data)
            localStorage.setItem("products", JSON.stringify(data))
            setLoading(false)
        }

        fetchData()
    }, [])
    const addNewProduct = async (e) => {
        e.preventDefault();

        if (!title || !image || !category || !description) {
            setError("Iltimos malumotlarni kiriting");
            return;
        }
        try {
            axios.post(`${API_URL}/products`, {
                title,
                image,
                category,
                description,
                price: "99"
            })
            const newProduct = {
                id:Date.now(),
                title,
                image,
                category,
                description,
                price: "99"
            }
            const oldProducts = JSON.parse(localStorage.getItem("products"))
            const updatedProducts = [...oldProducts, newProduct]
            localStorage.setItem("products", JSON.stringify(updatedProducts))
            setProducts(updatedProducts)
            setOpenModal(false)
            setError("")
            setTitle("")
            setImage("")
            setCategory("")
            setDescription("")
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        if (!search) {
            setDelayLoading(false)
            return
        } else[
            setDelayLoading(true)
        ]
        const timer = setTimeout(() => {
            setDelayLoading(false)
        }, 500);
        return () => clearTimeout(timer)
    }, [search])
    const filteredProducts = search ? products.filter(product => product.title.toLowerCase().includes(search.toLowerCase())) : products




    return (
        <>
            <div className="all-products mt-4">
                <div className="container">
                    <button onClick={() => setOpenModal(true)} className="flex mt-10 items-center px-4 py-2 bg-indigo-600 text-white rounded-lg 
                        hover:bg-indigo-700 transition-colors duration-300">
                        Create new product
                    </button>
                    <h2 className='text-3xl font-bold mb-4'>All products</h2>
                    <div className="grid grid-cols-5 gap-5">
                        {loading ? (
                            <h2 className='text-red-400 font-semibold'>Loading...</h2>
                        ) : filteredProducts.length === 0 ? (
                            <h2 className='text-red-400 font-semibold '>Hech narsa topilmadi</h2>
                        ) : delayLoading ? (
                            <h2 className='text-red-400 font-semibold'>Qidirilmoqda...</h2>
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <Link to={`/products/${product.id}`} key={product.id} className='flex flex-col product select-none'>
                                    <div className="product-img">
                                        <img src={product.image} alt="Tovar" />
                                    </div>
                                    <div className="flex flex-col gap-2 p-3">
                                        <h2 className='tovar-name'>{product.title.length > 30 ? `${product.title.slice(1, 30)}...` : product.title}</h2>
                                        <div className="tovar-details flex justify-between">
                                            <div className="tovar-price">
                                                <p className="old-price"><del>{product.price * 2}$</del></p>
                                                <p className="new-price">{product.price}$</p>
                                            </div>
                                            <button onClick={(e) => addToCart(product, e)} className="basket-img">
                                                <img src={assets.basket} alt={product.title} />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            )
                            )
                        ) : (
                            <h2>Malumot topilmadi</h2>
                        )
                        }
                    </div>


                </div>
            </div >

            {/* create new product modal */}
            {openModal && (
                <div className="modal" onClick={() => setOpenModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Create new Product</h2>
                            <button onClick={() => setOpenModal(false)} className="close-btn">✖</button>
                        </div>

                        <form onSubmit={(e) => addNewProduct(e)} className="modal-body">
                            {error && (<p className="error-text">{error}</p>)}
                            <label>
                                title:
                                <input onChange={(e) => setTitle(e.target.value)} value={title}
                                    type="text"
                                />
                            </label>
                            <label>
                                image:
                                <input onChange={(e) => setImage(e.target.value)} value={image}
                                    type="text"
                                />
                            </label>
                            <label>
                                description:
                                <input onChange={(e) => setDescription(e.target.value)} value={description}
                                    type="text"
                                />
                            </label>
                            <label>
                                category:
                                <input onChange={(e) => setCategory(e.target.value)} value={category}
                                    type="text"
                                />
                            </label>
                            <button className="submit-footer" type="submit">Submit</button>
                        </form>
                        <div className="modal-footer">
                            <button onClick={() => setOpenModal(false)} className="close-footer">Close</button>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}
