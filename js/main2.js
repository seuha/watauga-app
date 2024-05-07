import { initializeMap } from './map2.js';
import { filterParcels, removeSizeFilter, removeSlopeFilter, removeValueFilter } from './filters.js';
import { generateTopParcels } from './list.js';
import { initializeSearch } from './search.js';

const parcelInfoResp = await fetch('./data/output.geojson');
const parcelInfo = await parcelInfoResp.json();
console.log('Parcel Info:', parcelInfo);

const events = new EventTarget();
const map = initializeMap(parcelInfo, events);
window.themap = map;

//Search
initializeSearch(parcelInfo, events, map, map.parcelLayer, map.developmentProbabilityLayer, map.distanceToRoadsLayer);


// Call filterParcels with the map object
document.getElementById('apply-filters').addEventListener('click', () => {
    filterParcels(map.parcelLayer, map.developmentProbabilityLayer, map.distanceToRoadsLayer, map);
  });

document.getElementById('apply-slope-filters').addEventListener('click', () => {
    filterParcels(map.parcelLayer, map.developmentProbabilityLayer, map.distanceToRoadsLayer, map);
});

document.getElementById('apply-value-filters').addEventListener('click', () => {
    filterParcels(map.parcelLayer, map.developmentProbabilityLayer, map.distanceToRoadsLayer, map);
  });

// Generate top parcels on page load
generateTopParcels(parcelInfo.features, map, map.parcelLayer, map.developmentProbabilityLayer, map.distanceToRoadsLayer);


/* =============== Remove filterParcels =============== */
// Event listener for remove size filter button
document.getElementById('remove-filters').addEventListener('click', () => {
    console.log('Removing size filter...');
    removeSizeFilter(map);    
  });
  
  // Event listener for remove slope filter button
  document.getElementById('remove-slope-filters').addEventListener('click', () => {
    console.log('Removing slope filter...');
    removeSlopeFilter(map);
  });
  
  // Event listener for remove property value filter button
  document.getElementById('remove-value-filters').addEventListener('click', () => {
    console.log('Removing value filter...');
    removeValueFilter(map);
  });


/* =============== Legend =============== */
// Legend for Development Probability Layer
const legend_dvpt = L.control({ position: 'bottomright' });
legend_dvpt.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'info legend');
  const labels = [
  `<div><i style="background: ${"#7a0177"}"></i><span>${"Extremely Likely"}</span></div>`,
  `<div><i style="background: ${"#c51b8a"}"></i><span>${"Likely"}</span></div>`,
  `<div><i style="background: ${"#f768a1"}"></i><span>${"Somewhat Likely"}</span></div>`,
  `<div><i style="background: ${"#fa9fb5"}"></i><span>${"Somewhat Unlikley"}</span></div>`,
  `<div><i style="background: ${"#fcc5c0"}"></i><span>${"Unlikely"}</span></div>`,
  `<div><i style="background: ${"#feebe2"}"></i><span>${"Extremely Unlikely"}</span></div>`
  ];
  div.innerHTML = labels.join('');
  return div;
};

map.on("baselayerchange", function (event) {
  if (event.name === 'Development Probability') {
    legend_dvpt.addTo(map);
  } else {
    map.removeControl(legend_dvpt);
  }
});

// Legend for Dist to Road Layer
const legend_road = L.control({ position: 'bottomright' });
legend_road.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'info legend');
  const labels = [
    `<div><i style="background: ${"#bd0026"}"></i><span>${"Very Far"}</span></div>`,
    `<div><i style="background: ${"#f03b20"}"></i><span>${"Far"}</span></div>`,
    `<div><i style="background: ${"#fd8d3c"}"></i><span>${"Average"}</span></div>`,
    `<div><i style="background: ${"#fecc5c"}"></i><span>${"Nearby"}</span></div>`,
    `<div><i style="background: ${"#ffffb2"}"></i><span>${"Very Nearby"}</span></div>`
  ];
  div.innerHTML = labels.join('');
  return div;
};

map.on("baselayerchange", function (event) {
  if (event.name === 'Distance to Roads') {
    legend_road.addTo(map);
  } else {
    map.removeControl(legend_road);
  }
});


export {parcelInfo}