<<<<<<< Updated upstream
function initializeList(stationInfo, events) {
  updateStationList(stationInfo.data.stations, events);

  events.addEventListener('filter-stations', (evt) => {
    const filteredStations = evt.detail.filteredStations;
    updateStationList(filteredStations, events);
  });
}

function updateStationList(stations, events) {
  const stationList = document.querySelector('#station-list');
  let html = '';

  for (const station of stations) {
    html += `
      <li data-station-id=${station.station_id}>${station.name}</li>
    `;
  }
  stationList.innerHTML = html;

  for (const li of stationList.querySelectorAll('li')) {
    li.addEventListener('mouseover', (evt) => {
      const stationId = evt.target.dataset.stationId;
      const newEvent = new CustomEvent('focus-station', {
        detail: { stationId },
      });
      events.dispatchEvent(newEvent);
    });
  }
}

export {
  initializeList,
};
=======
/* =============== List of Top Parcels =============== */
// Function to generate a list of top 10 parcels based on Development Probability
export function generateTopParcels(features, map, parcelLayer) {
  const sortedFeatures = features.sort((a, b) => b.properties.Dvpt_Prob - a.properties.Dvpt_Prob);
  const topParcels = sortedFeatures.slice(0, 10);
  const resultsList = document.createElement('ol');

  topParcels.forEach(feature => {
    const listItem = document.createElement('li');
    const parcelLink = document.createElement('a');
    parcelLink.href = '#';
    parcelLink.innerHTML = `<span>${feature.properties.PARCELID}</span> - <strong>${feature.properties.Dvpt_Prob.toFixed(1)}</strong>`;
    parcelLink.addEventListener('click', (event) => {
      event.preventDefault();
      const bounds = L.geoJSON(feature).getBounds();
      map.fitBounds(bounds, { maxZoom: 18, padding: [50, 50] });
      parcelLayer.setStyle(f => {
        if (f.properties.PARCELID === feature.properties.PARCELID) {
          return { weight: 5, color: '#ff0000' };
        } else {
          return parcelLayer.options.style(f);
        }
      });
    });
    listItem.appendChild(parcelLink);
    resultsList.appendChild(listItem);
  });

  const resultsContainer = document.getElementById('resultsList');
  resultsContainer.innerHTML = '';
  resultsContainer.appendChild(resultsList);

  // Add event listener to map to handle parcel deselection
  map.on('click', () => {
    parcelLayer.setStyle(parcelLayer.options.style);
  });
}
>>>>>>> Stashed changes
