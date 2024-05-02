/* =============== Gray out parcels (undevelopable or already developed) =============== */
// function shouldGrayOut(feature) {
//   return feature.properties.undevelopable === 1 || feature.properties.developed === 1;
// }

// Initialize map with OSM
export function initializeMap(parcelInfo, events) {
    const map = L.map('map', {preferCanvas: true}).setView([36.216795, -81.6745517], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        dragging: true,
        inertia: false,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    /* =============== Layers =============== */
    // Create parcel outline layer
  const parcelLayer = L.geoJSON(parcelInfo, {
    style: feature => ({
      weight: 1,
      color: 'black',
      fillOpacity: 0.5
    }),
    onEachFeature: addPopup
  });

  map.parcelLayer = parcelLayer; //attaches to map object

  // Create a choropleth map layer 1 for Development Probability
  const developmentProbabilityLayer = L.geoJSON(parcelInfo, {
  style: feature => ({
    fillColor: getDvptColor(feature.properties.Dvpt_Prob),
    weight: 1,
    color: '#CCCCCC',
    fillOpacity: 0.8
  }),
  onEachFeature: addPopup
  });

  map.developmentProbabilityLayer = developmentProbabilityLayer; //attaches to map object

  // Create a choropleth map layer 2 for Distance to Roads
  const distanceToRoadsLayer = L.geoJSON(parcelInfo, {
  style: feature => ({
    fillColor: getRoadColor(feature.properties.Dist_Road),
    weight: 1,
    color: '#CCCCCC',
    fillOpacity: 0.8
  }),
  onEachFeature: addPopup
  });

  map.distanceToRoadsLayer = distanceToRoadsLayer; //attaches to map object

  // Define the base layers
  const baseLayers = {
    'Parcel View': parcelLayer,
    'Development Probability': developmentProbabilityLayer,
    'Distance to Roads': distanceToRoadsLayer
  };
  
  // Set the default layer
  const defaultLayer = 'Parcel View';
  
  // Add the default layer to the map (Parcel View)
  map.addLayer(baseLayers[defaultLayer]);
  
  // Add a layer control to switch between choropleth maps and parcel view
  const layerControl = L.control.layers(baseLayers, {}, {
    collapsed: false
  }).addTo(map);
  
  // Choropleth color function for Development Probability
  function getDvptColor(d) {
    return d > 0.8 ? '#7a0177' :
      d > 0.4 ? '#c51b8a' :
        d > 0.2 ? '#f768a1' :
          d > 0.1 ? '#fa9fb5' :
            d > 0.05 ? '#fcc5c0' :
              '#feebe2';
  }
  
  // Choropleth color function for Distance to Roads
  function getRoadColor(d) {
    return d > 25040 ? '#bd0026' :
      d > 18780 ? '#f03b20' :
        d > 12520 ? '#fd8d3c' :
          d > 6260 ? '#fd8d3c' :
            '#ffffb2';
  }

    /* =============== Popup =============== */
    // Function to add popups to each parcel
    function addPopup(feature, layer) {
      // Store the original style options
        const originalStyle = layer.options.style(feature);

        layer.on('mouseover', e => {
            layer.setStyle({
                weight: 3,
                color: '#000000'
            });

            const popupContent = `
                <h3>Parcel Information</h3>
                <p>Parcel ID: ${feature.properties.PARCELID}</p>
                <p>Area (acres): ${feature.properties.area_acre}</p>
                <p>Slope Average (°): ${feature.properties.Slope_Ave}</p>
                <p>Slope Maximum (°): ${feature.properties.Slope_Max}</p>
                <p>Distance to Road (ft): ${feature.properties.Dist_Road}</p>
                <p>Development Probability: ${feature.properties.Dvpt_Prob}</p>
                <br>
                <p>Undevelopable (<35°): ${feature.properties.undevelopable === 1 ? 'Yes' : 'No'}</p>
                <p>Already Developed: ${feature.properties.developed === 1 ? 'Yes' : 'No'}</p>
            `;
            layer.bindPopup(popupContent).openPopup();
        });

        // layer.on('mouseout', e => {
        //   // Reset the layer style to its default state
        //   if (layer) {
        //     layer.setStyle(originalStyle)();  //I fixed the error but get console error msg: layer.setStyle(...) is not a function
        //     layer.closePopup();
        //   }
        //  });
        }

  return {
    map,
    parcelLayer,
    developmentProbabilityLayer,
    distanceToRoadsLayer
  };
}




  
  