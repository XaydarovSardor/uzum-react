import { Link } from "react-router-dom"
import assets from "../assets"

export const Korzina = () => {
    return (
        <div className="container flex flex-col gap-y-5 justify-center items-center">
            <img className="w-[128px] h-[128px]" src={assets.korzina} alt="no-product" />
            <h2 className="text-2xl font-bold">Savatingiz hozircha bo‘sh</h2>
            <p>Bosh sahifadan boshlang — kerakli tovarni qidiruv orqali topishingiz yoki to‘plamlarni ko‘rishingiz mumkin</p>
            <Link className="bg-[#e6e8ed] px-[14px] py-[7px] rounded-[4px]" to={"/"}>Bosh sahifa</Link>
        </div>
    )
}
