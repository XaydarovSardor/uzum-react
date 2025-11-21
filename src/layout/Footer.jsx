import assets from "../assets";
import "./footer.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container flex">
                <div className="footer-section">
                    <h4>Biz haqimizda</h4>
                    <ul>
                        <li><a href="#">Topshirish punktlari</a></li>
                        <li><a href="#">Vakansiyalar</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Foydalanuvchilarga</h4>
                    <ul>
                        <li><a href="#">Biz bilan bog'lanish</a></li>
                        <li><a href="#">Savol-Javob</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Tadbirkorlarga</h4>
                    <ul>
                        <li><a href="#">Uzumda soting</a></li>
                        <li><a href="#">Sotuvchi kabinetiga kirish</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <div className="footer-social">
                        <h4>Ilovani yuklab olish</h4>
                        <div className="app-links">
                            <a href="#"><img src={assets.appStore} alt="AppStore" />AppStore</a>
                            <a href="#"><img src={assets.playMarket} alt="Google Play" />Google Play</a>
                        </div>
                    </div>

                    <div className="footer-link">
                        <h4>Uzum ijtimoiy tarmoqlarda</h4>
                        <div className="social-icons">
                            <a href="#"><img src={assets.instagram} alt="Instagram" /></a>
                            <a href="#"><img src={assets.telegram} alt="Telegram" /></a>
                            <a href="#"><img src={assets.youtube} alt="YouTube" /></a>
                            <a href="#"><img src={assets.facebook} alt="Facebook" /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container flex justify-between">
                    <ul>
                        <a href="#">Maxfiylik kelishuvi</a>
                        <a href="#">Foydalanuvchi kelishuvi</a>
                    </ul>
                    <p>©2024© XK MCHJ «UZUM MARKET». STIR 309376127. Barcha huquqlar himoyalangan</p>
                </div>
            </div>

        </footer>
    )
}
