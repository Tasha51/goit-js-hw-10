import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1';
const fields = 'name,capital,population,flags,languages'
function fetchCountry(name) {

    return fetch(`${BASE_URL}/name/${name}?fields=${fields}`).then(response => {
        if (!response.ok) {
            throw new Error(Notiflix.Notify.failure("Oops, there is no country with that name"));
        }
        return response.json();
    }
    );   
}

export default {fetchCountry };