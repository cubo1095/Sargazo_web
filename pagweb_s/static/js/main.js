$(document).ready(main);
function main(){

                //variables fechas
                var fecha_1 = '0000-00-00';
                var fecha_2 = '0000-00-00';
                
                //Agregamos variables de los horarios de las ultimas imagenes
                var fecha = '{{ fechabi }}';
                var hora = '{{ horabi }}';
                function fechabi(){ 
                    swal("La fecha de la imagen es: "+fecha+ "y la hora: "+hora);
                }
                                                  
				//Creamos objeto mapa		
				var map = new ol.Map({//Abrimos mapa
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.TileImage({
                            visible: true,
                            url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
                            }),
                            type: 'base',
                            visible: true,
                            zIndex: 0 
                        }),
                    ],
                    target: 'map',//target map
				    view: new ol.View({//Creamos vista del mapa
                        center: ol.proj.transform([-86, 20], 'EPSG:4326', 'EPSG:3857'),//Cambiamos proyección a WGS84
                        zoom: 7
                	})//Cerramos view
                });//Cerramos mapa
		
				//Creamos Barra de Escala
				var scaleline = new ol.control.ScaleLine();
										
				
				//Creamos objeto posición del mouse	
				var mousePositionControl = new ol.control.MousePosition({
					className: 'custom-mouse-position',
					projection: 'EPSG:4326',
					target: document.getElementById('location'),
					coordinateFormat: ol.coordinate.createStringXY(5),
					undefinedHTML: '&nbsp;'
				});//Cerramos objeto posición del mouse						
                      

                

                //Layer Estados de la república 
                var wmsSourceestados = new ol.source.TileWMS({
                    visible: true,
                    url: 'http://132.247.103.145:8080/geoserver/DGRU_LANOT/wms',
                    params: {'LAYERS':'DGRU_LANOT:coastline_mexicoMerc','TILED': true},
                    serverType: 'geoserver',
                    });

                var wmsLayerestados = new  ol.layer.Tile({
                    source: wmsSourceestados,
                    zIndex: 1
                });
                map.addLayer(wmsLayerestados);
                $('#estados').click(function(){
                    var imgest =  "static/img/Simbo/estados.png";
                    if($(this).is(':checked')){
                        map.addLayer(wmsLayerestados);
                        $('#imagen').append('<img src="'+imgest+'" class="imgest"/>');
                    } else {
                        map.removeLayer(wmsLayerestados);
                        $('img').remove('.imgest');
                    }
                });

                //Layer Sargazo 26
                var wmsSourcesargazo_26 = new ol.source.TileWMS({
                    visible: true,
                    url: 'http://132.247.103.145:8080/geoserver//wms',
                    params: {'LAYERS':'sargazo:sargazo_26','TILED': true},
                    serverType: 'geoserver',
                    });

                var wmsLayersargazo_26 = new  ol.layer.Tile({
                    source: wmsSourcesargazo_26,
                    zIndex: 1
                });
                map.addLayer(wmsLayersargazo_26);
                

                //Layer Sargazo 31
                var wmsSourcesargazo_31 = new ol.source.TileWMS({
                    visible: true,
                    url: 'http://132.247.103.145:8080/geoserver//wms',
                    params: {'LAYERS':'sargazo:sargazo_31','TILED': true},
                    serverType: 'geoserver',
                    });

                var wmsLayersargazo_31 = new  ol.layer.Tile({
                    source: wmsSourcesargazo_31,
                    zIndex: 1
                });
                map.addLayer(wmsLayersargazo_31);
               

                //Layer Sargazo 05
                var wmsSourcesargazo_05 = new ol.source.TileWMS({
                    visible: true,
                    url: 'http://132.247.103.145:8080/geoserver//wms',
                    params: {'LAYERS':'sargazo:sargazo_05','TILED': true},
                    serverType: 'geoserver',
                    });

                var wmsLayersargazo_05 = new  ol.layer.Tile({
                    source: wmsSourcesargazo_05,
                    zIndex: 1
                });
                map.addLayer(wmsLayersargazo_05);
                


                //Layer Áreas Naturales Protegidas
                var wmsSourceANP = new ol.source.TileWMS({
                    visible: true,
                    url: 'http://132.247.103.145:8080/geoserver/fires/wms',
                    params: {'LAYERS':'fires:ANP2020','TILED': true},
                    serverType: 'geoserver',
                    });

                var wmsLayerANP = new  ol.layer.Tile({
                    source: wmsSourceANP,
                    zIndex: 1,
                    transparent: 'true'
                });

                $('#anp').click(function(){
                    var imganp = "static/img/Simbo/ANP.png";
                    if($(this).is(':checked')){
                        map.addLayer(wmsLayerANP);
                        $('#imagen').append('<img src="'+imganp+'" class="imganp"/>');
                    } else {
                        map.removeLayer(wmsLayerANP);
                        $('img').remove('.imganp');
                    }
                });
                
                //Layer Humedales
                var wmsSourcehumedales = new ol.source.TileWMS({
                    visible: true,
                    url: 'http://132.247.103.145:8080/geoserver/sargazo/wms',
                    params: {'LAYERS':'	sargazo:HumedalesQROO','TILED': true},
                    serverType: 'geoserver',
                    });

                var wmsLayerhumedales = new  ol.layer.Tile({
                    source: wmsSourcehumedales,
                    zIndex: 1,
                    transparent: 'true'
                });

                $('#hum').click(function(){
                    var imganp = "static/img/Simbo/ANP.png";//jfkaljsdkfad
                    if($(this).is(':checked')){
                        map.addLayer(wmsLayerhumedales);
                        $('#imagen').append('<img src="'+imganp+'" class="imganp"/>');
                    } else {
                        map.removeLayer(wmsLayerhumedales);
                        $('img').remove('.imganp');
                    }
                });

                //Layer Manglares
                var wmsSourceman = new ol.source.TileWMS({
                    visible: true,
                    url: 'http://132.247.103.145:8080/geoserver/sargazo/wms',
                    params: {'LAYERS':'sargazo:ManglarQROO','TILED': true},
                    serverType: 'geoserver',
                    });

                var wmsLayerman = new  ol.layer.Tile({
                    source: wmsSourceman,
                    zIndex: 1,
                    transparent: 'true'
                });

                $('#man').click(function(){
                    var imganp = "static/img/Simbo/ANP.png";//jfkaljsdkfad
                    if($(this).is(':checked')){
                        map.addLayer(wmsLayerman);
                        $('#imagen').append('<img src="'+imganp+'" class="imganp"/>');
                    } else {
                        map.removeLayer(wmsLayerman);
                        $('img').remove('.imganp');
                    }
                });
                //Imagen  Sentinel TC
                var wmsSourceSentinel = new ol.source.TileWMS({
                    visible: true,
                    url: 'http://132.247.103.145:8080/geoserver/LANOT/wms',
                    params: {'LAYERS': 'LANOT:S2_MSI_TC_20210531T160901','TILED': true},
                    serverType: 'geoserver',
                    });

                var wmsLayerSentinel = new  ol.layer.Tile({
                    source: wmsSourceSentinel,
                });
                imgsentineltc = "static/img/Simbo/SentinelTC.png";
                $('#sentineltc').click(function(){
                    heightsimbo(); //Se encuentra en el script slideimg.js y ajusta la altura de la caja de simbología
                    if($(this).is(':checked')){
                        map.addLayer(wmsLayerSentinel)
                        $('#imagen').append('<img src="'+imgsentineltc+'" class="imgsentineltruec"/>');
                    } else {
                        map.removeLayer(wmsLayerSentinel)
                        $('img').remove('.imgsentineltruec');
                    }
                });

                //MB Satelital
                var wmsSourcesatel = new ol.source.TileImage({
                    visible: true,
                    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
                    });

                var wmsLayersatel = new  ol.layer.Tile({
                    source: wmsSourcesatel,
                    type: 'base',
                    visible: true,
                    zIndex: 0
                });

                $('#satelital').click(function(){
                    map.addLayer(wmsLayersatel)
                    $(this).css('border-color','#ffffff')
                    map.removeLayer(wmsLayerOSM)
                    map.removeLayer(wmsLayerdark)
                });
                

                //MB OSM
                var wmsSourceOSM = new ol.source.TileImage({
                    visible: true,
                    url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    });

                var wmsLayerOSM = new  ol.layer.Tile({
                    source: wmsSourceOSM,
                    type: 'base',
                    visible: true,
                    zIndex: 0
                });

                $('#osm').click(function(){
                    map.addLayer(wmsLayerOSM)
                    $(this).css('border-color','#ffffff')
                    map.removeLayer(wmsLayersatel)
                    map.removeLayer(wmsLayerdark)
                });

                //MB oscuro
                var wmsSourcedark = new ol.source.TileImage({
                    visible: true,
                    url: 'http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
                    });

                var wmsLayerdark = new  ol.layer.Tile({
                    source: wmsSourcedark,
                    type: 'base',
                    visible: true,
                    zIndex: 0
                });

                $('#oscuro').click(function(){
                    map.addLayer(wmsLayerdark)
                    $(this).css('border-color','#ffffff')
                    map.removeLayer(wmsLayersatel)
                    map.removeLayer(wmsLayerOSM)
                });

                //Geocoder
                const geocoder = new Geocoder('nominatim', {
                provider: 'osm',
                targetType: 'text-input',
                lang: 'en',
                placeholder: 'Busca un lugar...',
                limit: 5,
                keepOpen: false,
                });

                geocoder.on('addresschosen', function(evt){
                var feature = evt.feature,
                    coord = evt.coordinate,
                    address = evt.address;
                // some popup solution
                content.innerHTML = '<p>'+ address.formatted +'</p>';
                overlay.setPosition(coord);
                });

                map.addControl(geocoder);

				//Agregamos objetos al mapa	
                map.addControl(scaleline);//Agregamos barra de esacala
                //map.addControl(ol.control.defaults({attribution: false}).extend([mousePositionControl]));
                //map.addInteraction(select);//Agregamos interacción con el select
                //map.addOverlay(popup)//Agregamos variable popup

};         
			