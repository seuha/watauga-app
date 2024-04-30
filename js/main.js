import { runMap } from './map.js';
import { initializeList } from './list.js';
import { initializeSearch } from './search.js';

// (async () => {
const parcelInfoResp = await fetch('./data/prediction_0422_var.geojson');
if (!parcelInfoResp.ok) {
  throw new Error(`HTTP error! status: ${parcelInfoResp.status}`);
}

const parcelInfo = await parcelInfoResp.json();
console.log("Fetch successful", parcelInfo);

const events = new EventTarget();

const map = runMap(parcelInfo, events);
// initializeList(parcelInfo, events);
// initializeSearch(parcelInfo, events);

// })();



/* 
geolocation API: 11/8 lecture
gets location of current user ("asks for permission to get your position")
will return longitude and latitude
in meters
*/

function handleGeolocationSuccess(pos) {
  console.log(pos);

  const newEvent = new CustomEvent('geolocated', { detail: pos });
  events.dispatchEvent(newEvent);
}

function handleGeolocationError(err) {
  console.log(err);
}

navigator.geolocation.getCurrentPosition(
  handleGeolocationSuccess,
  handleGeolocationError);

window.map = map;
