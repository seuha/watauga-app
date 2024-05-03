const searchBox = document.querySelector('#parcel-id');

function initializeSearch(data, events) {
  
  //const searchButton = document.querySelector('#search-button');
  searchBox.addEventListener('input', (evt) => {
    handleSearchBoxInput(evt, data, events);
    console.log("clicked!")
  });
}

function handleSearchBoxInput(evt, parcelinfo, events) {
  updateFilteredStations(data, events);
}

function updateFilteredStations(data, events) {
 const lowercaseValue = searchBox.value.toLowerCase();

 const filteredParcels = [];
 for (const parcel of data.data.parcels) {
   if (parcel.name.toLowerCase().includes(lowercaseValue)) {
     filteredParcels.push(parcel);
   }
 }
}

  // const filteredStations = data.data.stations
  //     .filter((station) => station.name.toLowerCase().includes(lowercaseValue));

//  const newEvent = new CustomEvent('filter-stations', { detail: { filteredStations }});
//  events.dispatchEvent(newEvent);
//}

export {
 initializeSearch
}



// function initializeSearch(stationInfo, events) {
//   const searchBox = document.querySelector('#station-name-filter');
//   searchBox.addEventListener('input', (evt) => {
//     handleSearchBoxInput(evt, stationInfo, events);
//   });
// }

// function handleSearchBoxInput(evt, stationInfo, events) {
//   updateFilteredStations(stationInfo, events);
// }

// function updateFilteredStations(stationInfo, events) {
//   const searchBox = document.querySelector('#station-name-filter');
//   const lowercaseValue = searchBox.value.toLowerCase();

//   const filteredStations = [];
//   for (const station of stationInfo.data.stations) {
//     if (station.name.toLowerCase().includes(lowercaseValue)) {
//       filteredStations.push(station);
//     }
//   }

//   // const filteredStations = stationInfo.data.stations
//   //     .filter((station) => station.name.toLowerCase().includes(lowercaseValue));

//   const newEvent = new CustomEvent('filter-stations', { detail: { filteredStations }});
//   events.dispatchEvent(newEvent);
// }

// export {
//   initializeSearch,
// };
