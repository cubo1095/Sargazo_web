$(document).ready(searchsargazo);
$(document).ready(boxselection);
$(document).ready(medir);

//--------------------------------------------------------------------------------------------------------------
    //función para busqueda de sargazo
    function searchsargazo(){
        //Función para buscar fecha y mostrar en mapa
        $('.botton-Buscar').click(function(){
                                
            fecha_1 = $("#date3").val();
            fecha_2 = $("#date4").val();
            
            switch (true){
                case fecha_1 == '' && fecha_2 == '':
                swal('Por favor selecciona una fecha de inicio y de termino para realizar tu consulta');
                break;

                case fecha_1 == '':
                swal('Faltó ingresar la fecha inicial de su consulta.');
                break;

                case fecha_2 == '':
                swal('Faltó ingresar la fecha de termino de su consulta.');
                break;

                case fecha_2 < fecha_1:
                swal('Su fecha de termino es menor que la de inicio.');
                break;

                default:
                swal('Tu consulta comprende de: '+fecha_1+' a '+fecha_2);
                
                               
                cql_filter = "fechadia between '"+fecha_1+"' and '"+fecha_2+"'";
                
                wmsLayersargazo.getSource().updateParams({'LAYERS': 'sargazo:sargazo', 'CQL_FILTER': cql_filter});

                conta =1;
                //////////////////////////////////////////////
                if($('#pconsulta').html()==''){
                    $('#pconsulta').html('<input type="checkbox" id="pconsul" value="1" checked=""/>'+
                    '<label for="check1"> Puntos Consulta</label><br>');
                    imgcon = "static/img/Simbo/PuntosConsulta.png";
                    
                    $('#imagen').append('<img src="'+imgcon+'" class="imgcon"/>');
                }
                
               
                    
                
                $('#pconsul').click(function(){
                    imgcon = "static/img/Simbo/PuntosConsulta.png";    
                    if($(this).is(':checked')){
                        $('#imagen').append('<img src="'+imgcon+'" class="imgcon"/>');
                        map.addLayer(puntosconlayer);
                    }else{
                        $('img').remove(".imgcon");
                        map.removeLayer(puntosconlayer);
                    }
                });
                
                document.getElementById("body-grapper").style.display = "none";
  
            //Función de descarga botton-Json    
            $('.botton-Json').click(function(){
            if (fecha_1 == '' && fecha_2 == ''){
                swal('Por favor selecciona una fecha de inicio y de termino para realizar tu descarga.');
            } else if(fecha_1 == '' || fecha_2 == ''){
                swal('Revisa por favor las fechas de tu consulta, para realizar la descarga.')    
            } else{
                url=('http://132.247.103.145:8080/geoserver/fires/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fires:puntos_d&viewparams=f:'+fecha_1+ ';f1:'+fecha_2+ '&outputFormat=application/json')
                swal("Usted descargará el archivo en formato GeoJson.");
                return  window.location = url
            }
            });

            //Función de descarga CSV    
            $('.botton-CSV').click(function(){
            if (fecha_1 == '' && fecha_2 == ''){
                swal('Por favor selecciona una fecha de inicio y de termino para realizar tu descarga.');
            } else if(fecha_1 == '' || fecha_2 == ''){
                swal('Revisa por favor las fechas de tu consulta, para realizar la descarga.')    
            } else{
                url=('http://132.247.103.145:8080/geoserver/fires/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fires:puntos_d&viewparams=f:'+fecha_1+ ';f1:'+fecha_2+ '&outputFormat=CSV')
                swal("Usted descargará el archivo en formato Archivo delimitado por comas (CSV).");
                return  window.location = url
            }
            });

            //Función de descarga SHP    
            $('.botton-Shape').click(function(){
            if (fecha_1 == '' && fecha_2 == ''){
                swal('Por favor selecciona una fecha de inicio y de termino para realizar tu descarga.');
            } else if(fecha_1 == '' || fecha_2 == ''){
                swal('Revisa por favor las fechas de tu consulta, para realizar la descarga.')    
            } else{
                url=('http://132.247.103.145:8080/geoserver/fires/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fires:puntos_d&viewparams=f:'+fecha_1+ ';f1:'+fecha_2+ '&outputFormat=shape-zip')
                swal("Usted descargará el archivo en formato Shapefile comprimido en .ZIP .");
                return  window.location = url
            }
            });                     

            }
            
            
            return ;
            
        });


        //Función busqueda por área
        $('#ejecutar').click(function(){
            signo = $('#mayormenor').val();
            area = $('#area').val();
            cql_filter = "fecha between '"+fecha_1+"' and '"+fecha_2+"' and area_km2"+signo+""+area;
            swal('Su consulta corresponde a las fechas: '+fecha_1+' y '+fecha_2+'. Área'+signo+''+area+' metros cuadrados.');       
            wmsLayersargazo.getSource().updateParams({'LAYERS': 'sargazo:sargazo', 'CQL_FILTER': cql_filter});
        })
               
    }



    //--------------------------------------------------------------------------------------------------------------

    function boxselection(){
        //Función de rectángulo
        
        $('#fch2').click(function(){
            if($(this).is(':checked')){
                //Poligono
                
                boxControl =new ol.interaction.DragBox({ 
                    condition: ol.events.condition.always
                    // type: 'Polygon'
                    
                }); 
                
                // const modify = new ol.interaction.Modify({source: source});
                // map.addInteraction(modify);
                // snap = new ol.interaction.Snap({source: source});
                // map.addInteraction(snap);
                map.addInteraction(boxControl);
                
                boxControl.on('boxend', function () {
                    var b = boxControl.getGeometry().getCoordinates();
                    let a= boxControl.getGeometry().transform('EPSG:3857','EPSG:4326').getCoordinates(); 
                    p1 = a[0][0];
                    p2 = a[0][1];
                    p3 = a[0][2];
                    p4 = a[0][3];
                    
                    // var p = "[["+p1+"], ["+p2+"], ["+p3+"], ["+p4+"], ["+p1+"]]"
                    // alert(a[0])
                    
                    // geom = geom.transform("EPSG:4326", map.getView().getProjection());
                    // let poligono = new ol.Feature({
                    //         geometry: new ol.geom.Polygon(a[0])
                    //     });

                    var source= new ol.source.Vector();
                    // source.addFeature(poligono);

                    var polyLayer = new ol.layer.Vector({
                            source: source,
                            style: new ol.style.Style({
                                fill: new ol.style.Fill({
                                    color: 'rgba(255, 255, 255, 0.9)'
                                }),
                                stroke: new ol.style.Stroke({
                                    color: 'red',
                                    width: 2
                                }),
                                image: new ol.style.Circle({
                                    radius: 10,
                                    fill: new ol.style.Fill({
                                        color: '#ffcc33'
                                    })
                                })
                            })
                    });
                    // alert(polylayer)
                    map.addLayer(polyLayer);

                    var polygonperi = p1[0]+" "+p1[1]+","+p2[0]+" "+p2[1]+","+p3[0]+" "+p3[1]+","+p4[0]+" "+p4[1]+","+p1[0]+" "+p1[1];
                    // alert(polygonperi)
                    cql_filter = "WITHIN (geom, POLYGON (("+polygonperi+"))) and fechadia = '2021-09-03'";
                    if(conta==1){
                        cql_filter = "fechadia between '"+fecha_1+"' and '"+fecha_2+"' and WITHIN (geom, POLYGON (("+polygonperi+")))";
                        wmsLayersargazo.getSource().updateParams({'LAYERS': 'sargazo:sargazo',  'CQL_FILTER': cql_filter});
                        
                    }else{
                        wmsLayersargazo.getSource().updateParams({'LAYERS': 'sargazo:sargazo',  'CQL_FILTER': cql_filter});
                        conta=0;
                    }
                    
            
                    // return boxcontrol;
                });//cierre boxcontrol
                
            }else{
                
                map.removeInteraction(boxControl);
            }
        })//cierre click fig
    }//cierre función general


