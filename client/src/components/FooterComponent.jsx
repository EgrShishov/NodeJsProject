import {Link} from "react-router-dom";

const FooterComponent = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-section footer-about">
                    <h5>Немного о нас</h5>
                    <p>
                        <strong><i>AgendaClinic</i></strong> предоставляет высококачественные медицинские услуги
                        с акцентом на индивидуальный подход к каждому пациенту.
                        Наша миссия — заботиться о вашем здоровье и благополучии, используя современные технологии и инновационные методы.
                    </p>
                </div>
                <div className="footer-section footer-links">
                    <h5>Ссылки</h5>
                    <ul>
                        <li><a href="/faq">ЧаВО</a></li>
                        <li><a href="/vacancies">Вакансии</a></li>
                        <li><a href="/about">О компании</a></li>
                        <li><a href="/privacyPolicy">Политика конфиденциальности</a></li>
                    </ul>
                </div>
                <div className="footer-section footer-hours">
                    <h5>График работы</h5>
                    <table>
                        <tbody>
                        <tr>
                            <td>Пн - Пт:</td>
                            <td>8:00 - 17:30</td>
                        </tr>
                        <tr>
                            <td>Сб - Вс:</td>
                            <td>8:00 - 16:30</td>
                        </tr>
                        <tr>
                            <td>В экстренных ситуациях звонить по тел:</td>
                            <td>5-84-89</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="footer-bottom">
                © 2024 Права никому не принадлежат:
                <a href="http://localhost:5173/home">  AgendaClinic.by</a>
            </div>
        </footer>
    );
};

export default FooterComponent;