import {getWeatherByCity} from "../api/weather";
import {getRickAndMortyRandomInfo} from "../api/rickandmorty";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const HomeComponent = () => {
    const [position, setPosition] = useState(null);
    const [weather, setWeather] = useState(null);
    const [rickAndMortyFact, setRickAndMortyFact] = useState(null);

    useEffect(() => {
        const slides = document.querySelectorAll(".single-slider");
        let currentSlide = 0;

        const changeSlide = () => {
            slides.forEach(slide => slide.classList.remove("single-slider-active"));
            slides[currentSlide].classList.add("single-slider-active");
            currentSlide = (currentSlide + 1) % slides.length;
        };
        setInterval(changeSlide, 5000);
        changeSlide();
    }, []);

    useEffect(() => {
        const getLocation = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setPosition);
            }
        }

        const getRickAndMortyRandomFact = async () => {
            const data = await getRickAndMortyRandomInfo();
            setRickAndMortyFact(data);
        }

        getLocation();
        getRickAndMortyRandomFact();
    }, []);

    useEffect(() => {
        const setWeatherData = async () => {
            if (position) {
                const weatherData = await getWeatherByCity(position.coords);
                setWeather(weatherData.list[0]);
            }
        };
        setWeatherData();
    }, [position]);


    return (
        <div className="home-component">
            <section className="slider">
                <div className="hero-slider">
                    <div className="single-slider" style={{backgroundImage: "url('public/slider2.jpg')"}}>
                        <div className="container">
                            <div className="text-block">
                                <div className="text">
                                    <h1><span>Agenda Clinic</span> Provide <span>Medical</span> Services That You
                                        Can <span>Trust!</span></h1>
                                    <p>Добро пожаловать в Agenda Clinic. Agenda Clinic была основана в 2024 году группой
                                        профессионалов в области медицины, стремящихся предоставить высококачественное
                                        медицинское обслуживание в дружелюбной и комфортной обстановке.</p>
                                    <div className="action">
                                        <Link to="/doctors" className="btn">Get Appointment</Link>
                                        <a href="#" className="btn primary">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="single-slider" style={{backgroundImage: "url('public/slider.jpg')"}}>
                        <div className="container">
                            <div className="text-block">
                                <div className="text">
                                    <h1><span>Agenda Clinic</span> Provide <span>Medical</span> Services That You
                                        Can <span>Trust!</span></h1>
                                    <p>Добро пожаловать в Agenda Clinic. Agenda Clinic была основана в 2024 году группой
                                        профессионалов в области медицины, стремящихся предоставить высококачественное
                                        медицинское обслуживание в дружелюбной и комфортной обстановке.</p>
                                    <div className="action">
                                        <Link to="/doctors" className="btn">Get Appointment</Link>
                                        <a href="#" className="btn primary">About Us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="single-slider" style={{backgroundImage: "url('public/slider3.jpg')"}}>
                        <div className="container">
                            <div className="text-block">
                                <div className="text">
                                    <h1><span>Agenda Clinic</span> Provide <span>Medical</span> Services That You
                                        Can <span>Trust!</span></h1>
                                    <p>Добро пожаловать в Agenda Clinic. Agenda Clinic была основана в 2024 году группой
                                        профессионалов в области медицины, стремящихся предоставить высококачественное
                                        медицинское обслуживание в дружелюбной и комфортной обстановке.</p>
                                    <div className="action">
                                        <Link to="/doctors" className="btn">Get Appointment</Link>
                                        <a href="#" className="btn primary">Contact Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div id="fun-facts" className="fun-facts section overlay">
                <div className="container">
                    <ul className="navbar">
                        <li>
                            <div className="single-fun">
                                <i className="icofont icofont-home"></i>
                                <div className="content">
                                    <span className="counter">3468</span>
                                    <p>Оффисов по всей беларуси</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="single-fun">
                                <i className="icofont icofont-user-alt-3"></i>
                                <div className="content">
                                    <span className="counter">557</span>
                                    <p>Специалистов и докторов (не пациентов!!!)</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="single-fun">
                                <i className="icofont-simple-smile"></i>
                                <div className="content">
                                    <span className="counter">4379</span>
                                    <p>Здоровых пациентов</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="single-fun">
                                <i className="icofont icofont-table"></i>
                                <div className="content">
                                    <span className="counter">0.5</span>
                                    <p>Лет опыта у нас</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <section id="sec">
                <p>С первых дней своего существования Agenda Clinic мы ставили перед собой цель не только лечить
                    болезни, но и заботиться о здоровье и благополучии наших пациентов. Мы начали с небольшого
                    коллектива врачей и медсестёр, и постепенно, благодаря положительным отзывам и рекомендации
                    пациентов, расширили наши услуги и команду. На сегодняшний день Agenda Clinic состоит из команды
                    высококвалифицированных специалистов в различных областях медицины.</p>
                <p>Мы понимаем, что выбор клиники – это важное решение. Вот несколько причин, почему Agenda Clinic
                    является лучшим выбором для вас:</p>
                <ul>
                    <li><strong>Квалифицированные специалисты:</strong> В нашей команде работают только опытные врачи с
                        высокой квалификацией и многолетним опытом работы.
                    </li>
                    <li><strong>Современное оборудование:</strong> Мы используем только передовые технологии и
                        оборудование для диагностики и лечения.
                    </li>
                    <li><strong>Индивидуальный подход:</strong> Каждому пациенту мы предлагаем персонализированные планы
                        лечения, ориентируясь на его уникальные потребности.
                    </li>
                    <li><strong>Комфортная атмосфера:</strong> Наша клиника создана так, чтобы пациентам было удобно и
                        уютно. У нас дружелюбный персонал, готовый помочь вам в любое время.
                    </li>
                    <li><strong>Многообразие услуг:</strong> Мы предлагаем широкий спектр медицинских услуг, включая
                        терапию, стоматологию, хирургические процедуры и профилактические осмотры.
                    </li>
                </ul>
                <p>Не откладывайте заботу о своём здоровье! Запишитесь на консультацию к нашим врачам уже сегодня. Мы
                    гарантируем вам профессиональное обслуживание и внимательное отношение к каждому пациенту.</p>
            </section>

            <section className="additional-info">
                <section className="weather-section">
                    <h1 className="weather-title">Weather Forecast</h1>
                    {weather ? (
                        <div className="weather-info">
                            <p className="temperature">{weather.main.temp}</p>
                            <p className="feels-like">Feels like: {weather.main.feels_like}</p>
                            <p className="condition">{weather.weather[0].description}</p>
                            <p className="humidity">Humidity: {weather.main.humidity} %</p>
                        </div>
                    ) : (
                        <p>Loading weather</p>
                    )}
                    <div className="weather-icon">
                        <img src="weather-icon.png" alt="Weather Icon"/>
                    </div>
                </section>

                <section className="rick-and-morty">
                    <h1 className="fact-title">Rick And Morty Random Fact!</h1>
                    {rickAndMortyFact ? (
                        <div className="info-card">
                            <img className="info-card__img" src={rickAndMortyFact.image}/>
                            <div className="info-group">
                                <div className="info-card__name">Имя:</div>
                                <div className="info-card__name">{rickAndMortyFact.name}</div>
                            </div>
                            <div className="info-group">
                                <div className="info-card__status">Статус:</div>
                                <div className="info-card__status">{rickAndMortyFact.status}</div>
                            </div>
                            <div className="info-group">
                                <div className="info-card__species">Вид:</div>
                                <div className="info-card__species">{rickAndMortyFact.species}</div>
                            </div>
                            <div className="info-group">
                                <div className="info-card__gender">Гендер:</div>
                                <div className="info-card__gender">{rickAndMortyFact.gender}</div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading fact</p>
                    )}
                </section>
            </section>

        </div>
    )
};
export default HomeComponent;