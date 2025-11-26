import "./header.css"
import assets from '../assets'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from "axios"
import API_URL from "../services/api"

export const Header = () => {
    
    
    const [openModal, setOpenModal] = useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user?.username === "mor_2314" && user?.password === "83r5^_") {
            setLoggedIn(true)
        }
    }, [])
    const formSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Iltimos, username va password ni kiriting");
            return;
        }

        if (username !== "mor_2314" || password !== "83r5^_") {
            setError("Username yoki password noto‘g‘ri");
            return;
        }

        try {
            await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            });
            setOpenModal(false)
            setLoggedIn(true)
            setError("");
            JSON.stringify(localStorage.setItem("user", JSON.stringify({ username: "mor_2314", password: "83r5^_" })))

        } catch (err) {
            console.error(err);
            setError("Loginda xatolik yuz berdi");
        }
    };

    return (
        <>
            <header className="header">
                <div className="top-header">
                    <div className="container">
                        <div className="location">
                            <div className="location-adres">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.61755 11.7198C7.61755 8.95843 9.85613 6.71985 12.6176 6.71985C15.379 6.71985 17.6176 8.95843 17.6176 11.7198C17.6176 13.9515 16.4255 15.9627 15.1329 17.446C14.4914 18.1821 13.8388 18.7723 13.3273 19.1759C13.0712 19.378 12.8551 19.5296 12.6978 19.628C12.668 19.6466 12.6413 19.6627 12.6176 19.6765C12.5939 19.6627 12.5672 19.6466 12.5374 19.628C12.3801 19.5296 12.164 19.378 11.9079 19.1759C11.3964 18.7723 10.7438 18.1821 10.1023 17.446C8.80963 15.9627 7.61755 13.9515 7.61755 11.7198ZM12.6176 5.71985C9.30384 5.71985 6.61755 8.40614 6.61755 11.7198C6.61755 14.3006 7.98582 16.5394 9.34836 18.103C10.0345 18.8903 10.7332 19.5228 11.2885 19.9609C11.5658 20.1798 11.812 20.3538 12.0073 20.4759C12.1042 20.5365 12.1954 20.5886 12.2758 20.6274C12.3158 20.6467 12.3604 20.6663 12.4065 20.6821C12.4427 20.6945 12.522 20.7198 12.6176 20.7198C12.7132 20.7198 12.7925 20.6945 12.8287 20.6821C12.8748 20.6663 12.9194 20.6467 12.9594 20.6274C13.0398 20.5886 13.131 20.5365 13.2279 20.4759C13.4232 20.3538 13.6694 20.1798 13.9467 19.9609C14.502 19.5228 15.2007 18.8903 15.8868 18.103C17.2493 16.5394 18.6176 14.3006 18.6176 11.7198C18.6176 8.40614 15.9313 5.71985 12.6176 5.71985ZM11.6176 11.7198C11.6176 11.1675 12.0653 10.7198 12.6176 10.7198C13.1699 10.7198 13.6176 11.1675 13.6176 11.7198C13.6176 12.2721 13.1699 12.7198 12.6176 12.7198C12.0653 12.7198 11.6176 12.2721 11.6176 11.7198ZM12.6176 9.71985C11.513 9.71985 10.6176 10.6153 10.6176 11.7198C10.6176 12.8244 11.513 13.7198 12.6176 13.7198C13.7222 13.7198 14.6176 12.8244 14.6176 11.7198C14.6176 10.6153 13.7222 9.71985 12.6176 9.71985Z" fill="#1F2026" />
                                </svg>
                                <p>Shahar: <span>Toshkent</span></p>
                            </div>
                            <h4>Topshirish punktlari</h4>
                        </div>
                        <p className='buyurtma'>Buyurtmangizni 1 kunda bepul yetkazib beramiz!</p>
                        <div className="language">
                            <h4>Savol-javoblar</h4>
                            <h4>Buyurtmalarim</h4>
                            <div className="select-lang">
                                <img src={assets.lang} alt="logo" />
                                <p>O'zbekcha</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-header">
                    <div className="container">
                        <div className="header-logo">
                            <Link to={"/"}>
                                <img src={assets.uzum} alt="logo" />
                            </Link>
                        </div>
                        <div className="search-header">
                            <button className='katalog-btn flex items-center duration-300 ease font-medium rounded-[4px] text-[#7f4dff] bg-[#F0F0FF] hover:bg-[#ceccff]'>
                                <img src={assets.katalog} alt="katalog" />
                                Katalog
                            </button>
                            <input type="search" placeholder='Mahsulotlar va turkumlar izlash' />
                        </div>
                        <div className="header-functs">
                            {!loggedIn ? (
                                <div className="auth" onClick={() => setOpenModal(true)}>
                                    <img src={assets.profile} alt="profile" />
                                    <p>Kirish</p>
                                </div>
                            ) : (
                                <div className="auth profile">
                                    <img src={assets.profile} alt="profile" />
                                </div>
                            )}
                            <div className="like">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.12543 6.21985C5.89478 6.21985 4.12543 8.02891 4.12543 10.2198C4.12543 11.148 4.50227 12.1634 5.17413 13.2303C5.84235 14.2914 6.76691 15.3472 7.7767 16.3417C9.18312 17.7268 10.6572 18.9077 11.7962 19.8201C12.0988 20.0625 12.3777 20.2859 12.6254 20.4892C12.8731 20.2859 13.152 20.0625 13.4546 19.8201C14.5936 18.9077 16.0677 17.7268 17.4741 16.3417C18.4839 15.3472 19.4085 14.2914 20.0767 13.2303C20.7486 12.1634 21.1254 11.148 21.1254 10.2198C21.1254 8.02883 19.3568 6.21985 17.1254 6.21985C14.9727 6.21985 13.6992 7.92211 13.3516 8.46727C13.0143 8.9964 12.2365 8.99638 11.8992 8.46727C11.5516 7.9221 10.2782 6.21985 8.12543 6.21985ZM2.62543 10.2198C2.62543 7.21079 5.05608 4.71985 8.12543 4.71985C10.3569 4.71985 11.8503 6.02192 12.6254 6.93566C13.4005 6.02192 14.894 4.71985 17.1254 4.71985C20.1956 4.71985 22.6254 7.21087 22.6254 10.2198C22.6254 11.5416 22.096 12.8387 21.346 14.0296C20.5923 15.2264 19.5794 16.3737 18.5267 17.4104C17.0683 18.8467 15.4334 20.1582 14.2756 21.087C13.7903 21.4763 13.3888 21.7984 13.1193 22.0342C12.8365 22.2817 12.4143 22.2817 12.1315 22.0342C11.862 21.7984 11.4605 21.4763 10.9752 21.087C9.81744 20.1582 8.18255 18.8467 6.72416 17.4104C5.67145 16.3737 4.65851 15.2264 3.90485 14.0296C3.15484 12.8387 2.62543 11.5416 2.62543 10.2198Z" fill="#1F2026" />
                                </svg>
                                <p>Saralangan</p>
                            </div>
                            <Link to={"/savat"} onClick={() => getCart()} className="savat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.67542 7.21985C9.67542 5.60764 10.9156 4.21985 12.6754 4.21985C14.4352 4.21985 15.6754 5.60764 15.6754 7.21985V8.21985H9.67542V7.21985ZM8.17542 9.71985V12.2198H9.67542V9.71985H15.6754V12.2198H17.1754V9.71985H19.1754V20.4698C19.1754 20.884 18.8396 21.2198 18.4254 21.2198H6.92542C6.51121 21.2198 6.17542 20.884 6.17542 20.4698V9.71985H8.17542ZM8.17542 8.21985V7.21985C8.17542 4.83206 10.0353 2.71985 12.6754 2.71985C15.3156 2.71985 17.1754 4.83206 17.1754 7.21985V8.21985H19.9254H20.6754V8.96985V20.4698C20.6754 21.7124 19.668 22.7198 18.4254 22.7198H6.92542C5.68278 22.7198 4.67542 21.7124 4.67542 20.4698V8.96985V8.21985H5.42542H8.17542Z" fill="#1F2026" />
                                </svg>
                                <p>Savat</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {openModal && (
                <div className="modal" onClick={() => setOpenModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Login</h2>
                            <button onClick={() => setOpenModal(false)} className="close-btn">✖</button>
                        </div>

                        <form className="modal-body" onSubmit={formSubmit}>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <label>
                                Username:
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </label>
                            <label>
                                Password:
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                            <button className="submit-footer" type="submit">Submit</button>
                        </form>
                        <div className="modal-footer">
                            <button className="close-footer">Close</button>
                        </div>

                    </div>
                </div>
            )}



        </>

    )
}
