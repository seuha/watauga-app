import geopandas as gpd
import json 

zillow = gpd.read_file('./data/prediction_0422.geojson')
# zillow.to_crs(epsg=4326, inplace=True)
# zillow.to_file('./data/prediction_0422_var.geojson', driver='GeoJSON')

dist_road_values = zillow["Dist_Road"].tolist()
# Find the maximum Dist_Road value
max_dist_road = max(dist_road_values)

dvpt_values = zillow["Dvpt_Prob"].tolist()
max_dvpt = max(dvpt_values)

print(f"Maximum Dist_Road value: {max_dist_road}")
print(f"Maximum dvpt value: {max_dvpt}")