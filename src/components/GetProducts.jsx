    import React, { useEffect, useState } from 'react'
    import { addToCart, getAllProducts } from '../services'
    import assets from '../assets'
    import "./getProduct.css"
    import { Link } from 'react-router-dom'
    export const GetProducts = () => {
        const [products, setProducts] = useState([])
        const [loading, setLoading] = useState(true)
        useEffect(() => {
            try {
                const fetchData = async () => {
                    const data = await getAllProducts()
                    setProducts(data)
                    setLoading(false)
                }
                fetchData()
            } catch (error) {
                console.log(error);
            }
        }, [])
        
        return (
            <div className="all-products mt-4">
                <div className="container">
                    <h2 className='text-3xl font-bold mb-4'>All products</h2>
                    <div className="grid grid-cols-5 gap-5">
                        {loading ? <h2>Loading</h2> : (
                            products.map(product => (
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
                                            <button onClick={(e)=>addToCart(product,e)} className="basket-img">
                                                <img src={assets.basket} alt={product.title} />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div >
        )
    }
