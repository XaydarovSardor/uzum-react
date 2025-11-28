import { useEffect, useState } from "react"
import "./profile.css"
import axios from "axios"
import API_URL from "../services/api"
export const Porfile = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [allUsers, setAllUsers] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [error, setError] = useState("")
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)
    useEffect(() => {
        
        getAllUsers()
        const userInfo = JSON.parse(localStorage.getItem("user"))
        setUser(userInfo)
    }, [])

    const getAllUsers = async () => {
        try {
            setAllUsers(prev => !prev)
        } catch (error) {
            setError(error)
        }
    }

    const addNewUser = async (e) => {
        e.preventDefault();

        if (!username || !password || !email) {
            setError("Iltimos username, email va parolni kiriting");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/users`, {
                username,
                password,
                email
            });
            const newId = response.data.id
            const newUser = {
                id: newId,
                username,
                password,
                email
            };
            const oldUsers = JSON.parse(localStorage.getItem("usersInfo")) || [];
            const updatedUsers = [...oldUsers, newUser];
            localStorage.setItem("usersInfo", JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
            setOpenModal(false);
            setUsername("");
            setPassword("");
            setEmail("");
            setError("");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="container">

                <h2 className="about-user">About you</h2>
                <div className="user-infos">
                    <div className="user-info">
                        <h2>Username: {user?.username}</h2>
                        <h2>Password: {user?.password}</h2>
                    </div>

                </div>
                <button className="show-users" onClick={() => getAllUsers()} type="button">
                    {allUsers ? "Close all users" : "Show all users"}
                    <span className={`arrow ${allUsers ? "open" : ""}`}>▼</span>
                </button>
                {allUsers && (
                    <div className="users">
                        {users?.length > 0 && users.map(user => (
                            <div className="user" key={user.id}>
                                <h2 className="firstname">Username: {user.username}</h2>
                                <h2 className="firstname">Password: {user.password}</h2>
                                <h2 className="email">Email: {user.email}</h2>
                            </div>
                        ))}
                    </div>
                )}
                <button onClick={() => setOpenModal(true)} className="flex mt-10 items-center px-4 py-2 bg-indigo-600 text-white rounded-lg 
                hover:bg-indigo-700 transition-colors duration-300">
                    Create new user
                </button>
            </div>
            {/* create new user modal */}
            {openModal && (
                <div className="modal" onClick={() => setOpenModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Login</h2>
                            <button onClick={() => setOpenModal(false)} className="close-btn">✖</button>
                        </div>

                        <form onSubmit={(e) => addNewUser(e)} className="modal-body">
                            {error && (<p className="error-text">{error}</p>)}
                            <label>
                                Email:
                                <input onChange={(e) => setEmail(e.target.value)} value={email}
                                    type="email"
                                />
                            </label>
                            <label>
                                Username:
                                <input onChange={(e) => setUsername(e.target.value)} value={username}
                                    type="text"
                                />
                            </label>
                            <label>
                                Password:
                                <input onChange={(e) => setPassword(e.target.value)} value={password}
                                    type="password"
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
