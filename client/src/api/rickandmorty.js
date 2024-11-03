export const getRickAndMortyRandomInfo = async () => {
    const url = `https://rickandmortyapi.com/api/character/?page=${Math.floor(Math.random() * 10)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error in rick and morty api`);
        }

        const data = await response.json();
        const item = Math.floor(Math.random() * 10) % data.info.count;
        return data.results[item];
    } catch (e) {
        console.error(`Error in rick and morty api ${e.message}`);
        return null;
    }
};