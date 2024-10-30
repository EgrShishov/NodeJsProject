import {getWeatherByCity} from "../api/weather";
import {getRickAndMortyRandomInfo} from "../api/rickandmorty";
import {useEffect, useState} from "react";

const HomeComponent = () => {
    const [ position, setPosition ] = useState(null);
    const [ weather, setWeather ] = useState(null);
    const [ rickAndMortyFact, setRickAndMortyFact ] = useState(null);

    window.addEventListener('scroll',() => {
        const left_doctor = document.getElementById('doctor_left');
        const right_doctor = document.getElementById('doctor_right');
        const text = document.getElementById('text');
        let value = scrollY;
        left_doctor.style.left = `-${value/0.7}px`
        right_doctor.style.left = `${value/0.7}px`
        text.style.bottom = `-${value}px`;
    })

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
                <img src='../../public/left_doctor.png' id="doctor_left"/>
                <img src='../../public/right_doctor.png' id="doctor_right"/>
            </section>

            <section id="sec">
                <h2>Добро пожаловать в Agenda Clinic</h2>
                <p> Agenda Clinic предоставляет надежные и персонализированные страховые решения для частных лиц и
                    компаний. Наша миссия — защищать то, что важно для вас, обеспечивая финансовую безопасность и
                    уверенность в будущем.</p>
                <p> Мы предлагаем широкий спектр услуг, включая страхование жизни, здоровья, имущества и бизнеса.
                    Опытная команда консультантов готова разработать индивидуальные программы, соответствующие вашим
                    потребностям.</p>
                <p> Мы ценим прозрачность, оперативность и высокое качество обслуживания. С нами вы можете быть уверены
                    в защите от непредвиденных обстоятельств. Agenda Insurance — ваш партнер в обеспечении стабильности
                    и защиты на каждом этапе вашей жизни и деятельности. </p>
            </section>

            <section className="weather-section">
                <h1 className="weather-title">Weather Forecast</h1>
                { weather ? (
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
                        <div className="info-card__name">{rickAndMortyFact.name}</div>
                        <div className="info-card__status">{rickAndMortyFact.status}</div>
                        <div className="info-card__species">{rickAndMortyFact.species}</div>
                        <div className="info-card__gender">{rickAndMortyFact.gender}</div>
                        <img className="info-card__img" src={rickAndMortyFact.image} />
                    </div>
                ) : (
                    <p>Loading fact</p>
                )}
            </section>

        </div>
    )
};
export default HomeComponent;