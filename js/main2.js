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
initializeSearch(parcelInfo, events, map);


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


/* =============== Legend =============== */

// Legend for Development Probability Layer
const legend_dvpt = L.control({position: 'bottomright'});

legend_dvpt.onAdd = function (map) {

		const div = L.DomUtil.create('div', 'info legend');
		const labels = [
      `<i style="background: ${"#7a0177"}"></i>${"p>0.8"}`,
      `<i style="background: ${"#c51b8a"}"></i>${"0.4<p=<0.8>"}`,
      `<i style="background: ${"#f768a1"}"></i>${"0.2<p=<0.4"}`,
      `<i style="background: ${"#fa9fb5"}"></i>${"0.1<p=<0.2"}`,
      `<i style="background: ${"#fcc5c0"}"></i>${"0.05<p=<0.1"}`,
      `<i style="background: ${"#feebe2"}"></i>${"p=<0.05"}`
      ];

		div.innerHTML = labels.join('<br>');
		return div;
	};

    legend_dvpt.addTo(map.developmentProbabilityLayer);


// Legend for Dist to Road Layer
const legend_road = L.control({position: 'bottomright'});

legend_road.onAdd = function (map) {

        const div = L.DomUtil.create('div', 'info legend');
        const labels = [
          `<i style="background: ${"#bd0026"}"></i>${"Very Far"}`,
          `<i style="background: ${"#f03b20"}"></i>${"Far"}`,
          `<i style="background: ${"#fd8d3c"}"></i>${"Average"}`,
          `<i style="background: ${"#fd8d3c"}"></i>${"Nearby"}`,
          `<i style="background: ${"#ffffb2"}"></i>${"Very Nearby"}`
          ];

            div.innerHTML = labels.join('<br>'); // I'm not sure what this does
            return div;
	};

    legend_road.addTo(map.distanceToRoadsLayer);






export {parcelInfo}