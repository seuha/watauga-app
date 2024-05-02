import { parcelInfo } from './main2.js';
import { initializeMap } from './map2.js';
import { generateTopParcels } from './list.js';


/* =============== Filters =============== */
export function filterParcels(parcelLayer, developmentProbabilityLayer, distanceToRoadsLayer) {
    // const sizeFilters = Array.from(document.querySelectorAll('input[type="checkbox"][id^="0-"]')).filter(checkbox => checkbox.checked).map(checkbox => checkbox.id.split('-')[0]);
    const minAcres = document.getElementById('min-acres').value;
    const maxAcres = document.getElementById('max-acres').value;
    const slopeThreshold = document.getElementById('slope-threshold').value;
    // const valueFilters = Array.from(document.querySelectorAll('input[type="checkbox"][id^="0-10"]')).filter(checkbox => checkbox.checked).map(checkbox => checkbox.id.split('-')[1]);
    const minValue = document.getElementById('min-value').value;
    const maxValue = document.getElementById('max-value').value;
  
    const filteredFeatures = parcelInfo.features.forEach(feature => {
      const areaAcres = feature.properties.area_acre;
      const slope = feature.properties.Slope_Ave;
      const parcelValue = feature.properties.property_value;
  
      // const sizeMatch = sizeFilters.length === 0 || sizeFilters.some(filter => {
      //   const [min, max] = filter.split('-');
      //   return areaAcres >= parseFloat(min) && areaAcres < parseFloat(max);
      // });
  
      const areaMatch = (minAcres === '' || areaAcres >= parseFloat(minAcres)) && (maxAcres === '' || areaAcres <= parseFloat(maxAcres));
      const slopeMatch = slopeThreshold === '' || slope <= parseFloat(slopeThreshold);
      // const valueMatch = valueFilters.length === 0 || valueFilters.some(filter => {
      //   const [min, max] = filter.split('-');
      //   return parcelValue >= parseFloat(min) && (max === '&-over' ? true : parcelValue < parseFloat(max));
      // });
  
      const minMaxValueMatch = (minValue === '' || parcelValue >= parseFloat(minValue)) && (maxValue === '' || parcelValue <= parseFloat(maxValue));
  
      feature.properties.good = /*sizeMatch && */areaMatch && slopeMatch && /*valueMatch && */minMaxValueMatch;
    });

    // Update the parcel layers based on the filtered features

    console.log('Updating parcel layers...');
    // parcelLayer.clearLayers();
    // parcelLayer.addData(filteredFeatures);
    parcelLayer.setStyle(feature => {
      if (feature.properties.good) {
        return {
          weight: 1,
          color: 'black',
          fillOpacity: 0.5
        };
      } else {
        return {
          weight: 1,
          color: 'black',
          fillColor: 'gray',
          fillOpacity: 0.5
        };
      }
    });
  
    console.log('Updating development probability layers...');
    // developmentProbabilityLayer.clearLayers();
    // developmentProbabilityLayer.addData(filteredFeatures);
    developmentProbabilityLayer.setStyle(feature => {
      if (feature.properties.good) {
        return { //can i say retain original style?
          fillColor: getDvptColor(feature.properties.Dvpt_Prob),
          weight: 1,
          color: '#CCCCCC',
          fillOpacity: 0.8
        };
      } else {
        return {
          weight: 1,
          color: 'gray',
          fillColor: 'gray',
          fillOpacity: 0.8
        };
      }
    });
  
    console.log('Updating distance to roads layers...');
    // distanceToRoadsLayer.clearLayers();
    // distanceToRoadsLayer.addData(filteredFeatures);
    distanceToRoadsLayer.setStyle(feature => {
      if (feature.properties.good) {
        return { //can i say retain original style?
          fillColor: getRoadColor(feature.properties.Dist_Road),
          weight: 1,
          color: '#CCCCCC',
          fillOpacity: 0.8
        };
      } else {
        return {
          weight: 1,
          color: 'gray',
          fillColor: 'gray',
          fillOpacity: 0.8
        };
      }
    });

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
  
  generateTopParcels(parcelInfo.features.filter(feature => feature.properties.good), map, parcelLayer);
  }



// /* =============== Remove Filters =============== */
// Remove size filter function
export function removeSizeFilter(map) {
  // Clear min and max acres inputs
  document.getElementById('min-acres').value = '';
  document.getElementById('max-acres').value = '';

  // Update parcel layers
  filterParcels(map.parcelLayer, map.developmentProbabilityLayer, map.distanceToRoadsLayer);
}

// Remove slope filter function
export function removeSlopeFilter(map) {
  // Clear slope threshold input
  document.getElementById('slope-threshold').value = '';

  // Update parcel layers
  filterParcels(map.parcelLayer, map.developmentProbabilityLayer, map.distanceToRoadsLayer);
}

// Remove property value filter function
export function removeValueFilter(map) {
  // Clear min and max value inputs
  document.getElementById('min-value').value = '';
  document.getElementById('max-value').value = '';

  // Update parcel layers
  filterParcels(map.parcelLayer, map.developmentProbabilityLayer, map.distanceToRoadsLayer);
}