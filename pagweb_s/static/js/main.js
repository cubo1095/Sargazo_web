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
        target: document.getElementById('mouse-position'),
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

    //Layer Sargazo
    var wmsSourcesargazo = new ol.source.TileWMS({
        visible: true,
        url: 'http://132.247.103.145:8080/geoserver//wms',
        params: {'LAYERS':'	sargazo:sargazo','TILED': true},
        serverType: 'geoserver'
        });

    var wmsLayersargazo = new  ol.layer.Tile({
        source: wmsSourcesargazo,
        zIndex: 1
    });
    map.addLayer(wmsLayersargazo);
    // sargazo();

    //Layer Sargazo distancia
    var wmsSourcesargazod = new ol.source.TileWMS({
        visible: true,
        url: 'http://132.247.103.145:8080/geoserver//wms',
        params: {'LAYERS':'	sargazo:sargazo_distancia','TILED': true},
        serverType: 'geoserver'
        });

    var wmsLayersargazod = new  ol.layer.Tile({
        source: wmsSourcesargazod,
        zIndex: 1
    });
    map.addLayer(wmsLayersargazod);
    
    //Layer Zona de estudio
    var wmsSourcezona = new ol.source.TileWMS({
        visible: true,
        url: 'http://132.247.103.145:8080/geoserver//wms',
        params: {'LAYERS':'	sargazo:region_sargazo1','TILED': true},
        serverType: 'geoserver'
        });

    var wmsLayerzona = new  ol.layer.Tile({
        source: wmsSourcezona,
        zIndex: 1
    });
    map.addLayer(wmsLayerzona);            
    
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
        var imgman = "static/img/Simbo/manglares.png";//jfkaljsdkfad
        if($(this).is(':checked')){
            map.addLayer(wmsLayerman);
            $('#imagen').append('<img src="'+imgman+'" class="imgmang"/>');
        } else {
            map.removeLayer(wmsLayerman);
            $('img').remove('.imgmang');
        }
    });

    //Layer Insular
    var wmsSourceinsu = new ol.source.TileWMS({
        visible: true,
        url: 'http://132.247.103.145:8080/geoserver/sargazo/wms',
        params: {'LAYERS':'sargazo:Insultar_QROO','TILED': true},
        serverType: 'geoserver',
        });

    var wmsLayerinsu = new  ol.layer.Tile({
        source: wmsSourceinsu,
        zIndex: 1,
        transparent: 'true'
    });

    $('#insu').click(function(){
        var imganp = "static/img/Simbo/ANP.png";//jfkaljsdkfad
        if($(this).is(':checked')){
            map.addLayer(wmsLayerinsu);
            $('#imagen').append('<img src="'+imganp+'" class="imganp"/>');
        } else {
            map.removeLayer(wmsLayerinsu);
            $('img').remove('.imganp');
        }
    });

    //Marcador UNAM
    var iconmarcadores=[];

    var iconmarcador = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([-86.86801635451168, 20.86977283252566], 'EPSG:4326',     
    'EPSG:3857')),
    name: 'UNAM',
    population: 4000,
    rainfall: 500
    });

    iconmarcadores.push(iconmarcador);
    
    var vecSource = new ol.source.Vector({
    features: iconmarcadores //add an array of features
    });

    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [20, 20],
            anchorXUnits: 'pixels',
            anchorYUnits: 'pixels',
            opacity: 0.7,
            zIndex: 0.8,
            src: 'static/img/UNAM1.png'
        }))
    });


    var vecLayer = new ol.layer.Vector({
    source: vecSource,
    style: iconStyle
    });
    
    map.addLayer(vecLayer);
    //Imagen  Sentinel TC
    var wmsSourceSentinel = new ol.source.TileWMS({
        visible: true,
        url: 'http://132.247.103.145:8080/geoserver/LANOT/wms',
        params: {'LAYERS': 'LANOT:S2_MSI_TC_20210531T160901','TILED': true},
        serverType: 'geoserver',
        });

    var wmsLayerSentinel = new  ol.layer.Tile({
        source: wmsSourceSentinel,
        zIndex: 0.8
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

    
    //Agregamos objetos al mapa	
    map.addControl(scaleline);//Agregamos barra de esacala
    map.addControl(geocoder);//Agregamos geocoder
    map.addControl(mousePositionControl);
    //map.addControl(ol.control.defaults({attribution: false}).extend([mousePositionControl]));
        
}