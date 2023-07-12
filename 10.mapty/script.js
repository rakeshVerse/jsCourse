'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const btnDeleteAll = document.getElementById('delete_all');
const btnSort = document.getElementById('sort');
const btnShowAll = document.getElementById('show_all');
const containerActionBtns = document.querySelector('.actions_container');

////////////////////////////////////////////////////////////////////////////

// TO DO'S:
//   - Edit workout
//   - Fix empty localStorage problem in _getLocalStorage()
//   - Display different markers for Running & Cycling
//   - Rebuild Running & Cycling Objects after retriving from localStorage
//   - Use more realistic error messages
//   - Draw lines & shapes on map
//   - Show position name like - Running in Faro, Portugal
//   - Display weather
//   - Optimize Code
//   - Apply SOLID principle
//   - Apply Design Ptterns

//////////////////////////////////////////////////////////////////////////

// WORKOUT DATA

class Workout {
  // public data fields
  id = (Date.now() + '').slice(-10);
  date = new Date();
  clicks = 0;

  constructor(distance, duration, coords) {
    this.distance = distance; // in km
    this.duration = duration; // in min
    this.coords = coords; // [lat, lng]
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.desc = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()} `;
  }

  _clicks() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(distance, duration, coordinates, cadence) {
    super(distance, duration, coordinates);
    this.cadence = cadence;

    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // pace: min/km
    this.pace = (this.duration / this.distance).toFixed(1);
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(distance, duration, coordinates, elevation) {
    super(distance, duration, coordinates);
    this.elevation = elevation;

    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // speed: km/hr
    this.speed = (this.distance / (this.duration / 60)).toFixed(1);
    return this.speed;
  }
}

////////////////////////////////////////////////////////////////////////////

// APPLICATION ARCHITECTURE

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];
  #sorted = false;

  constructor() {
    // Get user's current position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Event handlers
    btnShowAll.addEventListener('click', this._showAllMarkers.bind(this)); // Show All
    btnDeleteAll.addEventListener('click', this._deleteAllWorkouts); // Delete All
    btnSort.addEventListener('click', this._sortWorkouts.bind(this)); // Sort
    inputType.addEventListener('change', this._toggleElevationField); // inputType change event
    form.addEventListener('submit', this._newWorkout.bind(this)); // Form submit event
    // prettier-ignore
    containerWorkouts.addEventListener('click',this._listItemHandler.bind(this)); // List item click event
  }

  _getPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {}
      );
    } else {
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    // Leaflet Map
    this.#map = L.map('map').setView([latitude, longitude], this.#mapZoomLevel);

    // Tile
    // L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    //   maxZoom: 19,
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
    // }).addTo(this.#map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Map click event
    this.#map.on('click', this._showForm.bind(this));

    // Render each workout on the map
    this.#workouts.forEach(workout => {
      this._renderWorkoutMarker(workout);
    });
  }

  _showAllMarkers() {
    // Create makers Array
    const markers = this.#workouts.map(workout => new L.Marker(workout.coords));

    // Fit Bounds in Viewport
    this.#map.fitBounds(L.featureGroup(markers).getBounds(), {
      padding: L.point(40, 40),
    });

    // Creating latlng object
    // var latlngs = [
    //   [17.385044, 78.486671],
    //   [16.506174, 80.648015],
    //   [17.686816, 83.218482],
    // ];
    // Creating a polygon
    // var polygon = L.polygon(latlngs, { color: 'red' });

    // Creating layer group
    // layerGroup.addTo(this.#map);

    // new L.featureGroup([
    //   [21.10665550739202, 79.03803142813184],
    //   [32.16063680560252, 65.80676953475471],
    //   [69.23013384858548, 82.08451628109934],
    // ]).addTo(this.#map);

    // var layerGroup = L.layerGroup([hydMarker, vskpMarker, vjwdMarker, polygon]);
  }

  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _resetForm() {
    inputCadence.value =
      inputDuration.value =
      inputDistance.value =
      inputElevation.value =
        '';
    inputType.value = 'running';
  }

  _hideForm() {
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    if (this.value === 'running') {
      inputElevation.closest('.form__row').classList.add('form__row--hidden');
      inputCadence.closest('.form__row').classList.remove('form__row--hidden');
    }

    if (this.value === 'cycling') {
      inputElevation
        .closest('.form__row')
        .classList.remove('form__row--hidden');
      inputCadence.closest('.form__row').classList.add('form__row--hidden');
    }
  }

  _newWorkout(e) {
    const isNumber = (...inputs) => inputs.every(inp => Number.isFinite(inp));
    const isPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Accecpt user input
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If running workout, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;

      // Validate data
      if (
        !isNumber(distance, duration, cadence) ||
        !isPositive(distance, duration, cadence)
      )
        return alert(`Error: All inputs must be positive numbers!`);

      // Create running object
      workout = new Running(distance, duration, [lat, lng], cadence);
    }

    // If cycling workout, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      // Validate data
      if (
        !isNumber(distance, duration, elevation) ||
        !isPositive(distance, duration)
      )
        return alert(`Error: All inputs must be positive numbers!`);

      // Create cycling object
      workout = new Cycling(distance, duration, [lat, lng], elevation);
    }

    // Add workout object to workouts Array
    this.#workouts.push(workout);

    // Render workout on Map as a Marker with popup
    this._renderWorkoutMarker(workout);

    // Render workout in List
    this._renderWorkoutListItem(workout);

    // Clear input fields + Hide form
    this._resetForm();
    this._hideForm();

    // Add data to local storage
    this._setLocalStorage();

    // Display actions buttons
    if (containerActionBtns.classList.contains('hidden'))
      containerActionBtns.classList.remove('hidden');
  }

  _renderWorkoutMarker(workout) {
    // Marker & Popup
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.desc}`
      )
      .openPopup();
  }

  _renderWorkoutListItem(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.desc}
        <section class="single_actions_container">
              <button class="single_action single_action--edit">🖊️ Edit</button>
              <button class="single_action single_action--delete">
                ❌ Delete
              </button>
            </section>
        </h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>`;

    if (workout.type === 'running') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>`;
    }

    if (workout.type === 'cycling') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevation}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>`;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  _listItemHandler(e) {
    const listItem = e.target.closest('.workout');

    if (!listItem) return;

    const listItemId = listItem.dataset.id;
    const editBtn = e.target.classList.contains('single_action--edit');
    const deleteBtn = e.target.classList.contains('single_action--delete');

    // Get workout object of the clicked list item from the workouts array
    const workout = this.#workouts.find(workout => workout.id === listItemId);

    if (editBtn) this._editWorkout(workout);

    if (deleteBtn) this._deleteWrokout(workout);

    if (!editBtn && !deleteBtn) this._moveToMarker.call(this, workout);
  }

  _moveToMarker(workout) {
    // Move map to the workout co-ordinates
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
        easeLinearity: 1,
      },
    });

    // Using public interface
    // workout._clicks();
  }

  _setLocalStorage() {
    // localStorage expects string value
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const localWrokouts = JSON.parse(localStorage.getItem('workouts'));

    if (!localWrokouts /*&& !localWrokouts.length*/) return;

    containerActionBtns.classList.remove('hidden'); // display actions buttons

    this.#workouts = localWrokouts;

    // Render each workout in the list
    this.#workouts.forEach(workout => {
      this._renderWorkoutListItem(workout);
    });
  }

  _deleteAllWorkouts() {
    localStorage.removeItem('workouts');
    location.reload();
  }

  _deleteWrokout(workout) {
    this.#workouts.pop(workout);
    this._setLocalStorage();
    location.reload();
  }

  _editWorkout(workout) {
    // // Show form with current data
    // inputDistance.value = workout.distance;
    // inputDuration.value = workout.duration;
    // if (workout.type === 'running') {
    //   inputType.value = 'running';
    //   inputCadence.value = workout.cadence;
    // }
    // if (workout.type === 'cycling') {
    //   inputType.value = 'cycling';
    //   inputElevation.value = workout.elevation;
    // }
    // this._showForm();
    // Reset form
  }

  _sortWorkouts() {
    const workouts = this.#sorted
      ? this.#workouts
      : this.#workouts.slice().sort((a, b) => b.distance - a.distance);

    // Remove existing list
    document.querySelectorAll('.workouts li').forEach(li => li.remove());

    // Render sorted list
    workouts.forEach(workout => this._renderWorkoutListItem(workout));

    this.#sorted = !this.#sorted;
  }
}

const app = new App();
