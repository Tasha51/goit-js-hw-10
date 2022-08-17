import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
    searchBoxEl: document.querySelector("#search-box"),
    countryListEl: document.querySelector(".country-list"),
    countryCardEl: document.querySelector(".country-info")
};

refs.searchBoxEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
    clearMarkup();

    const searchName = refs.searchBoxEl.value.trim();
    console.log(searchName);

    if (searchName === "") {
        clearMarkup();
        return;
    };

    API.fetchCountry(searchName)
        .then(countries => {
            appendMarkup(countries);
        }
        )
        .catch(error => {
           console.log(error);
        });
};

function appendMarkup(array) {
    if (array.length > 10) {
                clearMarkup();
                return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (array.length >= 2 && array.length <= 10) {
                clearMarkup();
                return renderCountryList(array);
    } else if (array.length === 1) {
                clearMarkup();
                return renderCountyCard(array);
    }
}

function renderCountryList(country) {
    const markup = country
        .map(el => {
            return `<li class="item">
    <img class="imeg" src = "${el.flags.svg}" alt="flag" width=60 height=60/>
    <p class="name_country"> ${el.name.official} </p>
    </li>`})
        .join('');
    
    refs.countryListEl.innerHTML = markup;
};


function renderCountyCard(country) {
    const markup = country
        .map(el => {
            return ` <div class="name_box">
    <img class="imeg" src = "${el.flags.svg}" alt="flag" width=60 height=60/>
    <p class="name_country"> ${el.name.official} </p>
    </div>
    <p class="info"> <span>Capital:</span> ${el.capital} </p>
    <p class="info"> <span>Population:</span> ${el.population} </p>
    <p class="info"> <span>Languages:</span> ${Object.values(el.languages)} </p>`
        })
        .join('');
    
    refs.countryCardEl.innerHTML = markup;
};

function clearMarkup() {
    refs.countryListEl.innerHTML = "";
    refs.countryCardEl.innerHTML = "";
}
