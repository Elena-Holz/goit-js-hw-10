const BASE_URL = "https://restcountries.com/v3.1/name/";
const options = "fields=name,capital,population,flags,languages";
// const URL = `${BASE_URL}?${options}`;

export function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${options}`)
    .then(response => response.json())
    // .then((countries) => {
    //   console.log('country', countries);
    // })
    .catch(error => console.log('error', error))
};
