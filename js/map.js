// Utility functions 
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

// Map intialization
function intializeMap(parcelInfo) {

  var map = L.map('map', {
  }).setView([36.216795, -81.6745517], 12);

  var baseLayers = {};
  var overlayLayers = {};
  L.control.layers(baseLayers, overlayLayers).addTo(map);

  return { map, baseLayers, overlayLayers };
}


function addBaseLayer(map, parcelInfo, layerType) {
  console.log('Adding ${layerType} parcel layers...');

  const filterFunction = layerType === 'Dvpt_Prob'
    ? function (feature) { return feature.properties['Dvpt_Prob'] !== null; }
    : function (feature) { return feature.properties['Dist_Road'] !== null; };

  const styleFunction = layerType === 'Dvpt_Prob'
    ? function (feature) {
      return {
        color: 'grey',
        fillColor: getDvptColor(feature.properties['Dvpt_Prob']),
        fillOpacity: 0.5,
        weight: 2,
        opacity: 0.1
      };
    }
    : function (feature) {
      return {
        color: 'grey',
        fillColor: getRoadColor(feature.properties['Dist_Road']),
        fillOpacity: 0.5,
        weight: 2,
        opacity: 0.1
      };
    };

  const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  const baseLayer = L.layerGroup([
    osmLayer,
    L.geoJson(parcelInfo, {
      filter: filterFunction,
      style: styleFunction
    })
  ]);

  return baseLayer;
}


function runMap(parcelInfo, events) {
  // const { map, baseLayers, overlayLayers } = intializeMap(parcelInfo);
  var result = intializeMap(parcelInfo);
  var map = result.map;
  var baseLayers = result.baseLayers;
  var overlayLayers = result.overlayLayers;

  var dvptProbLayer = addBaseLayer(map, parcelInfo, 'Dvpt_Prob');
  baseLayers['Development Probability'] = dvptProbLayer;

  var nearestRoadLayer = addBaseLayer(map, parcelInfo, 'Dist_Road');
  baseLayers['Distance to Road'] = nearestRoadLayer;

  map.addLayer(dvptProbLayer);

  var parcelModeRadios = document.querySelectorAll('input[name="parcel-mode"]');
  parcelModeRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      const selectedLayer = baseLayers[this.value === 'Dvpt_Prob' ? 'Development Probability' : 'Distance to Road'];
      map.eachLayer((layer) => {
        if (layer instanceof L.LayerGroup && layer !== selectedLayer) {
          map.removeLayer(layer);
        }
      });
      map.addLayer(selectedLayer);
    });
  });

  // TODO: Implement Filters


  // TODO: Implement Lists

  return map;
}

export {
  runMap,
};