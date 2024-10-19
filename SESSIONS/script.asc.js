'use script';

const root = document.getElementById('root');
const inpt = document.querySelector('input');

let html = null;
let counter = 0;

function renderCountryHTML(d) {
  //html render
  counter++;
  html = `
  ${counter + ':'}<strong>${d.name}</strong><br\>

  Region:<u>${d.region} </u><br\>

  Population: ${
    d.population > 1000000
      ? (d?.population / 1000000).toFixed(1) + 'M'
      : d?.population
  } <br\>

  Alt spellings: ${
    d.altSpellings ? d.altSpellings.map(c => c) : 'Is Not Available!!'
  } <br\>

  Languages: [${d.languages.map(l => l.name)}] <br\>

  Currency:  ${
    d.currencies && d.currencies.length > 0
      ? d.currencies.map(c => c.name)
      : 'Is Not Available!!'
  }<br\>

  Borders:  ${
    d.borders && d.borders.length > 0
      ? d.borders.map(c => c)
      : 'Is Not Available!!'
  }<br\>

   <img src=${d?.flag} style = " width:25rem ;height:15rem"\> <br\><br\>`;
}

function renderCountry(data) {
  //mapping multiple contries
  data.map(d => {
    renderCountryHTML(d);
    root.insertAdjacentHTML('beforeend', html);
  });
}

function getNeighbours(data) {
  //initial title
  root.insertAdjacentHTML(
    'beforeend',
    `<h2>Neighbours of ${data.map(d => d.name)}</h2><br/><br/>`
  );

  //neighbour initialization
  const neighboursData = data.flatMap(d => d.borders);
  if (!neighboursData) return; //saftey optional

  const neighbours = neighboursData.filter(n => n !== undefined);
  counter = 0;

  neighbours.map(n => {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/alpha/${n}`);
    request.send();
    request.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText); //data

      renderCountryHTML(data2); //html function
      root.insertAdjacentHTML('beforeend', html); //attach html
    });
  });
}

const getCountryData = function (country) {
  const request = new XMLHttpRequest();

  if (country === 'all') {
    request.open('GET', `https://restcountries.com/v2/${country}`); //all
  } else {
    request.open('GET', `https://restcountries.com/v2/name/${country}`); /// SPECIFIC COUNTRY
  }

  request.send();

  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText);
    if (!data && data.length === 0) return;

    renderCountry(data); // initial searched countries /all countries

    if (country === 'all') return; // no neighbours for all contries
    getNeighbours(data); // neighbours
  });
};

// cleaning function
function cleanSlate(spec) {
  root.textContent = '';
  counter = 0;
  document.querySelector('.btn-all').disabled = spec ? false : true;
  inpt.focus();
}

// input specific
document.querySelector('input').addEventListener('keypress', function (e) {
  if (inpt.value && e.key === 'Enter') {
    cleanSlate(true);
    getCountryData(inpt.value);
    inpt.value = '';
  }
});

// all countries
document.querySelector('.btn-all').addEventListener('click', function () {
  cleanSlate();
  getCountryData('all');
  inpt.value = '';
});

/**
//! CALLBACK HELL
setTimeout(() => {
  console.log('1 1s');
  setTimeout(() => {
    console.log('2 3s');
    setTimeout(() => {
      console.log('3 3s');
      setTimeout(() => {
        console.log('4 1s');
      }, 1000);
    }, 3000);
  }, 3000);
}, 1000);
 */
