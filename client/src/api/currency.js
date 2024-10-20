export const convertCurrency = async (fromCurrency, toCurrency) => {
    const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
    const url = `https://free.currconv.com/api/v7/convert?q=${fromCurrency}_${toCurrency}&compact=ultra&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error in currency requesting');
        }

        const data = await response.json();
        return data[`${fromCurrency}_${toCurrency}`];
    } catch (error) {
        console.error(error);
        return null;
    }
};