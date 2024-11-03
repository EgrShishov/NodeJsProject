export const getWeatherByCity = async (coords) => {
    const API_KEY = '0f8b781031427c1363d6b2a32c0a6a50\n';
    const url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`;

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