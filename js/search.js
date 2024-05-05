let searchBox;

function initializeSearch(parcelInfo, events, map, parcelLayer, developmentProbabilityLayer, distanceToRoadsLayer) {
  searchBox = document.querySelector('#parcel-id');
  const searchButton = document.querySelector('#search-button');
  searchButton.addEventListener('click', () => {
    handleSearchButton(parcelInfo, map, parcelLayer, developmentProbabilityLayer, distanceToRoadsLayer);
  });
  searchBox.addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter') {
      handleSearchButton(parcelInfo, map, parcelLayer, developmentProbabilityLayer, distanceToRoadsLayer);
    }
  });
}

function handleSearchButton(parcelInfo, map, parcelLayer, developmentProbabilityLayer, distanceToRoadsLayer) {
  const searchValue = searchBox.value.toLowerCase();
  const matchingParcels = parcelInfo.features.filter((parcel) => 
    parcel.properties && parcel.properties.PARCELID && parcel.properties.PARCELID.toLowerCase() === searchValue
  );
  if (matchingParcels.length > 0) {
    zoomToParcel(matchingParcels, map);
    highlightParcel(matchingParcels[0], parcelLayer, developmentProbabilityLayer, distanceToRoadsLayer);
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

function highlightParcel(parcel, parcelLayer, developmentProbabilityLayer, distanceToRoadsLayer) {
  const layers = [parcelLayer, developmentProbabilityLayer, distanceToRoadsLayer];
  layers.forEach(layer => {
    if (layer) {
      layer.eachLayer(feature => {
        if (feature.feature.properties.PARCELID === parcel.properties.PARCELID) {
          feature.setStyle({ weight: 5, color: '#ff0000' });
        } else {
          feature.setStyle(layer.options.style(feature.feature));
        }
      });
    }
  });
}

export { initializeSearch };






// let searchBox;

// function initializeSearch(parcelInfo, events, map) {
//   searchBox = document.querySelector('#parcel-id');
//   const searchButton = document.querySelector('#search-button');

//   searchButton.addEventListener('click', () => {
//     handleSearchButton(parcelInfo, map);
//   });

//   searchBox.addEventListener('keypress', (evt) => {
//     if (evt.key === 'Enter') {
//       handleSearchButton(parcelInfo, map);
//     }
//   });
// }

// function handleSearchButton(parcelInfo, map) {
//   const searchValue = searchBox.value.toLowerCase();
//   const matchingParcels = parcelInfo.features.filter((parcel) =>
//     parcel.properties && parcel.properties.PARCELID && parcel.properties.PARCELID.toLowerCase() === searchValue
//   );

//   if (matchingParcels.length > 0) {
//     zoomToParcel(matchingParcels, map);
//     highlightParcel(matchingParcels, map);
//   }
// }

// function zoomToParcel(parcels, map) {
//   const bounds = L.latLngBounds();

//   parcels.forEach((parcel) => {
//     const coordinates = parcel.geometry.coordinates[0][0];
//     coordinates.forEach((coord) => {
//       bounds.extend(L.latLng(coord[1], coord[0]));
//     });
//   });

//   map.fitBounds(bounds, { padding: [20, 20] });
// }

// function highlightParcel(parcels, map) {
//   parcelLayer.setStyle(f => {
//     if (f.properties.PARCELID === feature.properties.PARCELID) {
//       return { weight: 5, color: '#ff0000' };
//     } else {
//       return parcelLayer.options.style(f);
//     }
// });
// }

// export { initializeSearch };






