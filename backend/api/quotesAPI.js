module.exports = getData = async () => {
    const url = 'https://quotes15.p.rapidapi.com/quotes/random/?language_code=es';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ec37769452mshdd95dd180c5fa6ep17a417jsnf073bf53cf53',
            'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}