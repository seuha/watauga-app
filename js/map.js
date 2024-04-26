
function createMap(parcelInfo) {

  let map = L.map('map',{
  }).setView([36.216795, -81.6745517], 12);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);


  return map;
}

function getDvptColor(d) { //Maximum dvpt value: 0.934
  return d > 0.8 ? '#7a0177' :
         d > 0.4 ? '#c51b8a' :
         d > 0.2 ? '#f768a1' :
         d > 0.1 ? '#fa9fb5' :
         d > 0.05 ? '#fcc5c0' :
                    '#feebe2';
}

function getRoadColor(d) { //Maximum Dist_Road value: 31305.5187821109
  return d > 25040 ? '#bd0026' :
         d > 18780 ? '#f03b20' :
         d > 12520 ? '#fd8d3c' :
         d > 6260 ? '#fd8d3c' :
                    '#ffffb2';
}


function addParcelLayer(map, parcelInfo) {

  const dvptProbSource = L.geoJson(parcelInfo, {
    filter: function(feature) {
      return feature.properties['Dvpt_Prob'] !== null;
    },
    style: function(feature) {
      return {
        color: 'grey',
        fillColor: getDvptColor(feature.properties['Dvpt_Prob']),
        fillOpacity: 1,
        weight: 2, 
        opacity: 0.1 
        
      };
   }
  });

  const nearestRoadSource = L.geoJson(parcelInfo, {
    filter: function(feature) { 
      return feature.properties['Dist_Road'] !== null;
    },
    style: function(feature) {
      return { 
        color: 'grey',
        fillColor: getRoadColor(feature.properties['Dist_Road']),
        fillOpacity: 1,
        weight: 2, 
        opacity: 0.1 
      };
    }
  });

  const dvptProbLayer = L.layerGroup([dvptProbSource]).addTo(map);
  const nearestRoadLayer = L.layerGroup([nearestRoadSource]);
  
  const parcelModeCheckBoxes = document.querySelectorAll('input[name="parcel-mode"]');

  
  const initialMode = document.querySelector('input[name="parcel-mode"]:checked').value;
  if (initialMode === 'Dvpt_Prob') {
    console.log("Initial Mode: Adding dvptProbLayer...")
    map.addLayer(dvptProbLayer);
  } else {
    map.addLayer(nearestRoadLayer);
  }

  parcelModeCheckBoxes.forEach((checkBox) => {
    checkBox.addEventListener('change', () => {
      const selectMode = document.querySelector('input[name="parcel-mode"]:checked').value;

      console.log("Select Mode:", selectMode)

      if (selectMode === 'Dvpt_Prob') {
        console.log("Adding development likelihood layers...");
        map.removeLayer(nearestRoadLayer);
        map.addLayer(dvptProbLayer);
      } else {
        console.log("Adding nearest road layers...");
        map.removeLayer(dvptProbLayer);
        map.addLayer(nearestRoadLayer);
      }
    });
  });

}



function initializeMap(parcelInfo, events) {
  console.log("Initializing map...");
  const map = createMap(parcelInfo);

  console.log("Adding parcel layers...");
  addParcelLayer(map, parcelInfo);
 
  // addParcelFilter(map, parcelInfo, events);
  
  
  return map;
}

export {
  initializeMap,
};


//   const slopeLayer = L.geoJSON(parcelInfo.data.slope, {
//     style: getChoroplethStyle
//   });
  
//   const choroplethLayerGroup = L.layerGroup([liklihoodLayer, distanceLayer, slopeLayer]);
//   choroplethLayerGroup.addTo(map);

//   document.getElementById('likelihood').addEventListener('change', (evt) => {
//     if (evt.target.checked) {
//       liklihoodLayer.addTo(map);
//     } else {
//       map.removeLayer(liklihoodLayer);
//     }
//   });

//   document.getElementById('distance-to-main-roads').addEventListener('change', (evt) => {
//     if (evt.target.checked) {
//       distanceLayer.addTo(map);
//     } else {
//       map.removeLayer(distanceLayer);
//     }
//   });

//   document.getElementById('slope').addEventListener('change', (evt) => {
//     if (evt.target.checked) {
//       slopeLayer.addTo(map);
//     } else {
//       map.removeLayer(slopeLayer);
//     }
//   });

//   document.getElementById('apply=filters').addEventListener('click', (evt) => {
//     applyFilters(filters, parcels);
//   });

//   return map;
// }


// function applyFilters(filters, parcels) {
//   const minAcres = parseFloat(document.getElementById('min-acres').value);
//   const maxAcres = parseFloat(document.getElementById('max-acres').value);
//   const slopeThreshold = parseFloat(document.getElementById('slope-threshold').value);
//   const minValue = parseFloat(document.getElementById('min-value').value);
//   const maxValue = parseFloat(document.getElementById('max-value').value);

//   const filteredParcels = parcels.filter((parcel) => {
//     const acres = parseFloat(parcel.acres);
//     const slope = parseFloat(parcel.slope);
//     const value = parseFloat(parcel.value);

