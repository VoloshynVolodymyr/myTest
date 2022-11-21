import './css/styles.css';
import lodash from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './JS/fetchCountries';
import fetchCurrencies from './JS/fetchCurrencies'
Notify.init({
  width: '480px',
  position: 'left-bottom',
  distance: '10px',
  cssAnimationDuration: 1000,
  opacity: 1,
  fontSize: '32px',
});

let arrayCurrentCountries = [];
let arraySelectedCountries = [];
let firstCurrency;
let secondCurrency;

const form1El = document.querySelector('.form1');
const form2El = document.querySelector('.form2');
const btnEl = document.querySelector('.btn');
const userInput = document.querySelector('.userInput');
const userOutput = document.querySelector('.userOutput');
form1El.addEventListener('input', onForm1Input);
form2El.addEventListener('input', onForm2Input);
btnEl.addEventListener('click', calculateCurrencies);
const currentCountryMarkup = document.querySelector('.first-country');
const selectedCountryMarkup = document.querySelector('.second-country');

function onForm1Input(e) {
  e.preventDefault();
  const currentCountry = e.currentTarget.elements.currentCountry.value.trim();
  currentCountryMarkup.innerHTML = '';
  fetchCountries(currentCountry).then(countries => {
    arrayCurrentCountries = [...countries];
    if (arrayCurrentCountries.length === 1) {
         currentCountryMarkup.innerHTML = createMarkupOneCountry(
        arrayCurrentCountries[0]
      );
    }
  });
}

function onForm2Input(e) {
  e.preventDefault();
  const selectedCountry = e.currentTarget.elements.selectedCountry.value.trim();
  selectedCountryMarkup.innerHTML = '';
  fetchCountries(selectedCountry).then(countries => {
    arraySelectedCountries = [...countries];
    if (arraySelectedCountries.length === 1) {
      console.log(arraySelectedCountries);
      selectedCountryMarkup.innerHTML = createMarkupOneCountry(
        arraySelectedCountries[0]
      );
    }
    firstCurrency = arrayCurrentCountries[0].currencies[0].code;
    secondCurrency = arraySelectedCountries[0].currencies[0].code;

       });
      
}

function createMarkupOneCountry(elem) {
  return `<p class="text-format"><b>${elem.name}</b></p>
  <p class="text-format"><b>Currency: ${elem.currencies.map(e => e.code).join(', ')}</b></p>
  <img 
                src="${elem.flags.svg}" 
                alt="Flag of ${elem.name}"
                width=280>

        `;
}
function calculateCurrencies(){
    if (userInput.value){
      fetchCurrencies(firstCurrency, secondCurrency, +userInput.value)
    .then(data => {
      if (data.new_currency==='RUB') {
        Notify.warning('Нашо вам те гімно?');
        userOutput.value=""
        return;};
      userOutput.value=data.new_amount;
    })
    .catch(err => console.log(err));
    }
}