'use script';

const root = document.getElementById('root');
let html = null;
let counter = 0;

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
    // console.log(data);*

    if (!data) return;
    if (data.length === 0) return;

    data.map(d => {
      counter++;
      html = `
          ${counter}:<strong>${d.name}</strong><br\>

          Region:<u>${d.region} </u><br\>

          Population: ${
            d.population > 1000000
              ? (d?.population / 1000000).toFixed(1) + 'M'
              : d?.population
          } <br\>

          Languages: [${d.languages.map(l => l.name)}] <br\>

          Currency:  ${
            d.currencies && d.currencies.length > 0
              ? d.currencies.map(c => c.name)
              : 'Is Not Available!!'
          }<br\>

           <img src=${
             d?.flag
           } style = " width:25rem ;height:15rem"\> <br\><br\>`;

      root.insertAdjacentHTML('beforeend', html);
    });
  });
};

// * Selective
// getCountryData('germany');
// getCountryData('india');
// getCountryData('usa');
// getCountryData('china');
// getCountryData('france');
// getCountryData('singapore');

//* All

getCountryData('all');