//     return acres >= minAcres && acres <= maxAcres &&
//       slope <= slopeThreshold &&
//       value >= minValue && value <= maxValue;
//   });
//   updateMapParcels(filteredParcels, parcelsLayer);
// }


// function updateMapParcels(parcels, parcelsLayer) {
//   parcelsLayer.clearLayers();
//   console.log(`Adding ${parcels.length} parcels to the map.`);

//   const parcelIcon = L.icon({
//     iconUrl: 'images/parcel-marupdateMapParcelsker.png', // TODO: add parcel marker image
//     iconSize: [22, 31.5], // size of the icon
//     iconAnchor: [11, 31.5], // point of the icon which will correspond to marker's location
//     popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
//   });

//   for (const parcel of parcels) {
//     const marker = L.marker([parcel.lat, parcel.lon], {
//       // alt: parcel.name,
//       icon: parcelIcon,
//     });
//     // marker.bindTooltip(parcel.id);
//     // marker.bindPopup(`
//     //   <h2 class="parcel-id">${parcel.id}</h2>
//     //   <p class="parcel-coordinates">${parcel.coordinates}</p>
//     // `);
//     marker.parcelId = parcel.id;
//     marker.addTo(parcelsLayer);
//   }
// }



// function initializeMap(stationInfo, events) {
//   const map = L.map('map').setView([36.24, -81.80], 12);

//   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: 'mapbox/streets-v12',
//     accessToken: 'pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2wwb3BudmZ3MWdyMjNkbzM1c2NrMGQwbSJ9.2ATDPobUwpa7Ou5jsJOGYA',
//   }).addTo(map);

//   const stationsLayer = L.layerGroup();
//   stationsLayer.addTo(map);

//   updateMapStations(stationInfo.data.stations, stationsLayer);

//   events.addEventListener('filter-stations', (evt) => {
//     const filteredStations = evt.detail.filteredStations;
//     updateMapStations(filteredStations, stationsLayer);
//   });

//   events.addEventListener('geolocated', (evt) => {
//     // This listener will zoom to contain the three nearest stations to the
//     // user's current position.

//     const pos = evt.detail;
//     const lat = pos.coords.latitude;
//     const lon = pos.coords.longitude;

//     // Create a turf point from the user's position.
//     const userPoint = turf.point([lon, lat]);

//     // Create a comparison function for sorting stations by their distance from
//     // the users position.
//     function compareDists(stationA, stationB) {
//       const stationAPoint = turf.point([stationA.lon, stationA.lat]);
//       const distA = turf.distance(userPoint, stationAPoint);
//       const stationBPoint = turf.point([stationB.lon, stationB.lat]);
//       const distB = turf.distance(userPoint, stationBPoint);

//       return distA - distB;
//     }

//     // Make a copy of the stations array with the slice function, and sort it.
//     // We make a copy first here because the JS array sort function sorts the
//     // array in place, rather than returning a new array, and we want to keep
//     // the original stations array unchanged.
//     const sortedStations = stationInfo.data.stations.slice();
//     sortedStations.sort(compareDists);

//     // Get the three closest stations from the sorted array, and use the map
//     // function to create a multipoint containing the coordinates of those
//     // stations.

//     // ME - change it to 20 trees
//     const closestStations = sortedStations.slice(0, 3);
//     const closestPoints = turf.multiPoint(closestStations.map((station) => [station.lon, station.lat]));

//     // Get the bounding box around the closest points. Turf will return this in
//     // an array of [minX, minY, maxX, maxY], so we have to convert that to a
//     // form that Leaflet is happy with (a LatLngBounds) by flipping around the X
//     // and Y (longitude and latitude) components.
//     const bbox = turf.bbox(closestPoints);
//     const leafletBbox = L.latLngBounds([bbox[1], bbox[0]], [bbox[3], bbox[2]]);

//     // Finally, fit the map view to the stations.
//     map.fitBounds(leafletBbox);
//   });

//   events.addEventListener('focus-station', (evt) => {
//     const stationId = evt.detail.stationId;
//     stationsLayer.eachLayer((layer) => {
//       if (layer.stationId === stationId) {
//         layer.bindPopup('hello');
//         layer.openPopup();
//       }
//     });
//   });

//   return map;
// }

// function updateMapStations(stations, stationsLayer) {
//   stationsLayer.clearLayers();
//   console.log(`Adding ${stations.length} stations to the map.`);

//   const stationIcon = L.icon({
//     iconUrl: 'images/station-marker.png',
//     iconSize: [22, 31.5], // size of the icon
//     iconAnchor: [11, 31.5], // point of the icon which will correspond to marker's location
//     popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
//   });

//   for (const station of stations) {
//     const marker = L.marker([station.lat, station.lon], {
//       alt: station.name,
//       icon: stationIcon,
//     });
//     marker.bindTooltip(station.name);
//     marker.bindPopup(`
//       <h2 class="station-name">${station.name}</h2>
//       <p class="station-address">${station.address}</p>
//     `);
//     marker.stationId = station.station_id;
//     marker.addTo(stationsLayer);
//   }
// }

// export {
//   initializeMap,
// };
