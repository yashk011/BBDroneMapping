window.onload = init;

var map_1;
var map_2;
var osm;
var esri_terrain;
var digital_globe;


function init() {
	map_1();
	// map_2();

	// link();
}

function map_1(){
	base();


	map_1 = L.map('map-div-1', {
	    center: [21.74991 , 82.20874666666666],
	    zoom: 13,
	    layers: [osm]
	});



	// MAP SCALE
	L.control.scale().addTo(map_1);

	// MAP COORDINATE POSITION
	L.control.mousePosition({separator: ', '}).addTo(map_1);

	// MAP GEOCODER
	var searchControl = L.esri.Geocoding.geosearch().addTo(map_1);
	var results = L.layerGroup().addTo(map_1);
	searchControl.on('results', function(data){
		results.clearLayers();
		for (var i = data.results.length - 1; i >= 0; i--) {
		  results.addLayer(L.marker(data.results[i].latlng));
		}
	});

	// MAP MEASURE
	var measureControl = L.control.measure({
		primaryLengthUnit: 'meters',
		secondaryLengthUnit: 'kilometers',
		primaryAreaUnit: 'hectares',
		secondaryAreaUnit: undefined
	});
	measureControl.addTo(map_1);

	var drawnItems = new L.FeatureGroup();
	drawnItems.addTo(map_1);


	// LAYER TOGGLE

	var baseMaps = {
		"Open Street Map": osm,
		"Digital Globe": digital_globe,
		"ESRI Street": esri_street,
		"ESRI Satellite": esri_satellite,
		"ESRI Terrain": esri_terrain
	};
	var overlayMaps = {
		"Drawn Items": drawnItems
	};
	var ctlLayers = L.control.layers(baseMaps, overlayMaps).addTo(map_1);

	L.tileLayer('https://minocular-sonadih-map.s3.amazonaws.com/2019/03/25/tiles/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map_1);

	ctlZoomslider = L.control.zoomslider({position:'topright'}).addTo(map_1);

	var ctlDraw = new L.Control.Draw({
		draw:{
			circle:false,
			rectangle:false,
		},
		edit:{
			featureGroup:drawnItems
		}
	});
	ctlDraw.addTo(map_1);
  
	// map_1.on('draw:created', function(e){
	// 	drawnItems.addLayer(e.layer);
	// });
	

	map_1.on('draw:created', function(e){
		switch (e.layerType) {
			case 'marker':
				var llRef = e.layer.getLatLng();


				var strTable = "<form id='target'> <input type='text' value='Enter Text'> <input type='submit' value='set'> </form>";
				drawnItems.addLayer(e.layer.bindPopup(strTable, {maxWidth:400}));
				break;

				// var strTable = "<table class='table table-hover'>";
				// strTable += "<tr><th>Constraint</th><th>ID</th><th>Type</th><th>Distance</th><th>Direction</th></tr>";
				// var nrBUOWL = returnClosestlayer(lyrBUOWL, llRef);
				// strTable += "<tr><td>BUOWL</td><td>"+nrBUOWL.att.habitat_id+"</td><td>"+nrBUOWL.att.recentstatus+"</td><td>"+nrBUOWL.distance.toFixed(0)+" m</td><td>"+nrBUOWL.bearing.toFixed(0)+"</td></tr>";
				// var nrEagle = returnClosestlayer(lyrEagleNests, llRef);
				// strTable += "<tr><td>Eagle Nest</td><td>"+nrEagle.att.nest_id+"</td><td>"+nrEagle.att.status+"</td><td>"+nrEagle.distance.toFixed(0)+" m</td><td>"+nrEagle.bearing.toFixed(0)+"</td></tr>";
				// var nrRaptor = returnClosestlayer(lyrRaptorNests, llRef);
				// strTable += "<tr><td>Raptor Nest</td><td>"+nrRaptor.att.Nest_ID+"</td><td>"+nrRaptor.att.recentspecies+"<br>"+nrRaptor.att.recentstatus+"</td><td>"+nrRaptor.distance.toFixed(0)+" m</td><td>"+nrRaptor.bearing.toFixed(0)+"</td></tr>";
				// var nrGBH = returnClosestlayer(lyrGBH, llRef);
				// strTable += "<tr><td>GBH Rookery</td><td>N/A</td><td>N/A</td><td>"+(nrGBH.distance+250).toFixed(0)+" m</td><td>"+nrGBH.bearing.toFixed(0)+"</td></tr>";
				// strTable += "</table>";
				// fgpDrawnItems.addLayer(e.layer.bindPopup(strTable, {maxWidth:400}));
				// break;
			
		}
	});


	var marker = new L.marker([21.74991 , 82.20874666666666], { opacity: 0.01 });
    marker.bindLabel("My Label", {noHide: true, className: "my-label", offset: [0, 0] });
    marker.addTo(map_1);


         //  map_1.addLayer(drawnItems);

		// var drawControl = new L.Control.Draw({
		// 	draw:{
		// 		circle:false
		// 	},
		// 	edit:{
		// 		featureGroup:drawnItems
		// 	}
        // });
		// map_1.addControl(drawControl);
		
		// map_1.on('draw:created', function(e){
		// 	switch (e.layerType) {
		// 	  case 'marker':
		// 		  var llRef = e.layer.getLatLng();
				
		// 		  var strTable = "<form id='target'> <input type='text' value='Enter Text'> <input type='submit' value='set'> </form>";
		// 		   fgpDrawnItems.addLayer(e.layer.bindPopup(strTable, {maxWidth:400}));
		// 		   break;
		// 	}
		// });


}

function base() {

	// ESRI Street
    esri_street = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey and the GIS User Community',
        label: 'ESRI Street'
    });

	// ESRI Terrain
    esri_terrain = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey and the GIS User Community',
        label: 'ESRI Terrain'
    });

	// ESRI Imagery
    esri_satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey and the GIS User Community',
        label: 'ESRI Imagery'
    });
    // Digital Globe
    var api_key = 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpdm9ic3M2ODAwdDYydXBjYW85aHVzeTMifQ.Y2J4i_b6yGPmNkJAoUHDMg';
    digital_globe = L.tileLayer('https://{s}.tiles.mapbox.com/v4/digitalglobe.nal0mpda/{z}/{x}/{y}.png?access_token=' + api_key, {
        minZoom: 1,
        maxZoom: 19,
        attribution: '(c) <a href="http://microsites.digitalglobe.com/interactive/basemap_vivid/">DigitalGlobe</a> , (c) OpenStreetMap, (c) Mapbox',
        label: 'Digital Globe Imagery'
    });

    // OSM
    osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
        label: 'OpenStreetMap'
    });

}