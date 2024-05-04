// search.js
let searchBox;

function initializeSearch(parcelInfo, events, map) {
  searchBox = document.querySelector('#parcel-id');
  const searchButton = document.querySelector('#search-button');

  searchButton.addEventListener('click', () => {
    handleSearchButton(parcelInfo, map);
  });

  searchBox.addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter') {
      handleSearchButton(parcelInfo, map);
    }
  });
}

function handleSearchButton(parcelInfo, map) {
  const searchValue = searchBox.value.toLowerCase();
  const matchingParcels = parcelInfo.features.filter((parcel) =>
    parcel.properties && parcel.properties.PARCELID && parcel.properties.PARCELID.toLowerCase() === searchValue
  );

  if (matchingParcels.length > 0) {
    zoomToParcel(matchingParcels, map);
    highlightParcel(matchingParcels, map);
  }
}

function zoomToParcel(parcels, map) {
  const bounds = L.latLngBounds();

  parcels.forEach((parcel) => {
    const coordinates = parcel.geometry.coordinates[0][0];
    coordinates.forEach((coord) => {
      bounds.extend(L.latLng(coord[1], coord[0]));
    });
  });

  map.fitBounds(bounds, { padding: [20, 20] });
}

function highlightParcel(parcels, map) {
  // Implement the highlighting functionality here
}

export { initializeSearch };








// const searchBox = document.querySelector('#parcel-id');

// function initializeSearch(parcelInfo, events) {
  
//   //const searchButton = document.querySelector('#search-button');
//   searchBox.addEventListener('input', (evt) => {
//     handleSearchBoxInput(evt, parcelInfo, events);
//     console.log("clicked!")
//   });
// }

// function handleSearchBoxInput(evt, parcelinfo, events) {
//   updateFilteredStations(parcelInfo, events);
// }

// function updateFilteredStations(parcelInfo, events) {
//  const lowercaseValue = searchBox.value.toLowerCase();

//  const filteredParcels = [];
//  for (const parcel of parcelInfo.data.parcels) {
//    if (parcel.name.toLowerCase().includes(lowercaseValue)) {
//      filteredParcels.push(parcel);
//    }
//  }
// }

//   // const filteredStations = data.data.stations
//   //     .filter((station) => station.name.toLowerCase().includes(lowercaseValue));

// //  const newEvent = new CustomEvent('filter-stations', { detail: { filteredStations }});
// //  events.dispatchEvent(newEvent);
// //}

// export {
//  initializeSearch
// }
