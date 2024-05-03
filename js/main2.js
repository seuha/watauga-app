import { initializeMap } from './map2.js';
import { filterParcels, removeSizeFilter, removeSlopeFilter, removeValueFilter } from './filters.js';
import { generateTopParcels } from './list.js';
// import { initializeSearch } from './search.js';

const parcelInfoResp = await fetch('./data/output.geojson');
const parcelInfo = await parcelInfoResp.json();
console.log('Parcel Info:', parcelInfo);

const events = new EventTarget();
const map = initializeMap(parcelInfo, events);
window.themap = map;

// Search
initializeSearch(data, events)


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
generateTopParcels(parcelInfo.features, map, map.parcelLayer);


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


export {parcelInfo}