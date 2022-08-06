import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';


const BASE_URL = "https://restcountries.com/v3.1/all";
const options = "fields=name,capital,population,flags,languages";
const URL = `${BASE_URL}?${options}`;

const DEBOUNCE_DELAY = 300;

const countryField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryField.addEventListener('input', debounce(countryEntry, DEBOUNCE_DELAY));

function countryEntry(e) {
    e.preventDefault();
    let countryName = e.target.value.trim();
    console.log(countryName);
    if (countryName === '') {
        return (countryList.innerHTML = ''), (countryInfo.innerHTML = '');
    }
    
    fetchCountries(countryName)
        .then((countries) => {
            console.log(countries.length);
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
            if (countries.length === 1) {
                countryInfo.insertAdjacentHTML("beforeend", countryInfoGenerate(countries));
            }
            else if (countries.length > 10) {
                rectificationName();
            }
            else {
                countryList.insertAdjacentHTML("beforeend", countryListGenerate(countries));  
            }
        })
    .catch(incorrectName())
};


function countryListGenerate(countries) {
    const countryListItem = countries
        .map(({ flags, name }) => {
            return `
    <li class=country-list__item>
        <div>  
            <img class=country-list__flag src="${flags.svg}" alt='flag'width=40px heigth=40px></img>
        </div>
        <h2 class=country-list__name>${name.official}</h2>
    </li>`
        }).join('')
    // console.log(countryListItem);
    return countryListItem;
}

function countryInfoGenerate(countries) {
    const countryInfoItem = countries
        .map(({ flags, name, capital, population, languages }) => {
            return `
        <img class=country-list__flag src="${flags.svg}" alt='flag'width=40px heigth=40px></img>
        <h2 class=country-list__name>${name.official}</h2>
        <p class=country-info__capital>Capital:${capital}</p>
        <p class=country-info__population>Population:${population}</p>
        <p class=country-info__languages>Languages:${Object.values(languages).join(', ')}</p>`
        }).join('')
    return countryInfoItem;
}

function rectificationName() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
};

function incorrectName() {
    Notiflix.Notify.failure('Oops, there is no country with that name')
};