//-------------------------------------------------------------------------------------------------------------------------

    //función para distancia

    function medir(){
        
        $('#fch3').click(function(){
            if($(this).is(':checked')){
                alert("se encendió");
                const source = new ol.source.Vector();

                const vector = new ol.layer.Vector({
                    source: source,
                    style: new ol.style.Style({
                        fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                        }),
                        stroke: new ol.style.Stroke({
                        color: '#ffcc33',
                        width: 2,
                        }),
                        image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#ffcc33',
                        }),
                        }),
                    }),
                });

                /**
                 * Currently drawn feature.
                 * @type {import("../src/ol/Feature.js").default}
                 */
                var sketch;

                /**
                 * The help tooltip element.
                 * @type {HTMLElement}
                */
                let helpTooltipElement;

                /**
                 * Overlay to show the help messages.
                 * @type {Overlay}
                 */
                let helpTooltip;

                /**
                 * The measure tooltip element.
                 * @type {HTMLElement}
                 */
                let measureTooltipElement;

                /**
                 * Overlay to show the measurement.
                 * @type {Overlay}
                 */
                let measureTooltip;

                /**
                 * Message to show when the user is drawing a polygon.
                 * @type {string}
                 */
                const continuePolygonMsg = 'Click to continue drawing the polygon';

                /**
                 * Message to show when the user is drawing a line.
                 * @type {string}
                 */
                const continueLineMsg = 'Click to continue drawing the line';

                /**
                 * Handle pointer move.
                 * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
                 */
                const pointerMoveHandler = function (evt) {
                if (evt.dragging) {
                    return;
                }
                /** @type {string} */
                let helpMsg = 'Click to start drawing';

                if (sketch) {
                    const geom = sketch.getGeometry();
                    if (geom instanceof ol.geom.Polygon) {
                    helpMsg = continuePolygonMsg;
                    } else if (geom instanceof ol.geom.LineString) {
                    helpMsg = continueLineMsg;
                    }
                }

                helpTooltipElement.innerHTML = helpMsg;
                helpTooltip.setPosition(evt.coordinate);

                helpTooltipElement.classList.remove('hidden');
                };

                
                map.on('pointermove', pointerMoveHandler);

                map.getViewport().addEventListener('mouseout', function () {
                helpTooltipElement.classList.add('hidden');
                });

                const typeSelect = document.getElementById('type');

                

                /**
                 * Format length output.
                 * @param {LineString} line The line.
                 * @return {string} The formatted length.
                 */
                const formatLength = function (line) {
                const length = ol.sphere.getLength(line);
                let output;
                if (length > 100) {
                    output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
                } else {
                    output = Math.round(length * 100) / 100 + ' ' + 'm';
                }
                return output;
                };

                /**
                 * Format area output.
                 * @param {Polygon} polygon The polygon.
                 * @return {string} Formatted area.
                 */
                const formatArea = function (polygon) {
                const area = ol.sphere.getArea(polygon);
                let output;
                if (area > 10000) {
                    output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
                } else {
                    output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
                }
                return output;
                };

                let dibujo; // global so we can remove it later
                function addInteractions() {
                    const type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
                    dibujo = new ol.interaction.Draw({
                        source: source,
                        type: type,
                        style: new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.2)',
                        }),
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 0.5)',
                            lineDash: [10, 10],
                            width: 2,
                        }),
                        image: new ol.style.Circle({
                            radius: 5,
                            stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 0.7)',
                            }),
                            fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.2)',
                            }),
                        }),
                        }),
                    });

                    
                    

                    createMeasureTooltip();
                    createHelpTooltip();

                    let listener;
                    dibujo.on('drawstart', function (evt) {
                        // set sketch
                        sketch = evt.feature;

                        /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
                        let tooltipCoord = evt.coordinate;

                        listener = sketch.getGeometry().on('change', function (evt) {
                        const geom = evt.target;
                        let output;
                        if (geom instanceof ol.geom.Polygon) {
                            output = formatArea(geom);
                            tooltipCoord = geom.getInteriorPoint().getCoordinates();
                        } else if (geom instanceof ol.geom.LineString) {
                            output = formatLength(geom);
                            tooltipCoord = geom.getLastCoordinate();
                        }
                        measureTooltipElement.innerHTML = output;
                        measureTooltip.setPosition(tooltipCoord);
                        });
                    });

                    dibujo.on('drawend', function () {
                        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
                        measureTooltip.setOffset([0, -7]);
                        // unset sketch
                        sketch = null;
                        // unset tooltip so that a new one can be created
                        measureTooltipElement = null;
                        // createMeasureTooltip();
                        ol.Observable.unByKey(listener);
                    });

                    map.addInteraction(dibujo);
                    return dibujo;
                }

                /**
                 * Creates a new help tooltip
                 */
                function createHelpTooltip() {
                    if (helpTooltipElement) {
                        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
                    }
                        helpTooltipElement = document.createElement('div');
                        helpTooltipElement.className = 'ol-tooltip hidden';
                        helpTooltip = new ol.Overlay({
                            element: helpTooltipElement,
                            offset: [15, 0],
                            positioning: 'center-left',
                    });
                    map.addOverlay(helpTooltip);
                }

                /**
                * Creates a new measure tooltip
                */
                function createMeasureTooltip() {
                if (measureTooltipElement) {
                    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
                }
                measureTooltipElement = document.createElement('div');
                measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
                measureTooltip = new ol.Overlay({
                    element: measureTooltipElement,
                    offset: [0, -15],
                    positioning: 'bottom-center',
                    stopEvent: false,
                    insertFirst: false,
                });
                map.addOverlay(measureTooltip);
                }

                /**
                * Let user change the geometry type.
                */
                typeSelect.onchange = function () {
                    map.removeInteraction(dibujo);
                    // map.removeLayer(vector);
                    addInteractions();
                    // map.addLayer(vector);
                    alert("se cambio");
                }

                addInteractions();
                map.addLayer(vector);
            } else {
               alert("se desactivo");
               
            //    map.removeInteraction(dibujo);
               
                
                map.removeOverlay(measureTooltip);
            }

            

        })
    }