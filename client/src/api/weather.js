export const getWeatherByCity = async (city) => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error in weather api`);
        }

        const data = await response.json();
        return data;
    } catch (e) {
        console.error(`Error in weather api ${e.message}`);
        return null;
    }
};