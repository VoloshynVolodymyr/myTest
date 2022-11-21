const BASE_URL = 'https://api.api-ninjas.com/v1/convertcurrency';
// const options = 'fields=name,capital,currencies,population,flags,languages';

export default function fetchCurrencies(currency1, currency2, total){
return fetch(`${BASE_URL}?have=${currency1}&want=${currency2}&amount=${total}`)
.then(response => {
    if (!response.ok) {throw new Error('404 not found');}

    return response.json();
  });
}