'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords; //! [lat,lng]
    this.distance = distance; //! in km
    this.duration = duration; //! in min
  }
  _setDescription() {
    //prettier-ignore
    const months = ['January','February','March','April','May', 'June','July','August','September','October','November','December',
    ];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}
class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    // * min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    // * km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// class DeleteWorkout extends App {
//   constructor(coords, distance, duration, elevationGain) {
//     super(coords, distance, duration);
//     this._deleteSelection();
//   }
//   _deleteSelection(workout) {
//     console.log('click');
//   }
// }

// const run1 = new Running([34, -54], 5.3, 43, 435);
// const cycle1 = new Cycling([34, -54], 5.3, 43, 654);
// console.log(run1, cycle1);
// * APPLICATION ARCHITECTURE
class App {
  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Loction Error!');
        }
      );
  }
  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const cords = [latitude, longitude];

    this.#map = L.map('map').setView(cords, 13);
    // console.log(map);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    // * handle click
    this.#map.on('click', this._showForm.bind(this));
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideForm() {
    // Empty inputs
    inputDuration.value =
      inputCadence.value =
      inputDistance.value =
      inputElevation.value =
        '';
    //hide form
    // form.style.display = 'none'; // hides form instantly
    form.classList.add('hidden');
    // setTimeout(() => {
    //   form.style.display = 'grid';
    // }, 1000);
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    // ! helper functions
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositives = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositives(distance, duration, cadence)
      )
        return alert('Input must be a positive integer!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    this.#workouts.push(workout);

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositives(distance, duration)
      )
        return alert('Input must be a positive integer!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    this.#workouts.push(workout);

    this._renderWorkOutMarker(workout);

    this._renderWorkout(workout);

    //clear inputs fields + hide form
    this._hideForm();

    this._setlocalStorage();
  }
  _setlocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  _renderWorkOutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          maxHeight: 250,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}${workout.description}`
      )
      .openPopup();
  }
  _renderWorkout(workout) {
    // <button class="workout__delete--btn">Delete</button>
    // <button class="workout__move--map">Go to</button>
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    
    <h2 class="workout__title">${workout.description}</h2>

          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${+workout.distance}</span>
            <span class="workout__unit">km</span> 
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${+workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;

    ////  ::FIX THIS SHIT
    // console.log(
    //   workout.pace,
    //   workout.cadence,
    //   workout.speed,
    //   workout.elevationGain
    // );
    if (workout.type === 'cycling') {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
          </li>
          `;
    }
    if (workout.type === 'running') {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
          </li>`;
    }

    form.insertAdjacentHTML('afterend', html);
  }
  _moveToPopup(e) {
    const workoutEL = e.target.closest('.workout');
    if (!workoutEL) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEL.dataset.id
    );

    this.#map.setView(workout.coords, 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
}

const app = new App();
