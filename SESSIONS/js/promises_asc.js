'use script';

const root = document.getElementById('root');
const inpt = document.querySelector('input');
const wmibtn = document.querySelector('.btn-wmi');

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

  Languages: [${d.languages > 0 && d.languages.map(l => l.name)}] <br\>

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

  root.insertAdjacentHTML('beforeend', html);
}

function renderCountry(data) {
  //mapping multiple contries

  data.map(d => {
    renderCountryHTML(d);
  });
}
/**
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
 */

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

//* ALTERNATIVE of XMLHttpRequest -> FETCH

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/alpha/${n}`);
// request.send();

/**

const countryData = country => {
  fetch(`https://restcountries.com/v2/name/${country}`)
    //country 1 chain
    .then(response => {
      // console.log(response);
      if (!response.ok) {
        throw new Error(`Country not found!! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      //country 1 render
      renderCountry(data);

      //country 2 (neighbour)
      const neighboursData = data[0]?.borders[0];
      if (!neighboursData) return;

      return fetch(`https://restcountries.com/v2/alpha/${neighboursData}`);
    })
    //country 2 chain and render
    .then(response => response.json())
    .then(data => renderCountry([data])) //converted data to array because it has only 1 object
    .catch(err => renderErr(err)) // !error state handle it does not consider status code
    .finally(() => {
      //what to do after error
      setTimeout(() => {
        renderErr('');
      }, 2000);
    });
};
function renderErr(err) {
  document.querySelector('.error').textContent = `${err}`;
}
wmibtn.addEventListener('click', function () {
  root.innerText = '';
  counter = 0;
  countryData('germany');
});

*/

const userLocation = function (lat, lon) {
  fetch(
    `https://us1.locationiq.com/v1/reverse?key=pk.6db4b71efa5726df589519e7059cfa23&lat=${lat}&lon=${lon}&format=json&`
  )
    .then(res => {
      if (!res.ok) {
        throw new Error('Toooo MANY REQUEST PER SECOND!');
      }
      return res.json();
    })
    .then(data => console.log(data))
    .catch(err => console.error(err));
};

// userLocation(52.508, 13.381);
// userLocation(19.037, 72.873);

//EVENTS: (Micro-tasks)

console.log('Start'); // 1st

setTimeout(() => console.log('SetTimeout event'), 0); // 5th

Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 3rd

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i <= 10000000000; i++) {}
  console.log(res);
}); // 4th

console.log('End'); //2nd
