import {getWeatherByCity} from "../api/weather";
import {getRickAndMortyRandomInfo} from "../api/rickandmorty";
import {useEffect, useState} from "react";

const HomeComponent = () => {
    const [position, setPosition] = useState(null);
    const [weather, setWeather] = useState(null);
    const [rickAndMortyFact, setRickAndMortyFact] = useState(null);
    const [scrollY, setScrollY] = useState(0);

    const scaleValue = 1 + scrollY / 500

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const left_doctor = document.getElementById('doctor_left');
        const right_doctor = document.getElementById('doctor_right');
        const text = document.getElementById('text');
        const bgText = document.getElementById('text-bg');

        left_doctor.style.left = `-${scrollY/0.7}px`
        right_doctor.style.left = `${scrollY/0.7}px`
        text.style.bottom = `-${scrollY}px`;
        bgText.style.scale = `${scaleValue}`;
        bgText.style.right = `${scrollY/scaleValue/0.7}px`;
    }, [scrollY, scaleValue])

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const getLocation = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setPosition, (error) => {
                    console.error(error);
                    alert("Unable to retrieve your location.");
                });
            } else {
                alert("Geolocation is not supported by this browser.");
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
                console.log(weatherData);
            }
        };
        setWeatherData();
    }, [position]);

    return (
        <div className="home-component">
            <section id="top">
                <img src='../../public/medical_results.png' id='bg'/>
                <h2 id="text">AgendaClinic</h2>
                <h1 id="text-bg">AgendaClinic</h1>
                <img src='../../public/left_doctor.png' id="doctor_left"/>
                <img src='../../public/right_doctor.png' id="doctor_right"/>
            </section>

            <section id="sec">
                <h2>Добро пожаловать в Agenda Clinic</h2>

                <p>Agenda Clinic была основана в 2024 году группой профессионалов в области медицины, стремящихся
                    предоставить высококачественное медицинское обслуживание в дружелюбной и комфортной обстановке. Наша
                    клиника расположена в центре города, что делает её доступной для всех желающих получить
                    квалифицированную медицинскую помощь.</p>

                <h2>Наша история</h2>
                <p>С первых дней своего существования Agenda Clinic мы ставили перед собой цель не только лечить
                    болезни, но и заботиться о здоровье и благополучии наших пациентов. Мы начали с небольшого
                    коллектива врачей и медсестёр, и постепенно, благодаря положительным отзывам и рекомендации
                    пациентов, расширили наши услуги и команду. На сегодняшний день Agenda Clinic состоит из команды
                    высококвалифицированных специалистов в различных областях медицины.</p>

                <h2>Преимущества нашей клиники</h2>
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

                <h2>Запишитесь на консультацию</h2>
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